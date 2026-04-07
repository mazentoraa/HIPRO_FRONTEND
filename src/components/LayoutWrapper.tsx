"use client";

import { usePathname } from 'next/navigation';
import { AppSidebar } from '@/components/AppSidebar';
import { AuthProvider } from '@/features/auth/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/layout/SidebarContext';
import { TopBar } from '@/components/TopBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // The login page is now at the root '/'
  const isLoginPage = pathname === '/';

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-background font-sans antialiased">
            {!isLoginPage && <AppSidebar />}
            <main className={isLoginPage ? "w-full" : "flex-1 overflow-auto flex flex-col"}>
              {!isLoginPage && <TopBar />}
              <div className={isLoginPage ? "" : "w-full flex-1"}>
                {children}
              </div>
            </main>
          </div>
        </SidebarProvider>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
