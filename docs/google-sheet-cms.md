# CHIPS Google Sheet CMS

This site can read voice actor profiles, audio samples, and news from Google Sheets.

## Automation

The GitHub Actions workflow at `.github/workflows/sync-cms.yml` runs every 30 minutes and can also be started manually from GitHub:

1. Open the repository on GitHub.
2. Go to `Actions`.
3. Select `Sync CMS from Google Sheet`.
4. Click `Run workflow`.

The workflow updates `data/cms-data.json` only when the sheet data changed.

## Sheet Setup

Use one spreadsheet with three tabs named exactly:

- `Actors`
- `Samples`
- `News`

Starter templates are available in `docs/templates/`:

- `chips-cms-template.xlsx`: styled workbook with `Actors`, `Samples`, and `News` tabs
- `actors.csv`, `samples.csv`, `news.csv`: plain CSV fallbacks

A native Google Sheets copy has also been created here:

```text
https://docs.google.com/spreadsheets/d/1UJb5t-mcQt9MUo_9mlq1JXvk-pfUcGZUrw38qWDo85g
```

The spreadsheet must be readable by link, or published so GitHub Actions can download CSV data. Set this before pushing the workflow to GitHub, otherwise the scheduled sync will fail with a permission error.

If you use a different spreadsheet from the default one, set a repository variable:

- Name: `CMS_SPREADSHEET_ID`
- Value: the long ID from the Google Sheet URL

Example URL:

```text
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
```

## Actors Columns

Recommended header row:

```text
id,name,name_en,gender,age_range,tone,style,category,mood,bio,tags,demos,colors,profile_image,sort_order,published
```

Notes:

- `id` must be unique and stable, such as `kim-haru`.
- `tags`, `demos`, and `colors` are comma-separated lists.
- `profile_image` can be a Google Drive share link.
- `published` accepts `true`, `yes`, `y`, `1`, `public`, or `published`.

## Samples Columns

Recommended header row:

```text
id,actor_id,title,category,tone,language,description,audio_src,audio_type,sort_order,notes,published
```

Notes:

- `actor_id` must match an `Actors.id`.
- `audio_src` can be a Google Drive share link.
- `audio_type` should usually be `audio/mpeg`.
- Audio is loaded lazily by the browser, so files are requested only when the player needs metadata or playback.

## News Columns

Recommended header row:

```text
id,title,date,categories,archive,lead,body,thumbnail,image,sort_order,notes,published
```

Notes:

- `date` should use `YYYY-MM-DD`.
- `categories` is a comma-separated list.
- `body` can contain line breaks. Each line becomes a paragraph.
- `thumbnail` and `image` can be Google Drive share links.

## Local Manual Sync

From the project folder:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/sync-cms-from-google-sheet.ps1
```

To sync a different spreadsheet:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/sync-cms-from-google-sheet.ps1 -SpreadsheetId "YOUR_SPREADSHEET_ID"
```
