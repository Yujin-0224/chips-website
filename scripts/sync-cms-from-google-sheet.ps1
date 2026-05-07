param(
  [string]$SpreadsheetId = "1qjpC5YueXqlXFKcucm6EZoUpzp0WbPEzJ1aUiq_lX-I",
  [string]$OutputPath = "data/cms-data.json"
)

$ErrorActionPreference = "Stop"

$sheetGids = @{
  Actors = "1001"
  Samples = "1002"
  News = "1003"
}

function Get-CsvRows($gid) {
  $url = "https://docs.google.com/spreadsheets/d/$SpreadsheetId/export?format=csv&gid=$gid"
  $response = Invoke-WebRequest -Uri $url -UseBasicParsing
  return $response.Content | ConvertFrom-Csv
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

$actorRows = Get-CsvRows $sheetGids.Actors
$sampleRows = Get-CsvRows $sheetGids.Samples
$newsRows = Get-CsvRows $sheetGids.News

$samplesByActor = @{}
foreach ($row in $sampleRows) {
  if (-not (Is-Published (Get-Cell $row 11))) { continue }
  $actorId = Get-Cell $row 1
  if ([string]::IsNullOrWhiteSpace($actorId)) { continue }
  if (-not $samplesByActor.ContainsKey($actorId)) { $samplesByActor[$actorId] = @() }
  $samplesByActor[$actorId] += @{
    src = Get-Cell $row 7
    type = if (Get-Cell $row 8) { Get-Cell $row 8 } else { "audio/mpeg" }
  }
}

$actors = @()
foreach ($row in $actorRows) {
  if (-not (Is-Published (Get-Cell $row 15))) { continue }
  $id = Get-Cell $row 0
  if ([string]::IsNullOrWhiteSpace($id)) { continue }

  $actors += @{
    id = $id
    name = Get-Cell $row 1
    nameEn = Get-Cell $row 2
    gender = Get-Cell $row 3
    ageRange = Get-Cell $row 4
    tone = Get-Cell $row 5
    style = Get-Cell $row 6
    category = Get-Cell $row 7
    mood = Get-Cell $row 8
    bio = Get-Cell $row 9
    tags = @(Split-List (Get-Cell $row 10))
    demos = @(Split-List (Get-Cell $row 11))
    colors = @(Split-List (Get-Cell $row 12))
    profileImage = Get-Cell $row 13
    audioSources = @($samplesByActor[$id])
    sortOrder = Convert-SortOrder (Get-Cell $row 14)
  }
}

$newsArticles = @()
foreach ($row in $newsRows) {
  if (-not (Is-Published (Get-Cell $row 11))) { continue }
  $id = Get-Cell $row 0
  if ([string]::IsNullOrWhiteSpace($id)) { continue }

  $heroImage = Get-Cell $row 8
  $thumbnail = Get-Cell $row 7

  $newsArticles += @{
    id = $id
    title = Get-Cell $row 1
    date = Convert-DateDisplay (Get-Cell $row 2)
    datetime = Get-Cell $row 2
    categories = @(Split-List (Get-Cell $row 3))
    image = if ($heroImage) { $heroImage } else { $thumbnail }
    lead = Get-Cell $row 5
    body = @((Get-Cell $row 6) -split "`n" | Where-Object { $_ })
    sortOrder = Convert-SortOrder (Get-Cell $row 9)
  }
}

$cmsData = @{
  enabled = $true
  source = @{
    spreadsheetId = $SpreadsheetId
    syncedAt = (Get-Date).ToString("s")
  }
  sampleAudioSources = @()
  actors = @($actors | Sort-Object sortOrder)
  newsArticles = @($newsArticles | Sort-Object sortOrder)
}

$json = $cmsData | ConvertTo-Json -Depth 12
$fullOutputPath = Join-Path (Get-Location) $OutputPath
$outputDir = Split-Path -Parent $fullOutputPath
if (-not (Test-Path $outputDir)) {
  New-Item -ItemType Directory -Path $outputDir | Out-Null
}
Set-Content -Path $fullOutputPath -Value $json -Encoding UTF8
Write-Host "Wrote $OutputPath from Google Sheet $SpreadsheetId"
