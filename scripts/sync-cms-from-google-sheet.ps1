param(
  [string]$SpreadsheetId = "1UJb5t-mcQt9MUo_9mlq1JXvk-pfUcGZUrw38qWDo85g",
  [string]$OutputPath = "data/cms-data.json",
  [string]$ActorsSheet = "Actors",
  [string]$SamplesSheet = "Samples",
  [string]$NewsSheet = "News"
)

$ErrorActionPreference = "Stop"

function Get-CsvRows($sheetName) {
  $encodedSheetName = [System.Uri]::EscapeDataString($sheetName)
  $url = "https://docs.google.com/spreadsheets/d/$SpreadsheetId/gviz/tq?tqx=out:csv&sheet=$encodedSheetName"
  try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing
    $content = $response.Content
    $headerMatch = [regex]::Match($content, '(?m)^"?id"?,')
    if ($headerMatch.Success) {
      $content = $content.Substring($headerMatch.Index)
    }
    return $content | ConvertFrom-Csv -WarningAction SilentlyContinue
  } catch {
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
  if ($null -eq $value) { return $true }
  $text = "$value".Trim().ToLowerInvariant()
  return @("true", "yes", "y", "1", "public", "published") -contains $text
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

function Convert-DriveLink($url) {
  $value = "$url".Trim()
  if ([string]::IsNullOrWhiteSpace($value) -or -not $value.Contains("drive.google.com")) { return $value }

  $match = [regex]::Match($value, "/d/([^/]+)")
  if (-not $match.Success) {
    $match = [regex]::Match($value, "[?&]id=([^&]+)")
  }

  if ($match.Success) {
    return "https://drive.usercontent.google.com/download?id=$($match.Groups[1].Value)&export=download"
  }

  return $value
}

$actorRows = Get-CsvRows $ActorsSheet
$sampleRows = Get-CsvRows $SamplesSheet
$newsRows = Get-CsvRows $NewsSheet

$samplesByActor = @{}
foreach ($row in $sampleRows) {
  if (-not (Is-Published (Get-RowValue $row @("published", "Published") 11))) { continue }
  $actorId = Get-RowValue $row @("actor_id", "actorId", "Actor ID") 1
  if ([string]::IsNullOrWhiteSpace($actorId)) { continue }
  if (-not $samplesByActor.ContainsKey($actorId)) { $samplesByActor[$actorId] = @() }

  $audioSrc = Convert-DriveLink (Get-RowValue $row @("audio_src", "audio", "Audio URL") 7)
  if ([string]::IsNullOrWhiteSpace($audioSrc)) { continue }

  $samplesByActor[$actorId] += @{
    src = $audioSrc
    type = if (Get-RowValue $row @("audio_type", "type", "MIME Type") 8) { Get-RowValue $row @("audio_type", "type", "MIME Type") 8 } else { "audio/mpeg" }
  }
}

$actors = @()
foreach ($row in $actorRows) {
  if (-not (Is-Published (Get-RowValue $row @("published", "Published") 15))) { continue }
  $id = Get-RowValue $row @("id", "actor_id", "Actor ID") 0
  if ([string]::IsNullOrWhiteSpace($id)) { continue }
  $actorSamples = @()
  if ($samplesByActor.ContainsKey($id)) {
    $actorSamples = @($samplesByActor[$id])
  }

  $actors += @{
    id = $id
    name = Get-RowValue $row @("name", "Name") 1
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
    audioSources = $actorSamples
    sortOrder = Convert-SortOrder (Get-RowValue $row @("sort_order", "sortOrder", "Sort Order") 14)
  }
}

$newsArticles = @()
foreach ($row in $newsRows) {
  if (-not (Is-Published (Get-RowValue $row @("published", "Published") 11))) { continue }
  $id = Get-RowValue $row @("id", "news_id", "News ID") 0
  if ([string]::IsNullOrWhiteSpace($id)) { continue }

  $heroImage = Convert-DriveLink (Get-RowValue $row @("image", "hero_image", "Hero Image") 8)
  $thumbnail = Convert-DriveLink (Get-RowValue $row @("thumbnail", "Thumbnail") 7)

  $newsArticles += @{
    id = $id
    title = Get-RowValue $row @("title", "Title") 1
    date = Convert-DateDisplay (Get-RowValue $row @("date", "Date") 2)
    datetime = Get-RowValue $row @("date", "Date") 2
    categories = @(Split-List (Get-RowValue $row @("categories", "category", "Categories") 3))
    image = if ($heroImage) { $heroImage } else { $thumbnail }
    lead = Get-RowValue $row @("lead", "Lead") 5
    body = @((Get-RowValue $row @("body", "Body") 6) -split "`n" | Where-Object { $_ })
    sortOrder = Convert-SortOrder (Get-RowValue $row @("sort_order", "sortOrder", "Sort Order") 9)
  }
}

$cmsData = @{
  enabled = $true
  source = @{
    spreadsheetId = $SpreadsheetId
    syncedAt = (Get-Date).ToString("s")
  }
  sampleAudioSources = @()
  actors = @($actors | Sort-Object { $_.sortOrder })
  newsArticles = @($newsArticles | Sort-Object { $_.sortOrder })
}

$json = $cmsData | ConvertTo-Json -Depth 12
$fullOutputPath = Join-Path (Get-Location) $OutputPath
$outputDir = Split-Path -Parent $fullOutputPath
if (-not (Test-Path $outputDir)) {
  New-Item -ItemType Directory -Path $outputDir | Out-Null
}
[System.IO.File]::WriteAllText($fullOutputPath, $json, [System.Text.UTF8Encoding]::new($false))
Write-Host "Wrote $OutputPath from Google Sheet $SpreadsheetId"
