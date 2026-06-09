# Google Apps Script Web App Setup

This project can connect to Google Sheets through a free Google Apps Script Web App.

## 1. Create the Google Sheet

Create a Google Sheet, then open `Extensions -> Apps Script`.

## 2. Paste the script

Copy the content of `google-apps-script/Code.gs` into Apps Script and save.

## 3. Add an optional secret

In Apps Script, open `Project Settings -> Script properties`.

If this Apps Script project was not created from `Extensions -> Apps Script` inside the target Google Sheet, add:

```txt
SHEET_ID = your-google-sheet-id
```

You can find the Sheet ID in the URL:

```txt
https://docs.google.com/spreadsheets/d/SHEET_ID/edit
```

You may also add an optional secret:

```txt
APP_SECRET = any-long-random-string
```

Use the same value in `.env.local` as `GOOGLE_APPS_SCRIPT_SECRET`.

## 4. Deploy as Web App

Deploy with:

```txt
Execute as: Me
Who has access: Anyone
```

Copy the Web App URL into `.env.local`:

```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/xxxxx/exec
GOOGLE_APPS_SCRIPT_SECRET=the-same-secret
```

Restart the Next.js dev server after changing `.env.local`.
