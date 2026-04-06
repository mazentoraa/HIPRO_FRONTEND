import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
  accent: "primary" | "gold" | "success";
}

export function StatsCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  accent,
}: StatsCardProps) {
  const accentStyles = {
    primary: "bg-primary/10 text-primary",
    gold: "bg-accent/10 text-accent",
    success: "bg-success/10 text-success",
  };

  return (
    <div className="premium-shadow rounded-2xl border border-border/50 bg-card p-6 transition-all hover:scale-[1.02]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight">{value}</h3>
        </div>
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl shadow-sm", accentStyles[accent])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1.5">
        <span
          className={cn(
            "text-xs font-semibold",
            changeType === "positive" ? "text-success" : "text-destructive"
          )}
        >
          {change}
        </span>
      </div>
    </div>
  );
}
