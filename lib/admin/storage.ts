import {
  AdminSession,
  AdminUser,
  AdminRole,
  ActivityLogEntry,
  SystemSettings,
} from "./types";
import {
  ADMIN_STORAGE_KEY,
  ADMIN_SETUP_KEY,
  ADMIN_ACTIVITY_LOG_KEY,
  ADMIN_SETTINGS_KEY,
  DEFAULT_ADMIN_SETTINGS,
} from "./constants";

function getItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error(`Failed to save ${key} to localStorage`);
  }
}

function removeItem(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {}
}

// ─── Session ───

export function getAdminSession(): AdminSession | null {
  const session = getItem<AdminSession | null>(ADMIN_STORAGE_KEY, null);
  if (!session) return null;
  if (new Date(session.expiresAt) < new Date()) {
    clearAdminSession();
    return null;
  }
  return session;
}

export function saveAdminSession(session: AdminSession): void {
  setItem(ADMIN_STORAGE_KEY, session);
}

export function clearAdminSession(): void {
  removeItem(ADMIN_STORAGE_KEY);
}

export function isAdminLoggedIn(): boolean {
  return getAdminSession() !== null;
}

export function getAdminUser(): AdminUser | null {
  return getAdminSession()?.user ?? null;
}

// ─── Setup ───

export function isSetupComplete(): boolean {
  return getItem<boolean>(ADMIN_SETUP_KEY, false);
}

export function markSetupComplete(): void {
  setItem(ADMIN_SETUP_KEY, true);
}

export function resetSetup(): void {
  removeItem(ADMIN_SETUP_KEY);
  clearAdminSession();
  clearActivityLog();
}

// ─── Super Admin Creation ───

const ADMIN_CREDENTIALS_KEY = "devhub_admin_credentials";

function storeCredentials(username: string, password: string): void {
  const hash = btoa(`${username}:${password}`);
  setItem(ADMIN_CREDENTIALS_KEY, hash);
}

function verifyCredentials(username: string, password: string): boolean {
  const stored = getItem<string>(ADMIN_CREDENTIALS_KEY, "");
  if (!stored) return false;
  return stored === btoa(`${username}:${password}`);
}

export function createSuperAdmin(
  username: string,
  email: string,
  displayName: string,
  password: string,
): AdminUser {
  const user: AdminUser = {
    id: `sa-${Date.now()}`,
    username,
    email,
    displayName,
    role: "super_admin",
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    isActive: true,
  };

  storeCredentials(username, password);

  const session: AdminSession = {
    user,
    token: `devhub-sa-${btoa(`${username}:${Date.now()}`)}`,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    loginAt: new Date().toISOString(),
  };

  saveAdminSession(session);
  markSetupComplete();
  logActivity(user.id, user.displayName, "setup", "system", undefined, "Super Admin account created");
  logActivity(user.id, user.displayName, "login", "system", undefined, "First login via setup wizard");

  return user;
}

// ─── Admin Login (local mode) ───

export function adminLogin(
  usernameOrEmail: string,
  password: string,
): { success: boolean; user?: AdminUser; error?: string } {
  const session = getAdminSession();
  if (!session) {
    return { success: false, error: "No admin account found. Please complete the setup wizard first." };
  }

  const user = session.user;
  if (!user.isActive) {
    return { success: false, error: "This account has been deactivated." };
  }

  // Validate credentials against stored hash
  if (!verifyCredentials(user.username, password)) {
    return { success: false, error: "Invalid username or password." };
  }

  const updatedUser = { ...user, lastLogin: new Date().toISOString() };
  const updatedSession = {
    ...session,
    user: updatedUser,
    loginAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };

  saveAdminSession(updatedSession);
  logActivity(user.id, user.displayName, "login", "system", undefined, "Admin login");

  return { success: true, user: updatedUser };
}

// ─── Activity Logging ───

export function getActivityLog(): ActivityLogEntry[] {
  return getItem<ActivityLogEntry[]>(ADMIN_ACTIVITY_LOG_KEY, []);
}

export function logActivity(
  userId: string,
  userName: string,
  action: string,
  resourceType: string,
  resourceId?: string,
  details?: string,
): void {
  const logs = getActivityLog();
  logs.unshift({
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    userId,
    userName,
    action,
    resourceType,
    resourceId,
    details,
    timestamp: new Date().toISOString(),
  });
  const trimmed = logs.slice(0, 500);
  setItem(ADMIN_ACTIVITY_LOG_KEY, trimmed);
}

export function clearActivityLog(): void {
  removeItem(ADMIN_ACTIVITY_LOG_KEY);
}

// ─── Settings ───

export function getSystemSettings(): SystemSettings {
  return getItem<SystemSettings>(ADMIN_SETTINGS_KEY, DEFAULT_ADMIN_SETTINGS as SystemSettings);
}

export function saveSystemSettings(settings: SystemSettings): void {
  const updated = { ...settings, updatedAt: new Date().toISOString(), version: settings.version + 1 };
  setItem(ADMIN_SETTINGS_KEY, updated);
}

// ─── Mock Data Sources ───

export async function loadJsonData<T>(path: string): Promise<T[]> {
  try {
    const mod = await import(`@/data/${path}`);
    const data = mod.default || mod;
    return Array.isArray(data) ? data : data.events || [];
  } catch {
    return [];
  }
}
