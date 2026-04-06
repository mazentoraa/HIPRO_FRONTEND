"use client";

import { usePathname } from 'next/navigation';
import { AppSidebar } from '@/components/AppSidebar';
import { AuthProvider } from '@/features/auth/context/AuthContext';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/layout/SidebarContext';
import { TopBar } from '@/components/TopBar';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <AuthProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background font-sans antialiased">
          {!isLoginPage && <AppSidebar />}
          <main className={isLoginPage ? "w-full" : "flex-1 overflow-auto flex flex-col"}>
            {!isLoginPage && <TopBar />}
            <div className={isLoginPage ? "" : "p-6 max-w-7xl mx-auto w-full flex-1"}>
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
      <Toaster />
    </AuthProvider>
  );
}
