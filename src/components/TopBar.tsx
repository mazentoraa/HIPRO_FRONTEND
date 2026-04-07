"use client";

import { Bell, Search, Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSidebar } from "@/components/layout/SidebarContext";
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useState, useEffect } from "react";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Bonjour";
  if (h < 18) return "Bon après-midi";
  return "Bonsoir";
}

export function TopBar() {
  const { setMobileOpen } = useSidebar();
  const [dark, setDark] = useState(false);
  const { user } = useAuth(); // Utiliser le vrai nom de l'utilisateur

  useEffect(() => {
    // Vérifier les préférences à l'initialisation
    const isDark =
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);

    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-sm flex items-center px-2 md:px-4 gap-4 sticky top-0 z-30">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden shrink-0 text-foreground"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex-1 flex items-center gap-4">
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher clients, entraîneurs, sessions..."
            className="pl-10 bg-secondary/50 border-0 rounded-full h-10 text-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden lg:block text-sm text-muted-foreground mr-2">
          {getGreeting()}, <span className="text-foreground font-medium">{user?.name || "Admin"}</span>
        </span>

        <Button variant="ghost" size="icon" className="rounded-xl text-foreground hover:bg-accent" onClick={toggleTheme}>
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <Button variant="ghost" size="icon" className="rounded-xl relative text-foreground hover:bg-accent">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm cursor-pointer uppercase">
          {user?.name?.charAt(0) || "A"}
        </div>
      </div>
    </header>
  );
}
