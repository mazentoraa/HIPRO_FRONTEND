import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
  accent: "primary" | "gold" | "success" | "danger";
  onClick?: () => void;
}

export function StatsCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  accent,
  onClick,
}: StatsCardProps) {
  const accentStyles = {
    primary: "bg-blue-50 text-blue-600",
    gold: "bg-[#FDF2D9] text-[#D9A019]",
    success: "bg-emerald-50 text-emerald-600",
    danger: "bg-rose-50 text-rose-600",
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        "group rounded-[2rem] border border-slate-100 bg-white p-7 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50",
        onClick && "cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-[13px] font-normal text-slate-500">{title}</p>
          <h3 className="text-[32px] font-semibold tracking-tight text-slate-900">{value}</h3>
        </div>
        <div className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110",
          accentStyles[accent]
        )}>
          <Icon className="h-7 w-7" />
        </div>
      </div>
      <div className="mt-3">
        <span className={cn(
          "text-[13px] font-normal",
          changeType === "positive" ? "text-emerald-500" : "text-rose-500"
        )}>
          {change}
        </span>
      </div>
    </div>
  );
}
