# Permissions Matrix

## Legend
- ✅ = Full access (C,R,U,D,Publish)
- 👁️ = Read only
- ✏️ = Create, Read, Update
- 🔒 = No access

## Matrix

| Resource | Super Admin | Admin | Moderator | Content Creator | Community Manager | User |
|----------|:-----------:|:-----:|:---------:|:---------------:|:-----------------:|:----:|
| Users | ✅ | ✏️ | 👁️ | 👁️ | 👁️ | 👁️ |
| Blogs | ✅ | ✅ | ✏️ | ✏️ | 👁️ | 👁️ |
| Docs | ✅ | ✅ | ✏️ | ✏️ | 🔒 | 👁️ |
| Resources | ✅ | ✅ | ✏️ | ✏️ | 🔒 | 👁️ |
| Tools | ✅ | ✅ | ✏️ | 👁️ | 🔒 | 👁️ |
| Agents | ✅ | ✅ | ✏️ | 👁️ | 🔒 | 👁️ |
| Workflows | ✅ | ✅ | ✏️ | 🔒 | 🔒 | 🔒 |
| Marketplace | ✅ | ✅ | 👁️ | ✏️ | 👁️ | 🔒 |
| Open Source | ✅ | ✅ | 👁️ | 🔒 | 🔒 | 🔒 |
| DevRank | ✅ | 👁️ | 👁️ | 🔒 | ✏️ | 🔒 |
| DSA | ✅ | ✏️ | 👁️ | 🔒 | 👁️ | 🔒 |
| Community | ✅ | ✅ | ✏️ | 👁️ | ✅ | 👁️ |
| Events | ✅ | ✅ | 👁️ | 👁️ | ✅ | 👁️ |
| Analytics | ✅ | 👁️ | 👁️ | 👁️ | 👁️ | 🔒 |
| Settings | ✅ | 👁️ | 🔒 | 🔒 | 🔒 | 🔒 |
| Logs | ✅ | 👁️ | 👁️ | 🔒 | 👁️ | 🔒 |

## Permissions per Resource
- **create**: Add new content
- **read**: View content
- **update**: Edit existing content
- **delete**: Remove content
- **publish**: Change publication status
- **feature**: Mark as featured/trending
- **approve**: Approve submissions
- **export**: Export data
- **manage_roles**: Change user roles (Super Admin only)
- **manage_settings**: Modify system settings
