import { RoleDefinition, ResourceType, Permission, AdminRole } from "./types";

export const ADMIN_STORAGE_KEY = "devhub_admin_session";
export const ADMIN_SETUP_KEY = "devhub_admin_setup_complete";
export const ADMIN_ACTIVITY_LOG_KEY = "devhub_admin_activity_log";
export const ADMIN_SETTINGS_KEY = "devhub_admin_settings";

export const ADMIN_ROUTES = {
  LOGIN: "/admin/login",
  SETUP: "/admin/setup",
  DASHBOARD: "/admin/dashboard",
  USERS: "/admin/users",
  BLOGS: "/admin/blogs",
  DOCS: "/admin/docs",
  RESOURCES: "/admin/resources",
  TOOLS: "/admin/tools",
  AGENTS: "/admin/agents",
  WORKFLOWS: "/admin/workflows",
  MARKETPLACE: "/admin/marketplace",
  OPEN_SOURCE: "/admin/open-source",
  DEVRANK: "/admin/devrank",
  DSA: "/admin/dsa",
  COMMUNITY: "/admin/community",
  EVENTS: "/admin/events",
  ANALYTICS: "/admin/analytics",
  SETTINGS: "/admin/settings",
  LOGS: "/admin/logs",
} as const;

export const ADMIN_NAV_ITEMS: {
  label: string;
  href: string;
  icon: string;
  group: "main" | "content" | "platform" | "system";
  resource: ResourceType;
}[] = [
  { label: "Dashboard", href: ADMIN_ROUTES.DASHBOARD, icon: "📊", group: "main", resource: "analytics" },
  { label: "Users", href: ADMIN_ROUTES.USERS, icon: "👥", group: "main", resource: "users" },
  { label: "Analytics", href: ADMIN_ROUTES.ANALYTICS, icon: "📈", group: "main", resource: "analytics" },
  { label: "Blogs", href: ADMIN_ROUTES.BLOGS, icon: "📝", group: "content", resource: "blogs" },
  { label: "Docs", href: ADMIN_ROUTES.DOCS, icon: "📚", group: "content", resource: "docs" },
  { label: "Resources", href: ADMIN_ROUTES.RESOURCES, icon: "📦", group: "content", resource: "resources" },
  { label: "Tools", href: ADMIN_ROUTES.TOOLS, icon: "🛠️", group: "content", resource: "tools" },
  { label: "Agents", href: ADMIN_ROUTES.AGENTS, icon: "🤖", group: "content", resource: "agents" },
  { label: "Workflows", href: ADMIN_ROUTES.WORKFLOWS, icon: "⚡", group: "content", resource: "workflows" },
  { label: "Marketplace", href: ADMIN_ROUTES.MARKETPLACE, icon: "🏪", group: "platform", resource: "marketplace" },
  { label: "Open Source", href: ADMIN_ROUTES.OPEN_SOURCE, icon: "🌐", group: "platform", resource: "open-source" },
  { label: "DevRank", href: ADMIN_ROUTES.DEVRANK, icon: "🏆", group: "platform", resource: "devrank" },
  { label: "DSA Arena", href: ADMIN_ROUTES.DSA, icon: "⚔️", group: "platform", resource: "dsa" },
  { label: "Community", href: ADMIN_ROUTES.COMMUNITY, icon: "💬", group: "platform", resource: "community" },
  { label: "Events", href: ADMIN_ROUTES.EVENTS, icon: "📅", group: "platform", resource: "events" },
  { label: "Settings", href: ADMIN_ROUTES.SETTINGS, icon: "⚙️", group: "system", resource: "settings" },
  { label: "Activity Logs", href: ADMIN_ROUTES.LOGS, icon: "📋", group: "system", resource: "logs" },
];

export const GROUP_LABELS: Record<string, string> = {
  main: "Main",
  content: "Content Management",
  platform: "Platform Modules",
  system: "System",
};

const ALL_PERMISSIONS: Permission[] = [
  "create", "read", "update", "delete", "publish",
  "manage_roles", "manage_settings", "manage_system",
  "approve", "feature", "export", "import",
];

const ALL_RESOURCES: ResourceType[] = [
  "users", "blogs", "docs", "resources", "tools", "agents",
  "workflows", "marketplace", "open-source", "devrank", "dsa",
  "community", "events", "analytics", "settings", "logs",
];

const allResourcesPermissionMap = {} as Record<ResourceType, Permission[]>;
for (const r of ALL_RESOURCES) {
  allResourcesPermissionMap[r] = [...ALL_PERMISSIONS];
}

export const ADMIN_ROLES: Record<AdminRole, RoleDefinition> = {
  super_admin: {
    role: "super_admin",
    label: "Super Admin",
    description: "Highest level access. Full control over the entire platform.",
    color: "text-red-400 border-red-500/30 bg-red-500/10",
    permissions: allResourcesPermissionMap,
  },
  admin: {
    role: "admin",
    label: "Admin",
    description: "Can create, edit, delete, and publish content. Manage users and communities.",
    color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    permissions: {
      users: ["create", "read", "update", "delete"],
      blogs: ["create", "read", "update", "delete", "publish", "feature", "export"],
      docs: ["create", "read", "update", "delete", "publish", "export"],
      resources: ["create", "read", "update", "delete", "feature", "export"],
      tools: ["create", "read", "update", "delete", "feature", "export"],
      agents: ["create", "read", "update", "delete", "feature", "export"],
      workflows: ["create", "read", "update", "delete", "publish", "export"],
      marketplace: ["create", "read", "update", "delete", "approve", "feature"],
      "open-source": ["create", "read", "update", "delete", "feature", "export"],
      devrank: ["read", "update", "export"],
      dsa: ["create", "read", "update", "delete", "export"],
      community: ["create", "read", "update", "delete", "approve"],
      events: ["create", "read", "update", "delete", "export"],
      analytics: ["read", "export"],
      settings: ["read"],
      logs: ["read"],
    },
  },
  moderator: {
    role: "moderator",
    label: "Moderator",
    description: "Can review content, approve submissions, and moderate discussions.",
    color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    permissions: {
      users: ["read"],
      blogs: ["read", "update", "publish"],
      docs: ["read", "update", "publish"],
      resources: ["read", "update"],
      tools: ["read", "update"],
      agents: ["read", "update"],
      workflows: ["read", "update", "publish"],
      marketplace: ["read", "approve"],
      "open-source": ["read"],
      devrank: ["read"],
      dsa: ["read"],
      community: ["read", "update", "approve"],
      events: ["read"],
      analytics: ["read"],
      settings: [],
      logs: ["read"],
    },
  },
  content_creator: {
    role: "content_creator",
    label: "Content Creator",
    description: "Can create and edit their own blogs, tutorials, and documentation.",
    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    permissions: {
      blogs: ["create", "read", "update", "export"],
      docs: ["create", "read", "update", "export"],
      resources: ["create", "read", "update"],
      tools: ["read"],
      agents: ["read"],
      marketplace: ["create", "read", "update"],
      community: ["read"],
      events: ["read"],
      analytics: ["read"],
      users: ["read"],
      settings: [],
      logs: [],
      workflows: [],
      devrank: [],
      dsa: [],
      "open-source": [],
    },
  },
  community_manager: {
    role: "community_manager",
    label: "Community Manager",
    description: "Manages communities, events, members, and leaderboards.",
    color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    permissions: {
      community: ["create", "read", "update", "delete", "approve"],
      events: ["create", "read", "update", "delete", "export"],
      devrank: ["read", "update"],
      dsa: ["read"],
      users: ["read"],
      blogs: ["read"],
      analytics: ["read"],
      marketplace: ["read"],
      settings: [],
      logs: ["read"],
      tools: [],
      agents: [],
      workflows: [],
      docs: [],
      resources: [],
      "open-source": [],
    },
  },
  user: {
    role: "user",
    label: "User",
    description: "Normal platform access.",
    color: "text-gray-400 border-gray-500/30 bg-gray-500/10",
    permissions: {
      users: ["read"],
      blogs: ["read"],
      docs: ["read"],
      resources: ["read"],
      tools: ["read"],
      agents: ["read"],
      community: ["read"],
      events: ["read"],
      analytics: [],
      settings: [],
      logs: [],
      workflows: [],
      marketplace: [],
      devrank: [],
      dsa: [],
      "open-source": [],
    },
  },
};

export const DEFAULT_ADMIN_SETTINGS = {
  siteName: "Dev Resource Hub",
  siteDescription: "The AI Operating System for Students, Developers, Founders & AI Agencies",
  primaryColor: "#3b82f6",
  theme: "dark" as const,
  footer: {
    copyright: "© 2026 Dev Resource Hub. All rights reserved.",
    showNewsletter: true,
    links: [
      { label: "About", href: "/docs" },
      { label: "Privacy", href: "/docs" },
      { label: "Terms", href: "/docs" },
    ],
  },
  seo: {
    defaultTitle: "Dev Resource Hub — AI Operating System",
    defaultDescription: "Discover AI tools, agents, prompts, and connect with a global community.",
    twitterHandle: "@devresourcehub",
  },
  features: {
    enableComments: true,
    enableRatings: true,
    enableBookmarks: true,
    enableNewsletter: true,
    enableCommunity: true,
    enableMarketplace: true,
  },
  analytics: {},
  version: 1,
};
