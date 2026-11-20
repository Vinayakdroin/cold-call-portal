# Vision Connect 2050 — Team Leader & Dashboard Upgrade

## Role hierarchy
- **Admin:** creates, edits, activates/deactivates all accounts; assigns callers to team leaders; allocates leads to team leaders or callers.
- **Team Leader:** views leads assigned to them and their team members; allocates/reallocates those leads to active callers in their own team; sees team calling performance. Cannot create or edit accounts.
- **Caller:** sees and works only on leads assigned to that caller.

## Existing data safety
This update adds an optional `teamLead` reference to users and adds `team_leader` to the role enum. It does not drop collections, recreate accounts, change passwords, delete leads, or clear call history. Existing callers remain valid and initially have no team leader. An administrator can assign them to a team leader in **Team & access**.

## Dashboard definitions
- Current lead inventory and currently pending leads are live inventory counts for the signed-in user's permitted scope.
- Successful, unsuccessful, registered, applied and total call attempts are call-event counts for the selected date range.
- Conversion/outcome rate is converted call events divided by all call events in that selected period.
- Team and caller performance is scoped to the admin's organisation, the team leader's team, or the caller's own activity.

## Apply this package safely
1. Keep your existing `.env` files. Do not copy any `.env` file from this package.
2. Back up the project folder before replacing source files.
3. Copy the package `client` and `server` source into your existing project, excluding `node_modules`, `dist`, and `.env`.
4. In `client`, run `npm install` then `npm run build`.
5. In `server`, run `npm install`, then test locally with your existing `.env`.
6. Confirm the admin can create a team leader, assign callers to them, allocate leads to that team leader, and that the team leader can allocate those leads to their callers. Test with a small number of existing records first.
7. Only after those checks pass, commit and push to GitHub so Render/Netlify deploy.

## Important first setup
After deployment, open **Team & access** as admin. Create the team leader accounts, then edit each caller's **Team leader** field. Allocate leads to a team leader. The team leader can then distribute them to their callers.

## Build verification note
The backend JavaScript passed `node --check` during packaging. Frontend dependencies could not be installed in this packaging environment because the package installation timed out, so run the client build locally before deployment. Do not deploy if `npm run build` reports an error.
