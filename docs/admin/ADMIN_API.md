# Admin System — API Reference

## Core Modules

### `lib/admin/types.ts`
- `AdminRole` — Role type: super_admin | admin | moderator | content_creator | community_manager | user
- `ResourceType` — Resource type: 16 resource categories
- `Permission` — Permission type: create | read | update | delete | publish | manage_roles | manage_settings | manage_system | approve | feature | export | import
- `RoleDefinition` — Complete role definition with permissions map
- `AdminUser` — Admin user profile
- `AdminSession` — Session with expiry
- `SystemSettings` — Platform configuration
- `DashboardStats` — Statistics interface

### `lib/admin/constants.ts`
- `ADMIN_ROUTES` — All admin route paths
- `ADMIN_NAV_ITEMS` — Sidebar navigation configuration
- `ADMIN_ROLES` — Role definitions with permissions
- `ADMIN_STORAGE_KEY` — localStorage keys

### `lib/admin/storage.ts`
- `getAdminSession()` — Get current session
- `saveAdminSession()` — Save session
- `clearAdminSession()` — Logout
- `isAdminLoggedIn()` — Check auth status
- `createSuperAdmin()` — Setup wizard completion
- `adminLogin()` — Authenticate
- `logActivity()` — Record action
- `getActivityLog()` — Fetch logs
- `getSystemSettings()` / `saveSystemSettings()` — Settings CRUD

### `lib/admin/permissions.ts`
- `canAccess(user, resource, permission)` — Check permission
- `getRoleLabel(role)` — Human-readable role name
- `isAdmin(user)` / `isSuperAdmin(user)` — Role checks

### `context/AdminContext.tsx`
- `AdminProvider` — Context provider (wraps admin pages)
- `useAdmin()` — Hook: user, isLoggedIn, isSetupDone, can(), logout(), logAction()

## Data Loaders

### `lib/admin/loaders.ts`
- `loadLeaderboardData()` — Users from leaderboard.json
- `loadAgentsData()` — Agents from agents.json
- `loadToolsData()` — Tools from tools.json
- `loadPromptsData()` — Prompts from prompts.json
- `loadMarketplaceData()` — Marketplace items
- `loadEventsData()` — Events
- `loadOpenSourceData()` — Open source resources
