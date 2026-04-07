"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Archive,
} from "lucide-react";

import { SearchInput } from "@/components/ui/SearchInput";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import { useClients, useDeleteClient } from "../hooks/useClients";
import { IClient } from "../types/client";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { FilterBar } from "@/components/shared/FilterBar";
import { ClientFormModal } from "./ClientFormModal";

export function ClientList() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [clientToDelete, setClientToDelete] = useState<IClient | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<IClient | null>(null);

  const { data, isLoading } = useClients(search, page);
  const deleteMutation = useDeleteClient();

  const handleOpenAdd = () => {
    setClientToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (client: IClient) => {
    setClientToEdit(client);
    setIsFormModalOpen(true);
  };

  const handleDelete = () => {
    if (clientToDelete) {
      deleteMutation.mutate(clientToDelete.id);
      setClientToDelete(null);
    }
  };

  const columns: Column<IClient>[] = [
    {
      header: "Client",
      className: "min-w-[220px]",
      cell: (client: IClient) => (
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E0E7FF] text-[14px] font-medium text-[#4338CA]">
            {client.first_name?.[0]}{client.last_name?.[0]}
          </div>
          <span className="font-medium text-[#1E293B] text-[16px] tracking-tight">
            {client.first_name} {client.last_name}
          </span>
        </div>
      ),
    },
    {
      header: "Parent",
      className: "hidden lg:table-cell text-[#64748B]",
      cell: (client: IClient) => (client.is_minor ? client.first_parent_name : "—"),
    },
    {
      header: "Téléphone",
      accessorKey: "phone",
      className: "text-[#1E293B] text-[15px]",
    },
    {
      header: "Email",
      accessorKey: "email",
      className: "hidden xl:table-cell text-[#64748B] font-light",
    },
    {
      header: "Programme",
      accessorKey: "program",
      className: "hidden md:table-cell text-[#1E293B] font-medium",
    },
    {
      header: "Présence",
      className: "hidden lg:table-cell",
      cell: (client: IClient) => (
        <div className="flex items-center gap-3">
          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden shrink-0">
            <div 
              className="h-full bg-[#2563EB] rounded-full transition-all duration-1000"
              style={{ width: `${client.attendance || 0}%` }}
            />
          </div>
          <span className="text-[14px] font-medium text-slate-500 min-w-[35px]">
            {client.attendance || 0}%
          </span>
        </div>
      ),
    },
    {
      header: "Paiement",
      className: "hidden md:table-cell",
      cell: (client: IClient) => (
        <StatusBadge
          status={client.payment_status || "Inconnue"}
          type={
            client.payment_status === "Payé"
              ? "success"
              : client.payment_status === "Retard"
                ? "danger"
                : "warning"
          }
        />
      ),
    },
    {
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      cell: (client: IClient) => (
        <div
          className="flex items-center justify-end gap-5"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            title="Voir"
            onClick={() => router.push(`/clients/${client.id}`)}
            className="text-[#1E293B] hover:text-[#D9A019] hover:scale-110 transition-all"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            title="Modifier"
            onClick={() => handleOpenEdit(client)}
            className="text-[#1E293B] hover:text-[#D9A019] hover:scale-110 transition-all"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            title="Supprimer"
            onClick={() => setClientToDelete(client)}
            className="text-[#1E293B] hover:text-red-500 hover:scale-110 transition-all"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="animate-fade-in space-y-2 bg-[#F8FAFC] min-h-screen px-8 pt-4 pb-12">
      <div className="flex items-center justify-between mb-2">
        <div className="space-y-0.5">
          <h1 className="text-[40px] font-semibold tracking-tight text-[#0F172A] leading-tight">
            Clients
          </h1>
          <p className="text-[17px] text-[#64748B] font-light">
            Gérez tous les clients et étudiants enregistrés
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-12 border-slate-200 text-slate-500 hover:text-[#D9A019] hover:border-[#D9A019] transition-all"
            onClick={() => router.push("/clients/trash")}
          >
            <Archive className="mr-2 h-5 w-5" />
            Corbeille
          </Button>
          <Button
            variant="accent"
            className="h-12"
            onClick={handleOpenAdd}
          >
            <Plus className="mr-2 h-5 w-5" />
            Ajouter un client
          </Button>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row xl:items-center justify-between py-4 group gap-4 w-full">
          <FilterBar
            searchPlaceholder="Rechercher des clients..."
            searchValue={search}
            onSearchChange={(val: string) => {
              setSearch(val);
              setPage(1);
            }}
            filters={[
                {
                    label: "Programme",
                    value: "program",
                    options: [
                        { label: "Natation", value: "swimming" },
                        { label: "Mathématiques", value: "math" },
                        { label: "Yoga", value: "yoga" },
                        { label: "Art", value: "art" },
                    ],
                },
                {
                    label: "Paiement",
                    value: "payment",
                    options: [
                        { label: "Payé", value: "paid" },
                        { label: "En attente", value: "pending" },
                        { label: "Retard", value: "overdue" },
                    ],
                },
            ]}
          />

        <div className="flex items-center gap-4 bg-white/50 p-1.5 rounded-full border border-slate-100/50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || isLoading}
            className="h-9 w-9 rounded-full text-slate-400 hover:text-[#D9A019] hover:bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-[13px] font-medium text-slate-600 px-2 min-w-[60px] text-center">
            Page {page}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPage((p) => p + 1)}
            disabled={!data?.next || isLoading}
            className="h-9 w-9 rounded-full text-slate-400 hover:text-[#D9A019] hover:bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <DataTable
        data={data?.results}
        columns={columns}
        loading={isLoading}
        onRowClick={(client) => router.push(`/clients/${client.id}`)}
        emptyMessage={
          search
            ? `Aucun résultat pour "${search}"`
            : "Aucun client n'a encore été enregistré."
        }
      />

      <div className="flex items-center justify-between mt-6 px-4">
        <p className="text-[14px] text-slate-400 font-light italic">
          Affichage des résultats pour la page {page} (Mode Démo)
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[14px] text-slate-400 mr-2">Naviguer</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || isLoading}
            className="rounded-xl border-slate-200 text-slate-500 h-9"
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={!data?.next || isLoading}
            className="rounded-xl border-slate-200 text-slate-500 h-9"
          >
            Suivant
          </Button>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!clientToDelete}
        onClose={() => setClientToDelete(null)}
        onConfirm={handleDelete}
        title="Supprimer le client ?"
        description={`Êtes-vous sûr de vouloir supprimer ${clientToDelete?.first_name} ${clientToDelete?.last_name} ? Il pourra être restauré depuis la corbeille.`}
        confirmLabel="Supprimer"
      />

      <ClientFormModal 
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        initialData={clientToEdit}
      />
    </div>
  );
}

export default ClientList;
