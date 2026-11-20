# Vision Connect 2050 — CRM upgrade

A role-based lead management and calling platform for Vision Mysore 2050.

## Included in this upgrade

- Admin and caller workspaces with a refreshed responsive interface.
- Lead search and filters, individual lead details, call history and follow-up scheduling.
- Admin bulk allocation/reallocation and bulk outcome updates.
- Admin-only soft deletion (Trash), bulk delete, restore and permanent deletion.
- Filter-aware Excel export. Admin exports follow selected filters; caller exports are restricted to the caller's assigned leads by the API.
- Follow-up centre, conversion funnel, caller/group performance, campaign analytics and duplicate-phone review.
- Caller groups and configurable daily call targets.
- Administrative audit events for allocation, bulk changes, export, deletion and restoration.
- Vision 2050 and SDMIMD logo assets.

## Important data-safety notes

- This upgrade keeps the existing MongoDB `User` and `Lead` collections. Existing users, passwords, leads and call history are not intentionally reset.
- New lead fields (`deletedAt`, `deletedBy`, `deletionReason`) and user field (`dailyTarget`) have defaults. Existing MongoDB documents remain readable without a manual migration.
- A new `audits` collection is created automatically when the first audit event is written.
- Lead deletion is a soft delete. Records remain in Trash until an administrator permanently deletes them.
- Take a MongoDB Atlas backup/snapshot before production deployment. Test with a small sample first.
- Never upload `.env` files, database credentials, JWT secrets or real lead spreadsheets to GitHub.

## Local development

### Backend

```powershell
cd server
npm install
npm run dev
```

Required `server/.env` values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
ADMIN_EMAIL=vision2050@sdmimd.ac.in
ADMIN_PASSWORD=your_admin_password
CLIENT_ORIGIN=http://localhost:5173
```

### Frontend

Open another terminal:

```powershell
cd client
npm install
npm run dev
```

For local development, the frontend uses `http://localhost:5000/api` unless `VITE_API_URL` is set. For production, set Netlify environment variable `VITE_API_URL` to the backend origin, for example `https://your-api.onrender.com` (without `/api`).

## Production deployment

### Render backend

- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables: `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CLIENT_ORIGIN`
- `CLIENT_ORIGIN` must exactly match the Netlify site origin, e.g. `https://visionmysore2050.netlify.app`.

### Netlify frontend

- Base directory: `client`
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_API_URL=https://your-api.onrender.com`

The Netlify build command is `vite build` via `client/package.json`.

## Role boundaries

- Admin-only endpoints: user administration, lead creation/import, lead assignment, Trash, audit trail, campaign analytics and duplicate review.
- Caller endpoints are scoped to the authenticated caller's assigned leads for listing, details, follow-ups, call activity and export.
- Callers may edit only the organisation field on their allocated leads, consistent with the current application behaviour.

## Before publishing

1. Back up MongoDB Atlas.
2. Confirm `.env` and lead spreadsheets are excluded by `.gitignore`.
3. Test admin and caller accounts locally.
4. Test soft delete, restore, permanent delete, filters and Excel export with test records.
5. Deploy backend first, then rebuild the frontend.
6. Verify Render is Live and Netlify is Published before testing production login.


## Follow-up visibility and daily schedule update

- A follow-up is owned by the user who schedules it (`followUpBy`).
- Callers can see only follow-ups they scheduled.
- Team Leaders can see follow-ups scheduled by themselves and callers assigned to their team.
- Administrators can see all follow-ups.
- Admin and Team Leader views include a caller filter; all roles can filter by date.
- The schedule displays daily counts in Asia/Kolkata time.
- Existing follow-ups without `followUpBy` are attributed, where possible, to the call record whose follow-up date matches the lead's current follow-up date (falling back to the latest call record).
- The existing Logout control remains available in the sidebar for every role.

No MongoDB records are deleted or rewritten by this code update. The new `followUpBy` field is populated when a follow-up is next scheduled.
