# CHIPS CMS Data

`cms-data.json` is the site-readable data file generated from the Google Sheet CMS.

The file is currently set to `"enabled": false`, so the site keeps using the built-in sample data in `script.js`.

To use Google Sheet data:

1. Open the Google Sheet: https://docs.google.com/spreadsheets/d/1qjpC5YueXqlXFKcucm6EZoUpzp0WbPEzJ1aUiq_lX-I/edit
2. Make the sheet readable by link or publish it to the web.
3. Run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/sync-cms-from-google-sheet.ps1
```

The script writes `data/cms-data.json` with `"enabled": true`.
