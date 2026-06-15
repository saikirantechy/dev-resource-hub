export type AdminRole =
  | "super_admin"
  | "admin"
  | "moderator"
  | "content_creator"
  | "community_manager"
  | "user";

export type ResourceType =
  | "users"
  | "blogs"
  | "docs"
  | "resources"
  | "tools"
  | "agents"
  | "workflows"
  | "marketplace"
  | "open-source"
  | "devrank"
  | "dsa"
  | "community"
  | "events"
  | "analytics"
  | "settings"
  | "logs";

export type Permission =
  | "create"
  | "read"
  | "update"
  | "delete"
  | "publish"
  | "manage_roles"
  | "manage_settings"
  | "manage_system"
  | "approve"
  | "feature"
  | "export"
  | "import";

export interface RoleDefinition {
  role: AdminRole;
  label: string;
  description: string;
  color: string;
  permissions: Record<ResourceType, Permission[]>;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  displayName: string;
  role: AdminRole;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
  permissions?: Permission[];
}

export interface AdminSession {
  user: AdminUser;
  token: string;
  expiresAt: string;
  loginAt: string;
}

export interface ActivityLogEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resourceType: ResourceType | string;
  resourceId?: string;
  details?: string;
  timestamp: string;
  ip?: string;
}

export interface SystemSettings {
  siteName: string;
  siteDescription: string;
  logo?: string;
  favicon?: string;
  primaryColor: string;
  theme: "dark" | "light";
  footer: {
    copyright: string;
    showNewsletter: boolean;
    links: { label: string; href: string }[];
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    ogImage?: string;
    twitterHandle?: string;
  };
  features: {
    enableComments: boolean;
    enableRatings: boolean;
    enableBookmarks: boolean;
    enableNewsletter: boolean;
    enableCommunity: boolean;
    enableMarketplace: boolean;
  };
  analytics: {
    googleAnalyticsId?: string;
    plausibleUrl?: string;
    umamiId?: string;
  };
  version: number;
  updatedAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalBlogs: number;
  totalResources: number;
  totalAgents: number;
  totalWorkflows: number;
  totalCommunities: number;
  totalEvents: number;
  totalTools: number;
  totalMarketplace: number;
  totalOpenSource: number;
  growthAnalytics: {
    usersThisWeek: number;
    usersThisMonth: number;
    contentAddedThisWeek: number;
    contentAddedThisMonth: number;
  };
}
