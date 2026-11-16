# Vision Connect 2050

Lead management and calling activity portal for Vision Mysore 2050.

## Features
- Admin and caller accounts with role-based access
- Excel/CSV import with preview, duplicate handling, and optional caller allocation during import
- Individual lead creation with optional caller allocation
- Bulk lead allocation and reallocation, including previously imported leads
- Lead search and filters for contact, profession, organisation, attempts, outcome, assigned caller, and last-called date
- Caller-editable organisation field
- Clickable email links in lead details
- Call outcomes: Pending / follow-up, Successful call, Unsuccessful call, Registered on website, Applied to Vision Mysore 2050
- Daily, last-seven-days, overall, and custom date-range performance
- Admin caller-wise and caller-group-wise reports; caller self-performance report
- Vision 2050 branding and Powered by SDMIMD footer

## Local development

Backend:
```powershell
cd server
npm install
# create server/.env using .env.example
npm run dev
```

Frontend (separate terminal):
```powershell
cd client
npm install
npm run dev
```

## Environment variables

Backend `server/.env` / Render environment:
- `MONGO_URI`
- `JWT_SECRET` (long random secret; required)
- `ADMIN_EMAIL` (default `vision2050@sdmimd.ac.in`)
- `ADMIN_PASSWORD` (used only when the admin account is first created)
- `CLIENT_ORIGIN` (for example `https://visionmysore2050.netlify.app`; exact frontend origin, no trailing slash)

Frontend Netlify environment:
- `VITE_API_URL=https://cold-call-portal.onrender.com` (no `/api` suffix)

## Deployment

- Render service root directory: `server`
- Render build command: `npm install`
- Render start command: `npm start`
- Netlify base directory: `client`
- Netlify build command: `npm run build`
- Netlify publish directory: `dist`

After changing backend source, push to GitHub and wait for Render to deploy. After changing frontend source, push to GitHub and wait for Netlify to deploy. If both changed, wait for both services to show Live/Published before testing.

## Data compatibility

The schema adds an optional `organisation` field to leads and a `group` field to users. Existing MongoDB records remain in place; existing callers without a group are treated as `General`. Existing call history and old outcomes remain valid.
