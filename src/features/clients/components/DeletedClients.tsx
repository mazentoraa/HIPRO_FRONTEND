"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchInput } from "@/components/ui/SearchInput";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import { useDeletedClients, useRestoreClient } from "../hooks/useClients";
import { IClient } from "../types/client";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { TrashTable } from "@/components/ui/TrashTable";
import { FilterBar } from "@/components/shared/FilterBar";

export function DeletedClients() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // --- FULL BACKEND INTEGRATION ---
  const { data: backendData, isLoading } = useDeletedClients(search, page);
  const restoreMutation = useRestoreClient();

  const results = backendData?.results || [];
  const hasNext = !!backendData?.next;
  const hasPrevious = !!backendData?.previous;

  const columns: Column<IClient>[] = [
    {
      header: "Client",
      className: "min-w-[200px]",
      cell: (client: IClient) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 font-medium">
            {client.first_name?.[0]}{client.last_name?.[0]}
          </div>
          <span className="font-medium text-slate-700">
            {client.first_name} {client.last_name}
          </span>
        </div>
      ),
    },
    {
      header: "Supprimé le",
      accessorKey: "deleted_at",
      className: "text-slate-500",
      cell: (client: IClient) => client.deleted_at ? new Date(client.deleted_at).toLocaleDateString() : "—",
    },
  ];

  return (
    <div className="animate-fade-in space-y-6 bg-[#F8FAFC] min-h-screen px-8 pt-6 pb-12">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => router.push("/clients")}
          className="rounded-xl h-10 w-10 p-0 text-slate-400 hover:text-[#0F172A]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Corbeille</h1>
          <p className="text-sm text-slate-500 font-light">
            Restaurer les clients supprimés
          </p>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row xl:items-center justify-between py-2 group gap-4 w-full">
        <FilterBar
          searchPlaceholder="Rechercher dans la corbeille..."
          searchValue={search}
          onSearchChange={(val: string) => {
            setSearch(val);
            setPage(1);
          }}
          filters={[]} /* Add any trash specific filters here if needed */
        />
      </div>
      <TrashTable<IClient>
        data={results}
        columns={columns}
        loading={isLoading}
        onRestore={(client) => restoreMutation.mutate(client.id)}
        emptyMessage={
          search 
            ? `Aucun client supprimé trouvé pour "${search}"` 
            : "La corbeille est vide."
        }
      />
      
      {/* Pagination Simple */}
      <div className="flex items-center justify-between mt-4 text-sm text-slate-500">
        <div>
          Affichage de la page {page}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1 || isLoading}
            onClick={() => setPage(page - 1)}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!hasNext || isLoading}
            onClick={() => setPage(page + 1)}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}
