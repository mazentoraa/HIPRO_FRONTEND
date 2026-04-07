import React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
  };
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <Button onClick={action.onClick} className="gap-2 rounded-xl shadow-lg shadow-primary/20">
          <action.icon className="h-4 w-4" />
          {action.label}
        </Button>
      )}
    </div>
  );
}
