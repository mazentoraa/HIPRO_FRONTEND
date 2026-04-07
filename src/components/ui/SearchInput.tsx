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
        className="w-full h-12 pl-12 pr-4 bg-slate-50/50 border-2 border-primary/20 rounded-full text-[15px] focus:outline-none focus:border-primary/80 focus:bg-white transition-all placeholder:text-slate-400"
      />
    </div>
  );
}
