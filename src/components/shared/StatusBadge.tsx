import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  type: "info" | "success" | "neutral" | "warning" | "danger";
}

export function StatusBadge({ status, type }: StatusBadgeProps) {
  const typeStyles = {
    info: "bg-sky-50 text-sky-500",
    success: "bg-emerald-50 text-emerald-500",
    neutral: "bg-slate-50 text-slate-500",
    warning: "bg-orange-50 text-orange-500",
    danger: "bg-rose-50 text-rose-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-4 py-1.5 text-[12px] font-normal whitespace-nowrap tracking-wide",
        typeStyles[type]
      )}
    >
      {status}
    </span>
  );
}
