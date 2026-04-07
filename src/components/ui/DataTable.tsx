import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { SearchX, Loader2 } from "lucide-react";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[] | undefined;
  loading?: boolean;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  emptySubtitle?: string;
  className?: string;
  rowClassName?: string;
}

export function DataTable<T>({
  columns,
  data,
  loading,
  onRowClick,
  emptyMessage = "Aucune donnée trouvée",
  emptySubtitle = "Essayez d'ajuster vos filtres ou d'ajouter un nouvel élément.",
  className,
  rowClassName,
}: DataTableProps<T>) {
  // Skeleton Loader for Premium Feel
  if (loading) {
    return (
      <div className={cn("rounded-[2rem] border border-slate-100 bg-white overflow-hidden shadow-sm", className)}>
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-b border-slate-100">
              {columns.map((column, idx) => (
                <TableHead
                  key={idx}
                  className={cn("text-[#64748B] font-medium text-[15px] py-6 px-8", column.headerClassName || column.className)}
                >
                  <div className="h-4 w-20 bg-slate-200 animate-pulse rounded-full" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i} className="border-b border-slate-50">
                {columns.map((_, j) => (
                  <TableCell key={j} className="py-6 px-8">
                    <div className="h-4 w-full bg-slate-100 animate-pulse rounded-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className={cn("rounded-[2rem] border border-slate-100 bg-white shadow-sm overflow-hidden", className)}>
      <Table>
        <TableHeader className="bg-slate-50/30">
          <TableRow className="hover:bg-transparent border-b border-slate-100">
            {columns.map((column, idx) => (
              <TableHead
                key={idx}
                className={cn("text-[#64748B] font-medium text-[15px] py-6 px-8", column.headerClassName || column.className)}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item, idx) => (
              <TableRow
                key={idx}
                className={cn(
                  "border-b border-slate-50 hover:bg-slate-50/40 transition-all duration-200 group",
                  onRowClick && "cursor-pointer",
                  rowClassName
                )}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column, colIdx) => (
                  <TableCell key={colIdx} className={cn("py-5 px-8 text-[#1E293B] text-[16px]", column.className)}>
                    {column.cell
                      ? column.cell(item)
                      : column.accessorKey
                      ? (item[column.accessorKey] as React.ReactNode)
                      : null}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="py-24 text-center"
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-50">
                    <SearchX className="h-10 w-10 text-slate-300" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[18px] font-semibold text-[#0F172A]">{emptyMessage}</p>
                    <p className="text-[15px] text-[#64748B] font-light max-w-xs mx-auto">
                      {emptySubtitle}
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
