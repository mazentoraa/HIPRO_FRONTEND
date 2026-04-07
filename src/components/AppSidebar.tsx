"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  BarChart3,
  MessageSquare,
  Settings,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useSidebar } from "@/components/layout/SidebarContext";

const navItems = [
  { title: "Tableau de bord", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Clients", icon: Users, path: "/clients" },
  { title: "Entraîneurs", icon: GraduationCap, path: "/trainers" },
  { title: "Sessions", icon: CalendarDays, path: "/sessions" },
  { title: "Présences", icon: ClipboardCheck, path: "/attendance" },
  { title: "Paiements", icon: CreditCard, path: "/payments" },
  { title: "Rapports", icon: BarChart3, path: "/reports" },
  { title: "Communication", icon: MessageSquare, path: "/communication" },
  { title: "Paramètres", icon: Settings, path: "/settings" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar();
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        suppressHydrationWarning
        className={cn(
          "top-0 left-0 z-50 bg-sidebar flex flex-col border-r border-sidebar-border shrink-0",
          ready && "transition-all duration-300",
          collapsed ? "w-[72px]" : "w-64",
          "fixed h-full md:sticky md:h-screen md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
          <Link href="/dashboard" className="flex items-center gap-3 min-w-0 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 rounded-xl bg-sidebar-primary flex items-center justify-center shrink-0">
              <span className="text-sidebar-primary-foreground font-bold text-sm">HI</span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-sidebar-foreground font-bold text-lg leading-tight whitespace-nowrap">HiPro</h1>
                <p className="text-sidebar-foreground/70 text-[10px] uppercase tracking-widest whitespace-nowrap">Training Center</p>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.path ||
              (item.path !== "/" && pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 relative",
                  collapsed && "justify-center px-0",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-sidebar-primary rounded-r-full" />
                )}
                <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-sidebar-primary")} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="flex flex-col p-3 border-t border-sidebar-border gap-2">
          <button
            onClick={logout}
            className={cn(
              "w-full flex items-center gap-3 py-2 rounded-xl text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
              collapsed ? "justify-center px-0" : "justify-start px-3"
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span className="font-medium">Déconnexion</span>}
          </button>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex w-full items-center justify-center py-2 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
          >
            <ChevronLeft suppressHydrationWarning className={cn("h-4 w-4 transition-transform duration-300", collapsed && "rotate-180")} />
          </button>
        </div>
      </aside>
    </>
  );
}
