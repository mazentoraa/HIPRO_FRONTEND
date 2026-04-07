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
  CreditCard 
} from "lucide-react";
import { useClient } from "../hooks/useClients";
import { IClient } from "../types/client";
import { ClientFormModal } from "./ClientFormModal";

// --- MOCK DATA FOR THE SELECTED ICLIENT (Fallback) ---
const MOCK_ICLIENT_DETAIL: IClient = {
  id: 1,
  first_name: "Sarah",
  last_name: "Johnson",
  email: "sarah.j@example.com",
  phone: "+33 6 12 34 56 78",
  is_minor: false,
  is_deleted: false,
  deleted_at: null,
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-03-20T15:30:00Z",
  age: 24,
  payment_status: "Payé",
  first_parent_name: null,
  first_parent_phone: null,
  first_parent_email: null,
  second_parent_name: null,
  second_parent_phone: null,
  second_parent_email: null,
};

export default function ClientDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const { data: backendClient, isLoading } = useClient(Number(id));
  const client = backendClient || MOCK_ICLIENT_DETAIL;

  if (isLoading) return <div className="p-8 text-center text-slate-500 font-light">Chargement du profil...</div>;

  return (
    <div className="animate-fade-in space-y-8 bg-[#F8FAFC] min-h-screen pb-12">
      {/* Profile Header Card */}
      <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-slate-100 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-[2rem] bg-[#EEF2FF] flex items-center justify-center text-[#4338CA] text-3xl font-semibold border border-indigo-50/50">
            {client.first_name?.[0]}{client.last_name?.[0]}
          </div>

          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h1 className="text-[32px] font-bold text-[#0F172A] tracking-tight">
                  {client.first_name} {client.last_name}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="bg-[#DCFCE7] text-[#166534] px-3 py-1 rounded-full text-[13px] font-medium">Active</span>
                  <span className="bg-[#FEF3C7] text-[#92400E] px-3 py-1 rounded-full text-[13px] font-medium">Age {client.age || 12}</span>
                </div>
              </div>
              <p className="text-[16px] text-slate-500 font-normal">
                Enrolled in Swimming · Since Jan 2024
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-slate-500">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-slate-400" />
                <span className="text-[15px]">{client.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-slate-400" />
                <span className="text-[15px]">{client.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button 
            variant="outline"
            className="h-12 px-6 rounded-2xl border-slate-200 text-slate-600 hover:text-[#0F172A] transition-all gap-2 font-medium"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit className="h-4 w-4" /> Edit
          </Button>
          <Button 
            className="h-12 px-6 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-all gap-2 font-medium shadow-lg shadow-blue-200"
          >
            <Calendar className="h-5 w-5" /> Schedule
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="info" className="space-y-8">
        <TabsList className="bg-transparent p-0 flex items-center gap-2 h-auto">
          <TabsTrigger value="info" className="rounded-full px-6 py-2.5 bg-white/50 text-slate-500 data-[state=active]:bg-white data-[state=active]:text-[#0F172A] data-[state=active]:shadow-sm border-transparent hover:bg-white/80 transition-all text-[15px] font-medium">
            Information
          </TabsTrigger>
          <TabsTrigger value="attendance" className="rounded-full px-6 py-2.5 bg-white/50 text-slate-500 data-[state=active]:bg-white data-[state=active]:text-[#0F172A] data-[state=active]:shadow-sm border-transparent hover:bg-white/80 transition-all text-[15px] font-medium">
            Attendance
          </TabsTrigger>
          <TabsTrigger value="payments" className="rounded-full px-6 py-2.5 bg-white/50 text-slate-500 data-[state=active]:bg-white data-[state=active]:text-[#0F172A] data-[state=active]:shadow-sm border-transparent hover:bg-white/80 transition-all text-[15px] font-medium">
            Payments
          </TabsTrigger>
          <TabsTrigger value="notes" className="rounded-full px-6 py-2.5 bg-white/50 text-slate-500 data-[state=active]:bg-white data-[state=active]:text-[#0F172A] data-[state=active]:shadow-sm border-transparent hover:bg-white/80 transition-all text-[15px] font-medium">
            Notes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="animate-in fade-in slide-in-from-bottom-3 duration-500 outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information Card */}
            <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 border border-slate-100 h-full">
              <h3 className="text-[20px] font-bold text-[#0F172A] mb-8">Personal Information</h3>
              <div className="space-y-6">
                <DetailRow label="Full Name" value={`${client.first_name} ${client.last_name}`} />
                <DetailRow label="Date of Birth" value={client.date_of_birth ? new Date(client.date_of_birth).toLocaleDateString() : "—"} />
                <DetailRow label="Gender" value={client.gender || "—"} />
                <DetailRow label="Blood Type" value={client.blood_type || "—"} />
              </div>
            </div>

            {/* Parent / Guardian Card */}
            <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 border border-slate-100 h-full">
              <h3 className="text-[20px] font-bold text-[#0F172A] mb-8">Parent / Guardian</h3>
              <div className="space-y-6">
                <DetailRow label="Name" value={client.first_parent_name || "—"} />
                <DetailRow label="Relation" value={client.first_parent_relation || "—"} />
                <DetailRow label="Phone" value={client.first_parent_phone || "—"} />
                <DetailRow label="Email" value={client.first_parent_email || "—"} />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="animate-in fade-in slide-in-from-bottom-3 duration-500">
          <div className="bg-white rounded-[2.5rem] shadow-sm p-8 border border-slate-100">
            <h3 className="text-xl font-bold text-[#0F172A] mb-6">Attendance Overview</h3>
            <div className="space-y-2">
              <AttendanceRecord date="2024-03-20" status="present" time="14:00" session="Swimming Advanced" />
              <AttendanceRecord date="2024-03-18" status="late" time="14:15" session="Swimming Advanced" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="animate-in fade-in slide-in-from-bottom-3 duration-500">
          <div className="bg-white rounded-[2.5rem] shadow-sm p-8 border border-slate-100">
            <h3 className="text-xl font-bold text-[#0F172A] mb-6">Payment History</h3>
            <PaymentRecord date="2024-03-01" amount="150€" status="Success" period="March 2024" />
          </div>
        </TabsContent>

        <TabsContent value="notes" className="animate-in fade-in slide-in-from-bottom-3 duration-500">
          <div className="bg-white rounded-[2.5rem] shadow-sm p-8 border border-slate-100">
            <h3 className="text-xl font-bold text-[#0F172A] mb-4">Client Notes</h3>
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 italic text-slate-500">
              "No specific notes recorded for this client."
            </div>
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

function DetailRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0 pb-3">
      <p className="text-[15px] text-slate-400 font-light">{label}</p>
      <p className="text-[16px] font-semibold text-[#0F172A] text-right">{value || "—"}</p>
    </div>
  );
}

function AttendanceRecord({ date, status, time, session }: { date: string; status: "present" | "late" | "excused" | "absent"; time: string; session: string }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
          <Clock className="h-5 w-5" />
        </div>
        <div>
          <p className="font-bold text-[#0F172A]">{session}</p>
          <p className="text-xs text-slate-500">{new Date(date).toLocaleDateString()} à {time}</p>
        </div>
      </div>
      <AttendanceBadge status={status} />
    </div>
  );
}

function PaymentRecord({ date, amount, status, period }: { date: string; amount: string; status: string; period: string }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
          <CreditCard className="h-5 w-5" />
        </div>
        <div>
          <p className="font-bold text-[#0F172A]">{period}</p>
          <p className="text-xs text-slate-500">Payé le {new Date(date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-bold text-[#0F172A]">{amount}</span>
        <StatusBadge status={status} type="success" />
      </div>
    </div>
  );
}
