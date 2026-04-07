"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Eye,
    Edit,
    Archive,
    MessageSquare,
    Plus,
    Trash2,
} from "lucide-react";

import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar } from "@/components/shared/FilterBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/DataTable";

interface Client {
    id: number;
    name: string;
    age: number;
    parent: string;
    program: string;
    attendance: number;
    payment: string;
    avatar: string;
}

/** 
 * DOCUMENTATION API (MÉMO TECHNIQUE)
 * --------------------------------
 * Endpoint : GET /api/clients
 * Méthode  : GET
 * Querystring : ?search=...&program=...&payment=...&page=...&limit=...
 * 
 * Réponse attendue (JSON) :
 * {
 *   "data": [
 *     {
 *       "id": "number",
 *       "name": "string",
 *       "age": "number",
 *       "parent": "string | null",
 *       "program": "string",
 *       "attendance": "number (0-100)",
 *       "payment": "string (Payé | En attente | Retard)",
 *       "avatar": "string (initials)"
 *     }
 *   ],
 *   "total": 1284,
 *   "page": 1
 * }
 */

const clients = [
    {
        id: 1,
        name: "Sarah Johnson",
        age: 12,
        parent: "Emily Johnson",
        program: "Natation",
        attendance: 95,
        payment: "Payé",
        avatar: "SJ",
    },
    {
        id: 2,
        name: "Alex Martinez",
        age: 9,
        parent: "Carlos Martinez",
        program: "Mathématiques",
        attendance: 88,
        payment: "En attente",
        avatar: "AM",
    },
    {
        id: 3,
        name: "Lina Chen",
        age: 28,
        parent: "—",
        program: "Yoga",
        attendance: 76,
        payment: "Retard",
        avatar: "LC",
    },
    {
        id: 4,
        name: "Omar Khalid",
        age: 15,
        parent: "Fatima Khalid",
        program: "Art",
        attendance: 92,
        payment: "Payé",
        avatar: "OK",
    },
    {
        id: 5,
        name: "Maya Williams",
        age: 7,
        parent: "John Williams",
        program: "Piano",
        attendance: 100,
        payment: "Payé",
        avatar: "MW",
    },
    {
        id: 6,
        name: "David Park",
        age: 35,
        parent: "—",
        program: "Arts Martiaux",
        attendance: 84,
        payment: "En attente",
        avatar: "DP",
    },
    {
        id: 7,
        name: "Nora Ahmed",
        age: 11,
        parent: "Hassan Ahmed",
        program: "Natation",
        attendance: 91,
        payment: "Payé",
        avatar: "NA",
    },
    {
        id: 8,
        name: "James Lee",
        age: 14,
        parent: "Susan Lee",
        program: "Mathématiques",
        attendance: 67,
        payment: "Retard",
        avatar: "JL",
    },
    {
        id: 9,
        name: "Sami Ben Ali",
        age: 19,
        parent: "—",
        program: "Kickboxing",
        attendance: 98,
        payment: "Payé",
        avatar: "SB",
    },
    {
        id: 10,
        name: "Ines Trabelsi",
        age: 8,
        parent: "Mounir Trabelsi",
        program: "Danse",
        attendance: 82,
        payment: "En attente",
        avatar: "IT",
    },
    {
        id: 11,
        name: "Yassine Mansouri",
        age: 10,
        parent: "Hedi Mansouri",
        program: "Échecs",
        attendance: 100,
        payment: "Payé",
        avatar: "YM",
    },
    {
        id: 12,
        name: "Fatma Ghorbel",
        age: 32,
        parent: "—",
        program: "Peinture",
        attendance: 45,
        payment: "Retard",
        avatar: "FG",
    },
    {
        id: 13,
        name: "Karim Zribi",
        age: 22,
        parent: "—",
        program: "Musculation",
        attendance: 89,
        payment: "Payé",
        avatar: "KZ",
    },
    {
        id: 14,
        name: "Amira Jendoubi",
        age: 6,
        parent: "Selim Jendoubi",
        program: "Natation Enfant",
        attendance: 93,
        payment: "En attente",
        avatar: "AJ",
    },
    {
        id: 15,
        name: "Adam Saidi",
        age: 16,
        parent: "Leila Saidi",
        program: "Robotique",
        attendance: 78,
        payment: "Payé",
        avatar: "AS",
    }
];

const getPaymentType = (status: string): "success" | "warning" | "info" | "neutral" | "danger" => {
    if (status === "Payé") return "success";
    if (status === "En attente") return "warning";
    if (status === "Retard") return "danger";
    return "neutral";
};

export default function ClientsPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const filteredClients = useMemo(() => {
        return clients.filter((client) =>
            client.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    return (
        <div className="animate-fade-in space-y-2 bg-[#F8FAFC] min-h-screen px-8 pt-4 pb-12">
            {/* Header Section */}
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
                        <Trash2 className="mr-2 h-5 w-5" />
                        Corbeille
                    </Button>
                    <Button variant="accent" className="h-12" onClick={() => router.push("/clients/new")}>
                        <Plus className="mr-2 h-5 w-5" />
                        Ajouter un client
                    </Button>
                </div>
            </div>

            <FilterBar
                searchPlaceholder="Rechercher des clients..."
                searchValue={search}
                onSearchChange={setSearch}
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

            <DataTable
                className="mx-2 mb-6"
                data={filteredClients}
                onRowClick={(client) => router.push(`/clients/${client.id}`)}
                columns={[
                    {
                        header: "Client",
                        className: "min-w-[200px]",
                        cell: (client: Client) => (
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E0E7FF] text-[14px] font-normal text-[#4338CA]">
                                    {client.avatar}
                                </div>
                                <span className="font-medium text-[#1E293B] text-[16px] tracking-tight">{client.name}</span>
                            </div>
                        ),
                    },
                    {
                        header: "Âge",
                        accessorKey: "age",
                        className: "hidden md:table-cell",
                    },
                    {
                        header: "Parent",
                        accessorKey: "parent",
                        className: "hidden lg:table-cell",
                    },
                    {
                        header: "Programme",
                        accessorKey: "program",
                    },
                    {
                        header: "Présence",
                        className: "hidden sm:table-cell",
                        cell: (client: Client) => (
                            <div className="flex items-center gap-4">
                                <div className="h-[7px] w-32 overflow-hidden rounded-full bg-[#F1F5F9]">
                                    <div
                                        className="h-full rounded-full bg-[#2563EB]"
                                        style={{ width: `${client.attendance}%` }}
                                    />
                                </div>
                                <span className="text-[14px] text-[#94A3B8] font-normal">
                                    {client.attendance}%
                                </span>
                            </div>
                        ),
                    },
                    {
                        header: "Paiement",
                        cell: (client: Client) => (
                            <StatusBadge
                                status={client.payment}
                                type={getPaymentType(client.payment)}
                            />
                        ),
                    },
                    {
                        header: "Actions",
                        headerClassName: "text-right",
                        className: "text-right",
                        cell: (client: Client) => (
                            <div
                                className="flex items-center justify-end gap-5"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button className="text-[#1E293B] hover:text-[#D9A019] hover:scale-110 transition-all">
                                    <Eye className="h-5 w-5" />
                                </button>
                                <button className="text-[#1E293B] hover:text-[#D9A019] hover:scale-110 transition-all">
                                    <Edit className="h-5 w-5" />
                                </button>
                                <button className="text-[#1E293B] hover:text-[#D9A019] hover:scale-110 transition-all hidden sm:block">
                                    <MessageSquare className="h-5 w-5" />
                                </button>
                                <button className="text-[#1E293B] hover:text-red-500 hover:scale-110 transition-all">
                                    <Archive className="h-5 w-5" />
                                </button>
                            </div>
                        ),
                    },
                ]}
            />
        </div>
    );
}
