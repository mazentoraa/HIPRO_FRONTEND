import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  type: "info" | "success" | "neutral" | "warning";
}

export function StatusBadge({ status, type }: StatusBadgeProps) {
  const typeStyles = {
    info: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
    success: "bg-success/15 text-success dark:bg-success/20",
    neutral: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap shadow-sm",
        typeStyles[type]
      )}
    >
      {status}
    </span>
  );
}
