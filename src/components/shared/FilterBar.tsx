import React from "react";
import { Search, ChevronDown, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  label: string;
  value: string;
  options: FilterOption[];
}

interface FilterBarProps {
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters?: FilterGroup[];
}

export function FilterBar({
  searchPlaceholder = "Rechercher...",
  searchValue,
  onSearchChange,
  filters = [],
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-start py-4 flex-1 w-full">
      <div className="relative flex-1 group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 transition-colors group-focus-within:text-primary" />
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 bg-slate-100/80 dark:bg-slate-800/40 border-slate-200/50 dark:border-slate-700/50 h-14 rounded-full focus:ring-4 focus:ring-primary/5 transition-all text-[15px] placeholder:text-slate-400 w-full"
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant="ghost"
            size="sm"
            className="h-14 px-6 rounded-2xl gap-3 bg-slate-100/80 dark:bg-slate-800/40 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[15px] font-normal shrink-0 transition-colors border border-slate-200/50 dark:border-slate-700/50"
          >
            {filter.label}
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </Button>
        ))}
      </div>
    </div>
  );
}
