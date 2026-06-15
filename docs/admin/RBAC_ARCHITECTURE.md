# RBAC Architecture

## Permission Model

```
User → Role → [Resource: Permission[]] 
```

## Roles & Permissions Matrix

### super_admin
- All resources: create, read, update, delete, publish, manage_roles, manage_settings, manage_system, approve, feature, export, import

### admin
- users: create, read, update, delete
- blogs, docs, resources, tools, agents: create, read, update, delete, publish, feature, export
- workflows: create, read, update, delete, publish, export
- marketplace: create, read, update, delete, approve, feature
- community: create, read, update, delete, approve
- settings: read

### moderator
- blogs, docs: read, update, publish
- resources, tools, agents, workflows: read, update
- marketplace, community: read, approve
- events: read

### content_creator
- blogs, docs: create, read, update, export
- resources: create, read, update
- marketplace: create, read, update

### community_manager
- community: create, read, update, delete, approve
- events: create, read, update, delete, export
- devrank: read, update

## Client-Side Implementation

```
AdminContext
  ├── AdminProvider (wraps app)
  ├── useAdmin() hook
  │   ├── user, isLoggedIn, isSetupDone
  │   ├── can(resource, permission) → boolean
  │   ├── logout()
  │   └── logAction()
  └── AdminLayout
      ├── Sidebar (filtered by permissions)
      └── Auth guards (redirects to login/setup)
```

## Storage
- Admin session: localStorage (7-day expiry)
- Activity logs: localStorage (500 entry limit)
- Settings: localStorage
