"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import { ADMIN_NAV_ITEMS, GROUP_LABELS, ADMIN_ROUTES } from "@/lib/admin/constants";
import { getRoleBadgeColor, getRoleLabel } from "@/lib/admin/permissions";
import { Shield, LogOut, Menu, X, ChevronRight } from "lucide-react";

function AdminShell({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isSetupDone, loading, user, logout, can } = useAdmin();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!mounted || loading) return;

    const isAuthPage = pathname === ADMIN_ROUTES.LOGIN || pathname === ADMIN_ROUTES.SETUP;
    const isRootAdmin = pathname === "/admin";

    if (isRootAdmin) {
      if (!isSetupDone) {
        router.replace(ADMIN_ROUTES.SETUP);
      } else if (!isLoggedIn) {
        router.replace(ADMIN_ROUTES.LOGIN);
      } else {
        router.replace(ADMIN_ROUTES.DASHBOARD);
      }
      return;
    }

    if (!isAuthPage && loading) return;
    if (!isAuthPage && !isSetupDone) {
      router.replace(ADMIN_ROUTES.SETUP);
    } else if (!isAuthPage && !isLoggedIn) {
      router.replace(ADMIN_ROUTES.LOGIN);
    }
  }, [mounted, loading, isLoggedIn, isSetupDone, pathname, router]);

  const isAuthPage = pathname === ADMIN_ROUTES.LOGIN || pathname === ADMIN_ROUTES.SETUP;
  const showLoading = !mounted || loading;
  const showAuth = mounted && !loading && isAuthPage;
  const showPanel = mounted && !loading && !isAuthPage && isLoggedIn && isSetupDone;

  const filteredNav = showPanel ? ADMIN_NAV_ITEMS.filter((item) => {
    if (user?.role === "super_admin") return true;
    return can(item.resource, "read");
  }) : [];

  const navGroups = ["main", "content", "platform", "system"] as const;
  const groupedNav = navGroups.map((group) => ({
    group,
    label: GROUP_LABELS[group],
    items: filteredNav.filter((n) => n.group === group),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Loading State */}
      {showLoading && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
        </div>
      )}

      {/* Auth Pages (login, setup) */}
      {showAuth && children}

      {/* Redirect (should not show anything) */}
      {mounted && !loading && !isAuthPage && !isLoggedIn && null}

      {/* Full Admin Panel */}
      {showPanel && (
        <div className="flex">
          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
            className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0a0a12] border-r border-white/5 transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            } flex flex-col`}
          >
            <div className="p-4 border-b border-white/5">
              <Link href="/admin/dashboard" className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Shield size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-black tracking-tight">Admin Panel</div>
                  <div className="text-[9px] text-gray-500 uppercase tracking-widest">Dev Resource Hub</div>
                </div>
              </Link>
            </div>

            {user && (
              <div className="px-4 py-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                    {user.displayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">{user.displayName}</div>
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${getRoleBadgeColor(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <nav className="flex-1 overflow-y-auto p-3 space-y-6 scrollbar-hide">
              {groupedNav.map((g) => (
                <div key={g.group}>
                  <div className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em] px-3 mb-2">
                    {g.label}
                  </div>
                  <div className="space-y-0.5">
                    {g.items.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
                            active
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <span className="text-base">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                          {active && <ChevronRight size={14} className="ml-auto text-blue-400" />}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            <div className="p-3 border-t border-white/5">
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-500 hover:text-white hover:bg-white/5 transition-all mb-1"
              >
                ← Back to Site
              </Link>
              <button
                onClick={() => { logout(); router.push(ADMIN_ROUTES.LOGIN); }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0">
            <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/5 bg-[#0a0a12]">
              <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl hover:bg-white/5 transition-all">
                <Menu size={20} />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Shield size={12} className="text-white" />
                </div>
                <span className="text-sm font-bold">Admin</span>
              </div>
              <button onClick={() => { logout(); router.push(ADMIN_ROUTES.LOGIN); }}
                className="p-2 rounded-xl hover:bg-red-500/10 text-red-400 transition-all">
                <LogOut size={18} />
              </button>
            </header>
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  );
}
