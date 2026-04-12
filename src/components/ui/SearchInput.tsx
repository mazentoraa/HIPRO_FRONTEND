import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  debounceTime?: number;
  className?: string;
  initialValue?: string;
}

export function SearchInput({
  placeholder = "Rechercher...",
  onSearch,
  debounceTime = 400,
  className,
  initialValue = "",
}: SearchInputProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [value, onSearch, debounceTime]);

  return (
    <div className={cn("relative flex-1 group", className)}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-12 pl-12 pr-4 bg-slate-100/80 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50 rounded-full text-[15px] focus:outline-none transition-all placeholder:text-slate-400"
      />
    </div>
  );
}
