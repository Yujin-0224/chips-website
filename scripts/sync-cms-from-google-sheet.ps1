param(
  [string]$SpreadsheetId = "1UJb5t-mcQt9MUo_9mlq1JXvk-pfUcGZUrw38qWDo85g",
  [string]$OutputPath = "data/cms-data.json",
  [string]$SyncLogPath = "data/cms-sync-log.json",
  [string]$ActorsSheet = "Actors",
  [string]$SamplesSheet = "Samples",
  [string]$AudioIntakeSheet = "Audio Intake",
  [string]$NewsSheet = "News",
  [string]$CloudflareAccountId = $env:CF_ACCOUNT_ID,
  [string]$CloudflareApiToken = $env:CLOUDFLARE_API_TOKEN,
  [string]$R2BucketName = $(if ($env:R2_BUCKET_NAME) { $env:R2_BUCKET_NAME } else { "chips-media" }),
  [string]$R2PublicBaseUrl = $(if ($env:R2_PUBLIC_BASE_URL) { $env:R2_PUBLIC_BASE_URL } else { "https://pub-5389c605b3bf46fea66c1657cc99e91d.r2.dev" })
)

$ErrorActionPreference = "Stop"
$syncLogs = @()

function Add-SyncLog([string]$level, [string]$actorName, [string]$title, [string]$sourceUrl, [string]$r2Key, [string]$status, [string]$message) {
  $script:syncLogs += @{
    syncedAt = (Get-Date).ToString("s")
    level = $level
    actorName = $actorName
    sampleTitle = $title
    sourceUrl = $sourceUrl
    r2Key = $r2Key
    status = $status
    message = $message
  }
}

function Get-CsvRows([string]$sheetName, [switch]$Optional) {
  $encodedSheetName = [System.Uri]::EscapeDataString($sheetName)
  $url = "https://docs.google.com/spreadsheets/d/$SpreadsheetId/gviz/tq?tqx=out:csv&sheet=$encodedSheetName"

  try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing
    $lines = @("$($response.Content)" -split "`r?`n" | Where-Object { $_.Trim() })
    $headerIndex = -1

    for ($i = 0; $i -lt $lines.Count; $i++) {
      $line = $lines[$i].ToLowerInvariant()
      if (
        $line -match '^"?id"?,|^"?actor_name"?,|^"?synced_at"?,|^"?title"?,|^"?name"?,' -or
        ($line.Contains("google_drive_link") -and $line.Contains("sample_title"))
      ) {
        $headerIndex = $i
        break
      }
    }

    if ($headerIndex -lt 0) {
      if ($Optional) { return @() }
      throw "Could not find a header row in '$sheetName'."
    }

    $content = ($lines[$headerIndex..($lines.Count - 1)] -join "`n")
    return @($content | ConvertFrom-Csv -WarningAction SilentlyContinue)
  } catch {
    if ($Optional) {
      Add-SyncLog "info" "" "" $url "" "skipped" "Optional sheet '$sheetName' was not found or was not readable."
      return @()
    }
    throw "Could not read the '$sheetName' sheet. Make sure the spreadsheet is readable by link or published to the web. Source: $url"
  }
}

function Get-Cell($row, [int]$index) {
  $properties = @($row.PSObject.Properties)
  if ($index -ge $properties.Count) { return "" }
  return "$($properties[$index].Value)".Trim()
}

function Split-List($value) {
  if ([string]::IsNullOrWhiteSpace($value)) { return @() }
  return $value -split "," | ForEach-Object { $_.Trim() } | Where-Object { $_ }
}

function Is-Published($value) {
  if ($null -eq $value -or [string]::IsNullOrWhiteSpace("$value")) { return $true }
  $text = "$value".Trim().ToLowerInvariant()
  return @("true", "yes", "y", "1", "public", "published", "publish") -contains $text
}

function Convert-DateDisplay($value) {
  if ([string]::IsNullOrWhiteSpace($value)) { return "" }
  return "$value".Replace("-", ".")
}

function Convert-SortOrder($value) {
  $number = 999
  if ([int]::TryParse("$value", [ref]$number)) { return $number }
  return 999
}

function Get-RowValue($row, [string[]]$names, [int]$fallbackIndex) {
  foreach ($name in $names) {
    $property = $row.PSObject.Properties[$name]
    if ($null -ne $property -and -not [string]::IsNullOrWhiteSpace("$($property.Value)")) {
      return "$($property.Value)".Trim()
    }
  }

  return Get-Cell $row $fallbackIndex
}

function New-Slug($value, [string]$fallback = "item") {
  $text = "$value".Trim().ToLowerInvariant()
  $text = $text -replace '[\\/]+', '-'
  $text = $text -replace '[^a-z0-9]+', '-'
  $text = $text.Trim("-")
  if ([string]::IsNullOrWhiteSpace($text)) { return $fallback }
  return $text
}

function Get-UniqueId([string]$baseId, [hashtable]$usedIds) {
  $candidate = $baseId
  $index = 2
  while ($usedIds.ContainsKey($candidate)) {
    $candidate = "$baseId-$index"
    $index += 1
  }
  $usedIds[$candidate] = $true
  return $candidate
}

function Get-DriveFileId($url) {
  $value = "$url".Trim()
  if ([string]::IsNullOrWhiteSpace($value)) { return "" }

  $match = [regex]::Match($value, "/d/([^/]+)")
  if (-not $match.Success) {
    $match = [regex]::Match($value, "[?&]id=([^&]+)")
  }

  if ($match.Success) { return $match.Groups[1].Value }
  return ""
}

function Convert-DriveLink($url) {
  $value = "$url".Trim()
  if ([string]::IsNullOrWhiteSpace($value) -or -not ($value.Contains("drive.google.com") -or $value.Contains("drive.usercontent.google.com"))) {
    return $value
  }

  $fileId = Get-DriveFileId $value
  if ($fileId) {
    return "https://drive.usercontent.google.com/download?id=$fileId&export=download"
  }

  return $value
}

function Get-MimeTypeFromExtension([string]$extension) {
  switch ($extension.ToLowerInvariant()) {
    ".mp3" { return "audio/mpeg" }
    ".wav" { return "audio/wav" }
    ".m4a" { return "audio/mp4" }
    ".aac" { return "audio/aac" }
    ".ogg" { return "audio/ogg" }
    ".flac" { return "audio/flac" }
    default { return "application/octet-stream" }
  }
}

function Get-ExtensionFromMimeType([string]$mimeType) {
  switch (($mimeType -split ";")[0].Trim().ToLowerInvariant()) {
    "audio/mpeg" { return ".mp3" }
    "audio/mp3" { return ".mp3" }
    "audio/wav" { return ".wav" }
    "audio/x-wav" { return ".wav" }
    "audio/mp4" { return ".m4a" }
    "audio/aac" { return ".aac" }
    "audio/ogg" { return ".ogg" }
    "audio/flac" { return ".flac" }
    default { return ".mp3" }
  }
}

function Get-FileNameFromHeaders($headers) {
  $contentDisposition = "$($headers["Content-Disposition"])"
  if ([string]::IsNullOrWhiteSpace($contentDisposition)) { return "" }

  $utfMatch = [regex]::Match($contentDisposition, "filename\*=UTF-8''([^;]+)")
  if ($utfMatch.Success) {
    return [System.Uri]::UnescapeDataString($utfMatch.Groups[1].Value.Trim('"'))
  }

  $match = [regex]::Match($contentDisposition, 'filename="?([^";]+)"?')
  if ($match.Success) { return $match.Groups[1].Value }
  return ""
}

function Convert-KeyToPublicUrl([string]$baseUrl, [string]$key) {
  $cleanBase = $baseUrl.TrimEnd("/")
  $encodedSegments = $key -split "/" | ForEach-Object { [System.Uri]::EscapeDataString($_) }
  return "$cleanBase/$($encodedSegments -join "/")"
}

function Send-DriveAudioToR2([string]$driveUrl, [string]$actorId, [string]$sampleId, [string]$title) {
  $fileId = Get-DriveFileId $driveUrl
  if (-not $fileId) {
    return @{
      src = Convert-DriveLink $driveUrl
      type = "audio/mpeg"
      r2Key = ""
      status = "drive-link"
      message = "No Google Drive file id was detected."
    }
  }

  if ([string]::IsNullOrWhiteSpace($CloudflareAccountId) -or [string]::IsNullOrWhiteSpace($CloudflareApiToken)) {
    return @{
      src = Convert-DriveLink $driveUrl
      type = "audio/mpeg"
      r2Key = ""
      status = "drive-link"
      message = "Cloudflare credentials were not provided; using the Drive download URL."
    }
  }

  $downloadUrl = Convert-DriveLink $driveUrl
  $tempFile = [System.IO.Path]::GetTempFileName()

  try {
    $downloadResponse = Invoke-WebRequest -Uri $downloadUrl -OutFile $tempFile -PassThru -UseBasicParsing
    $fileName = Get-FileNameFromHeaders $downloadResponse.Headers
    $extension = [System.IO.Path]::GetExtension($fileName)
    $contentType = "$($downloadResponse.Headers["Content-Type"])"

    if ([string]::IsNullOrWhiteSpace($extension)) {
      $extension = Get-ExtensionFromMimeType $contentType
    }

    $mimeType = Get-MimeTypeFromExtension $extension
    if ($mimeType -eq "application/octet-stream" -and -not [string]::IsNullOrWhiteSpace($contentType)) {
      $mimeType = ($contentType -split ";")[0].Trim()
    }

    $safeSampleId = New-Slug $sampleId "sample"
    $r2Key = "audio/$actorId/$safeSampleId$extension"
    $encodedKey = [System.Uri]::EscapeDataString($r2Key)
    $uploadUrl = "https://api.cloudflare.com/client/v4/accounts/$CloudflareAccountId/r2/buckets/$R2BucketName/objects/$encodedKey"
    $headers = @{ Authorization = "Bearer $CloudflareApiToken" }

    Invoke-RestMethod -Method Put -Uri $uploadUrl -Headers $headers -InFile $tempFile -ContentType $mimeType | Out-Null

    return @{
      src = Convert-KeyToPublicUrl $R2PublicBaseUrl $r2Key
      type = $mimeType
      r2Key = $r2Key
      status = "uploaded"
      message = "Uploaded '$title' to R2."
    }
  } catch {
    return @{
      src = Convert-DriveLink $driveUrl
      type = "audio/mpeg"
      r2Key = ""
      status = "error"
      message = "$_"
    }
  } finally {
    if (Test-Path $tempFile) { Remove-Item -LiteralPath $tempFile -Force }
  }
}

$actorRows = Get-CsvRows $ActorsSheet
$sampleRows = Get-CsvRows $SamplesSheet -Optional
$audioIntakeRows = Get-CsvRows $AudioIntakeSheet -Optional
$newsRows = Get-CsvRows $NewsSheet

$actors = @()
$actorLookup = @{}
foreach ($row in $actorRows) {
  if (-not (Is-Published (Get-RowValue $row @("published", "Published") 15))) { continue }

  $name = Get-RowValue $row @("name", "Name") 1
  $id = Get-RowValue $row @("id", "actor_id", "Actor ID") 0
  if ([string]::IsNullOrWhiteSpace($id)) { $id = New-Slug $name "actor" }
  if ([string]::IsNullOrWhiteSpace($name)) { continue }

  $actor = @{
    id = $id
    name = $name
    nameEn = Get-RowValue $row @("name_en", "nameEn", "English Name") 2
    gender = Get-RowValue $row @("gender", "Gender") 3
    ageRange = Get-RowValue $row @("age_range", "ageRange", "Age Range") 4
    tone = Get-RowValue $row @("tone", "Tone") 5
    style = Get-RowValue $row @("style", "Style") 6
    category = Get-RowValue $row @("category", "Category") 7
    mood = Get-RowValue $row @("mood", "Mood") 8
    bio = Get-RowValue $row @("bio", "Bio") 9
    tags = @(Split-List (Get-RowValue $row @("tags", "Tags") 10))
    demos = @(Split-List (Get-RowValue $row @("demos", "Demos") 11))
    colors = @(Split-List (Get-RowValue $row @("colors", "Colors") 12))
    profileImage = Convert-DriveLink (Get-RowValue $row @("profile_image", "profileImage", "Profile Image") 13)
    audioSources = @()
    sortOrder = Convert-SortOrder (Get-RowValue $row @("sort_order", "sortOrder", "Sort Order") 14)
  }

  $actors += $actor
  foreach ($key in @($actor.id, $actor.name, $actor.nameEn)) {
    if (-not [string]::IsNullOrWhiteSpace($key)) {
      $actorLookup[$key.Trim().ToLowerInvariant()] = $actor
    }
  }
}

$samplesByActor = @{}
$usedSampleIds = @{}
$combinedSampleRows = @($sampleRows + $audioIntakeRows)
foreach ($row in $combinedSampleRows) {
  if (-not (Is-Published (Get-RowValue $row @("published", "publish", "Published") 11))) { continue }

  $actorRaw = Get-RowValue $row @("actor_id", "actorId", "Actor ID", "actor_name", "actor", "name") 1
  if ([string]::IsNullOrWhiteSpace($actorRaw)) { continue }

  $r2Url = Get-RowValue $row @("r2_url", "R2 URL") 999
  $audioSrc = if ($r2Url) {
    $r2Url
  } else {
    Get-RowValue $row @("audio_src", "audio", "Audio URL", "google_drive_link", "drive_link", "Google Drive Link") 7
  }
  if ([string]::IsNullOrWhiteSpace($audioSrc)) { continue }

  $actorKey = $actorRaw.Trim().ToLowerInvariant()
  $actor = $actorLookup[$actorKey]
  if ($null -eq $actor) {
    Add-SyncLog "warning" $actorRaw "" "" "" "skipped" "Actor '$actorRaw' was not found in the Actors sheet."
    continue
  }

  $title = Get-RowValue $row @("title", "sample_title", "audio_title", "Sample Title") 2
  if ([string]::IsNullOrWhiteSpace($title)) { $title = Get-RowValue $row @("category", "Category") 3 }

  $rawId = Get-RowValue $row @("id", "sample_id", "generated_id") 999
  if ([string]::IsNullOrWhiteSpace($rawId)) {
    $titleSlug = New-Slug $title ""
    if ([string]::IsNullOrWhiteSpace($titleSlug)) {
      $fileId = Get-DriveFileId $audioSrc
      $titleSlug = if ($fileId.Length -gt 10) { "sample-$($fileId.Substring(0, 10))" } else { "sample" }
    }
    $rawId = "$(New-Slug $actor.id "actor")-$titleSlug"
  }
  $sampleId = Get-UniqueId (New-Slug $rawId "sample") $usedSampleIds

  $audioType = Get-RowValue $row @("audio_type", "type", "MIME Type") 9
  $upload = $null
  if ($r2Url -or -not ($audioSrc.Contains("drive.google.com") -or $audioSrc.Contains("drive.usercontent.google.com"))) {
    $upload = @{
      src = $audioSrc
      type = if ($audioType) { $audioType } else { "audio/mpeg" }
      r2Key = Get-RowValue $row @("r2_key", "R2 Key") 999
      status = "external"
      message = "Using existing audio URL."
    }
  } else {
    $upload = Send-DriveAudioToR2 $audioSrc $actor.id $sampleId $title
  }

  if (-not $samplesByActor.ContainsKey($actor.id)) { $samplesByActor[$actor.id] = @() }
  $samplesByActor[$actor.id] += @{
    src = $upload.src
    type = if ($audioType) { $audioType } else { $upload.type }
    title = $title
    category = Get-RowValue $row @("category", "Category") 3
    id = $sampleId
  }

  Add-SyncLog "info" $actor.name $title $audioSrc $upload.r2Key $upload.status $upload.message
}

foreach ($actor in $actors) {
  if ($samplesByActor.ContainsKey($actor.id)) {
    $actor.audioSources = @($samplesByActor[$actor.id])
    $sampleTitles = @($actor.audioSources | ForEach-Object { $_.title } | Where-Object { $_ })
    if ($sampleTitles.Count -gt 0) {
      $actor.demos = @($sampleTitles | Select-Object -Unique)
    }
  }
}

$newsArticles = @()
foreach ($row in $newsRows) {
  if (-not (Is-Published (Get-RowValue $row @("published", "Published") 11))) { continue }
  $id = Get-RowValue $row @("id", "news_id", "News ID") 0
  $title = Get-RowValue $row @("title", "Title") 1
  if ([string]::IsNullOrWhiteSpace($title)) { continue }
  if ([string]::IsNullOrWhiteSpace($id)) {
    $id = New-Slug $title "news"
  }

  $heroImage = Convert-DriveLink (Get-RowValue $row @("image", "hero_image", "Hero Image") 8)
  $thumbnail = Convert-DriveLink (Get-RowValue $row @("thumbnail", "Thumbnail") 7)

  $newsArticles += @{
    id = $id
    title = $title
    date = Convert-DateDisplay (Get-RowValue $row @("date", "Date") 2)
    datetime = Get-RowValue $row @("date", "Date") 2
    categories = @(Split-List (Get-RowValue $row @("categories", "category", "Categories") 3))
    image = if ($heroImage) { $heroImage } else { $thumbnail }
    lead = Get-RowValue $row @("lead", "Lead") 5
    body = @((Get-RowValue $row @("body", "Body") 6) -split "`n" | Where-Object { $_ })
    sortOrder = Convert-SortOrder (Get-RowValue $row @("sort_order", "sortOrder") 9)
  }
}

$cmsData = @{
  enabled = $true
  source = @{
    spreadsheetId = $SpreadsheetId
    syncedAt = (Get-Date).ToString("s")
    r2Bucket = $R2BucketName
    r2PublicBaseUrl = $R2PublicBaseUrl
  }
  sampleAudioSources = @()
  actors = @($actors | Sort-Object { $_.sortOrder })
  newsArticles = @($newsArticles | Sort-Object { $_.sortOrder })
}

foreach ($pathInfo in @(@{ Path = $OutputPath; Data = $cmsData }, @{ Path = $SyncLogPath; Data = @($syncLogs) })) {
  $fullPath = Join-Path (Get-Location) $pathInfo.Path
  $outputDir = Split-Path -Parent $fullPath
  if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
  }
  $json = $pathInfo.Data | ConvertTo-Json -Depth 12
  [System.IO.File]::WriteAllText($fullPath, $json, [System.Text.UTF8Encoding]::new($false))
}

Write-Host "Wrote $OutputPath and $SyncLogPath from Google Sheet $SpreadsheetId"
