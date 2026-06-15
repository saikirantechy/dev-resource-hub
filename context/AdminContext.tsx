"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { AdminUser, SystemSettings, ActivityLogEntry, ResourceType, Permission } from "@/lib/admin/types";
import {
  clearAdminSession,
  isAdminLoggedIn,
  getAdminUser,
  isSetupComplete,
  getSystemSettings,
  logActivity,
  getActivityLog,
} from "@/lib/admin/storage";
import { canAccess, isAdmin, isSuperAdmin } from "@/lib/admin/permissions";

interface AdminContextType {
  user: AdminUser | null;
  isLoggedIn: boolean;
  isSetupDone: boolean;
  loading: boolean;
  settings: SystemSettings;
  activityLog: ActivityLogEntry[];
  can: (resource: ResourceType, permission: Permission) => boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  logout: () => void;
  refreshSession: () => void;
  logAction: (action: string, resourceType: string, resourceId?: string, details?: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [setupDone, setSetupDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SystemSettings>({} as SystemSettings);
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([]);

  const refresh = useCallback(() => {
    setUser(getAdminUser());
    setLoggedIn(isAdminLoggedIn());
    setSetupDone(isSetupComplete());
    setSettings(getSystemSettings());
    setActivityLog(getActivityLog());
  }, []);

  useEffect(() => {
    refresh();
    setLoading(false);
  }, [refresh]);

  const logout = useCallback(() => {
    const currentUser = getAdminUser();
    if (currentUser) {
      logActivity(currentUser.id, currentUser.displayName, "logout", "system", undefined, "Admin logout");
    }
    clearAdminSession();
    setUser(null);
    setLoggedIn(false);
  }, []);

  const checkAccess = useCallback(
    (resource: ResourceType, permission: Permission): boolean => {
      return canAccess(user, resource, permission);
    },
    [user],
  );

  const logAction = useCallback(
    (action: string, resourceType: string, resourceId?: string, details?: string) => {
      const currentUser = getAdminUser();
      if (currentUser) {
        logActivity(currentUser.id, currentUser.displayName, action, resourceType, resourceId, details);
        setActivityLog(getActivityLog());
      }
    },
    [],
  );

  return (
    <AdminContext.Provider
      value={{
        user,
        isLoggedIn: loggedIn,
        isSetupDone: setupDone,
        loading,
        settings,
        activityLog,
        can: checkAccess,
        isAdmin: isAdmin(user),
        isSuperAdmin: isSuperAdmin(user),
        logout,
        refreshSession: refresh,
        logAction,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
