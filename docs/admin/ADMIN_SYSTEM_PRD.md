# Admin System — Product Requirements Document

## Overview
Enterprise-grade Role-Based Access Control (RBAC) Admin Management System for Dev Resource Hub. Provides full control over users, content, platform modules, and system settings through a unified admin interface.

## Architecture
- **Client-side only** — Compatible with GitHub Pages static export
- **localStorage-based auth** — Setup wizard creates Super Admin on first visit
- **Role-based permissions** — 6 roles with granular resource-level access control
- **JSON data sources** — Reads/writes to existing JSON data files via localStorage

## Key Features
1. Setup Wizard — First-run Super Admin account creation
2. Admin Login — Secure session-based authentication
3. Dashboard Overview — Stats cards, quick actions, activity feed
4. 17 Management Modules — Users, Blogs, Docs, Resources, Tools, Agents, Workflows, Marketplace, Open Source, DevRank, DSA Arena, Community, Events, Analytics, Settings, Logs
5. Role-Based Access — 6 roles with granular permission matrix
6. Activity Logging — All admin actions are tracked

## Routes
- `/admin/setup` — Setup wizard
- `/admin/login` — Admin login
- `/admin/dashboard` — Overview dashboard
- `/admin/users` — User management
- `/admin/blogs` — Blog management
- `/admin/docs` — Documentation management
- `/admin/resources` — Resource management
- `/admin/tools` — AI Tools management
- `/admin/agents` — Agent management
- `/admin/workflows` — Workflow management
- `/admin/marketplace` — Marketplace management
- `/admin/open-source` — Open Source Hub management
- `/admin/devrank` — DevRank management
- `/admin/dsa` — DSA Arena management
- `/admin/community` — Community management
- `/admin/events` — Event management
- `/admin/analytics` — Analytics dashboard
- `/admin/settings` — Settings
- `/admin/logs` — Activity logs

## User Roles
| Role | Access Level |
|------|-------------|
| Super Admin | Full platform access |
| Admin | Content + user management |
| Moderator | Review, approve, moderate |
| Content Creator | Create/edit own content |
| Community Manager | Communities, events, members |
| User | Read-only access |

## Data Layer
- localStorage for admin sessions and settings
- JSON file imports for content data
- Activity logs stored in localStorage (max 500 entries)

## Future Migration
Architecture supports migration to Supabase, PostgreSQL, MongoDB, Firebase, or Clerk without UI redesign.
