# CHIPS CMS Data

`cms-data.json` is generated from the Google Sheet CMS and read by the website at runtime.

`cms-sync-log.json` is generated at the same time and records what happened during the sync, including whether audio stayed on Google Drive or was uploaded to Cloudflare R2.

The file is currently set to `"enabled": false`, so the site keeps using the built-in sample data in `script.js` until the first successful sync.

See `docs/google-sheet-cms.md` for the full sheet column setup and GitHub Actions workflow.

Manual sync:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/sync-cms-from-google-sheet.ps1
```
