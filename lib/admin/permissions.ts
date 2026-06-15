import { AdminUser, AdminRole, ResourceType, Permission } from "./types";
import { ADMIN_ROLES } from "./constants";

export function getUserRole(user: AdminUser | null): AdminRole {
  return user?.role ?? "user";
}

export function getRolePermissions(role: AdminRole): Record<ResourceType, Permission[]> {
  return ADMIN_ROLES[role]?.permissions ?? ADMIN_ROLES.user.permissions;
}

export function canAccess(
  user: AdminUser | null,
  resource: ResourceType,
  permission: Permission,
): boolean {
  const role = getUserRole(user);
  if (role === "super_admin") return true;
  const rolePermissions = getRolePermissions(role);
  const resourcePermissions = rolePermissions[resource];
  if (!resourcePermissions) return false;
  return resourcePermissions.includes(permission);
}

export function canAccessAny(
  user: AdminUser | null,
  resource: ResourceType,
  permissions: Permission[],
): boolean {
  return permissions.some((p) => canAccess(user, resource, p));
}

export function canAccessAll(
  user: AdminUser | null,
  resource: ResourceType,
  permissions: Permission[],
): boolean {
  return permissions.every((p) => canAccess(user, resource, p));
}

export function getAccessibleResources(
  user: AdminUser | null,
  permission: Permission,
): ResourceType[] {
  const role = getUserRole(user);
  if (role === "super_admin") {
    return [
      "users", "blogs", "docs", "resources", "tools", "agents",
      "workflows", "marketplace", "open-source", "devrank", "dsa",
      "community", "events", "analytics", "settings", "logs",
    ];
  }
  const rolePerms = getRolePermissions(role);
  return (Object.entries(rolePerms) as [ResourceType, Permission[]][])
    .filter(([_, perms]) => perms.includes(permission))
    .map(([resource]) => resource);
}

export function getRoleBadgeColor(role: AdminRole): string {
  return ADMIN_ROLES[role]?.color ?? "text-gray-400 border-gray-500/30 bg-gray-500/10";
}

export function getRoleLabel(role: AdminRole): string {
  return ADMIN_ROLES[role]?.label ?? "Unknown";
}

export function isAdmin(user: AdminUser | null): boolean {
  return user !== null && (user.role === "super_admin" || user.role === "admin");
}

export function isSuperAdmin(user: AdminUser | null): boolean {
  return user?.role === "super_admin";
}
