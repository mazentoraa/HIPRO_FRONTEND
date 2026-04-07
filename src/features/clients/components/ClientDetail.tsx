"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { AttendanceBadge } from "@/components/shared/AttendanceBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Mail,
  Phone,
  Edit,
  Calendar,
  Clock,
  CreditCard,
} from "lucide-react";
import { useClient } from "../hooks/useClients";
import { IClient } from "../types/client";
import { ClientFormModal } from "./ClientFormModal";

const MOCK_ICLIENT_DETAIL: IClient = {
  id: 1,
  first_name: "Sarah",
  last_name: "Johnson",
  email: "sarah.j@example.com",
  phone: "+1 555 123 456",
  is_minor: true,
  is_deleted: false,
  deleted_at: null,
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-03-20T15:30:00Z",
  age: 12,
  gender: "Féminin",
  date_of_birth: "2012-03-15",
  program: "Natation",
  payment_status: "Payé",
  first_parent_name: "Emily Johnson",
  first_parent_relation: "Mère",
  first_parent_phone: "+1 555 123 456",
  first_parent_email: "emily.j@email.com",
  second_parent_name: null,
  second_parent_relation: null,
  second_parent_phone: null,
  second_parent_email: null,
};

export default function ClientDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: backendClient, isLoading } = useClient(Number(id));
  const client = backendClient || MOCK_ICLIENT_DETAIL;

  if (isLoading)
    return (
      <div className="p-8 text-center text-gray-400 text-sm">
        Chargement du profil...
      </div>
    );

  const initials = `${client.first_name?.[0] ?? ""}${client.last_name?.[0] ?? ""}`;

  return (
    <div className="min-h-screen bg-[#F4F6F9] px-6 py-6 space-y-6" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[14px] text-gray-500 hover:text-gray-800 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour aux clients
      </button>

      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-7 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-[#EEF0FF] flex items-center justify-center text-[#4338CA] text-2xl font-bold select-none flex-shrink-0">
            {initials}
          </div>

          {/* Info */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-[26px] font-bold text-gray-900 tracking-tight leading-none">
                {client.first_name} {client.last_name}
              </h1>
              <span className="bg-[#DCFCE7] text-[#166534] text-[12px] font-semibold px-3 py-1 rounded-full">
                Actif
              </span>
              <span className="bg-[#FEF9C3] text-[#854D0E] text-[12px] font-semibold px-3 py-1 rounded-full">
                Âge {client.age ?? "—"}
              </span>
            </div>

            <p className="text-[14px] text-gray-400">
              Inscrit en {(client as any).program ?? "—"} · Depuis{" "}
              {client.created_at
                ? new Date(client.created_at).toLocaleDateString("fr-FR", { month: "short", year: "numeric" })
                : "—"}
            </p>

            <div className="flex flex-wrap items-center gap-5 text-gray-500 pt-1">
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-[14px]">{client.email || "—"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-[14px]">{client.phone || "—"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2 h-10 px-5 rounded-full border border-gray-200 bg-white text-[14px] font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Modifier
          </button>
          <button className="flex items-center gap-2 h-10 px-5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[14px] font-medium transition-colors shadow-md shadow-blue-200">
            <Calendar className="w-4 h-4" />
            Calendrier
          </button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="info" className="space-y-5">
        <TabsList className="bg-white border border-gray-100 rounded-2xl p-1.5 h-auto flex gap-1 w-fit shadow-sm">
          {[
            { value: "info", label: "Informations" },
            { value: "attendance", label: "Présences" },
            { value: "payments", label: "Paiements" },
            { value: "notes", label: "Notes" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="px-5 py-2 rounded-xl text-[14px] font-medium text-gray-400
                data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm
                hover:text-gray-600 transition-all border-transparent"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Information Tab */}
        <TabsContent value="info" className="outline-none animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h3 className="text-[17px] font-bold text-gray-900 mb-6">Informations Personnelles</h3>
              <div className="space-y-0 divide-y divide-gray-50">
                <DetailRow label="Nom Complet" value={`${client.first_name} ${client.last_name}`} />
                <DetailRow
                  label="Date de Naissance"
                  value={client.date_of_birth ?? null}
                />
                <DetailRow label="Genre" value={client.gender ?? null} />
                <DetailRow label="Programme" value={(client as any).program ?? null} />
                <DetailRow label="Statut de Paiement" value={client.payment_status ?? null} />
              </div>
            </div>

            {/* Parent / Guardian */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h3 className="text-[17px] font-bold text-gray-900 mb-6">Parent / Tuteur</h3>
              <div className="space-y-0 divide-y divide-gray-50">
                <DetailRow label="Nom" value={client.first_parent_name ?? null} />
                <DetailRow label="Relation" value={client.first_parent_relation ?? null} />
                <DetailRow label="Téléphone" value={client.first_parent_phone ?? null} />
                <DetailRow label="Email" value={client.first_parent_email ?? null} />
                {client.second_parent_name && (
                  <>
                    <DetailRow label="2ème Parent" value={client.second_parent_name} />
                    <DetailRow label="Relation" value={client.second_parent_relation ?? null} />
                    <DetailRow label="Téléphone" value={client.second_parent_phone ?? null} />
                    <DetailRow label="Email" value={client.second_parent_email ?? null} />
                  </>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="outline-none animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-[17px] font-bold text-gray-900 mb-5">Aperçu des Présences</h3>
            <div className="space-y-2">
              <AttendanceRecord date="2024-03-20" status="present" time="14:00" session="Swimming Advanced" />
              <AttendanceRecord date="2024-03-18" status="late" time="14:15" session="Swimming Advanced" />
            </div>
          </div>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="outline-none animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-[17px] font-bold text-gray-900 mb-5">Historique des Paiements</h3>
            <PaymentRecord date="2024-03-01" amount="150€" status="Success" period="Mars 2024" />
          </div>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="outline-none animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-[17px] font-bold text-gray-900 mb-4">Notes Client</h3>
            <p className="text-[14px] text-gray-400 italic bg-gray-50 rounded-xl px-5 py-4 border border-gray-100">
              Aucune note enregistrée pour ce client.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <ClientFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={client}
      />
    </div>
  );
}

/* ─── Sub-components ─── */

function DetailRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex items-center justify-between py-3.5">
      <span className="text-[14px] text-gray-400 font-normal">{label}</span>
      <span className="text-[14px] font-semibold text-gray-900">{value || "—"}</span>
    </div>
  );
}

function AttendanceRecord({
  date, status, time, session,
}: {
  date: string;
  status: "present" | "late" | "excused" | "absent";
  time: string;
  session: string;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
          <Clock className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[14px] font-semibold text-gray-900">{session}</p>
          <p className="text-[12px] text-gray-400">
            {new Date(date).toLocaleDateString()} à {time}
          </p>
        </div>
      </div>
      <AttendanceBadge status={status} />
    </div>
  );
}

function PaymentRecord({
  date, amount, status, period,
}: {
  date: string;
  amount: string;
  status: string;
  period: string;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
          <CreditCard className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[14px] font-semibold text-gray-900">{period}</p>
          <p className="text-[12px] text-gray-400">
            Payé le {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[14px] font-bold text-gray-900">{amount}</span>
        <StatusBadge status={status} type="success" />
      </div>
    </div>
  );
}