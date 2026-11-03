# Cold Call Management Portal

Full-stack app: React + Vite frontend, Express API, MongoDB Atlas, JWT auth, XLSX import/export.

## Structure
- `client/` Netlify frontend
- `server/` Express API (deploy on Render/Railway)
- `netlify.toml` SPA redirect
- `server/.env.example`, `client/.env.example`

## Local setup
1. Install Node.js 20+
2. Create MongoDB Atlas database and get connection URI.
3. `cd server && cp .env.example .env && npm install`
4. Fill `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` in `server/.env`
5. `npm run dev` (API on http://localhost:5000)
6. In another terminal: `cd client && cp .env.example .env && npm install && npm run dev`
7. Open http://localhost:5173

The API creates the initial admin account on first start if it does not exist.
No password or database credentials are committed.

## Deploy
### API (Render)
- New Web Service, root directory `server`
- Build: `npm install`
- Start: `npm start`
- Set environment variables from `.env.example`; `CLIENT_ORIGIN` = deployed Netlify URL.

### Frontend (Netlify)
- Base directory: `client`
- Build: `npm run build`
- Publish: `dist`
- Set `VITE_API_URL` = deployed API URL (no trailing slash)
- `netlify.toml` redirects SPA routes.

## Roles
- Admin: manage users, leads, imports, assignments, exports, activity log.
- Caller: sees only assigned leads, records call attempts/status/remarks/follow-up.

## Important
- Restrict MongoDB Atlas network access to your API host where possible; never expose Mongo URI/JWT secret in frontend.
- For production, set strong unique admin password/JWT secret and HTTPS.
- The current import accepts `.xlsx`, `.xls`, and `.csv`; duplicate matching is by normalized phone number.
