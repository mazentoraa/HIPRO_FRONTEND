import React from "react";
import { DataTable, Column } from "./DataTable";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TrashTableProps<T> {
  data: T[] | undefined;
  columns: Column<T>[];
  onRestore: (item: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function TrashTable<T>({
  data,
  columns,
  onRestore,
  loading,
  emptyMessage = "La corbeille est vide.",
  className,
}: TrashTableProps<T>) {
  // We add a default "Actions" column for restoration to the provided columns
  const allColumns: Column<T>[] = [
    ...columns,
    {
      header: "Actions",
      className: "text-right px-6",
      cell: (item: T) => (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRestore(item);
            }}
            className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 h-9 px-4 gap-2 rounded-full transition-all duration-200 border border-transparent hover:border-emerald-100"
          >
            <RefreshCcw className="h-4 w-4" />
            <span className="text-sm font-medium">Restaurer</span>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={allColumns}
      loading={loading}
      emptyMessage={emptyMessage}
      className={cn("border border-[#F1F5F9] shadow-sm", className)}
    />
  );
}
