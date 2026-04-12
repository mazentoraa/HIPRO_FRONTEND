import React from "react";
import { cn } from "@/lib/utils";

export type AttendanceStatus = "present" | "late" | "absent" | "excused";

interface AttendanceBadgeProps {
  status: AttendanceStatus;
  className?: string;
}

const statusConfig = {
  present: {
    label: "Présent",
    className: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  late: {
    label: "En retard",
    className: "bg-amber-50 text-amber-600 border-amber-100",
  },
  absent: {
    label: "Absent",
    className: "bg-rose-50 text-rose-600 border-rose-100",
  },
  excused: {
    label: "Excusé",
    className: "bg-slate-50 text-slate-500 border-slate-200",
  },
};

export function AttendanceBadge({ status, className }: AttendanceBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
