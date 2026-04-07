"use client";

import { useState, useEffect } from "react";
import { Loader2, ChevronDown, X } from "lucide-react";

import { IClient } from "../types/client";
import { useCreateClient, useUpdateClient } from "../hooks/useClients";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

interface ClientFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: IClient | null;
}

export function ClientFormModal({ isOpen, onClose, initialData }: ClientFormModalProps) {
    const isEdit = !!initialData;
    const createMutation = useCreateClient();
    const updateMutation = useUpdateClient();

    const isLoading = createMutation.isPending || updateMutation.isPending;

    const [formData, setFormData] = useState<Partial<IClient>>({
        first_name: "", last_name: "", phone: "", email: "", is_minor: false,
        date_of_birth: "", gender: "Non spécifié", blood_type: "Inconnu",
        first_parent_name: "", first_parent_relation: "", first_parent_phone: "", first_parent_email: "",
        second_parent_name: "", second_parent_relation: "", second_parent_phone: "", second_parent_email: "",
        payment_status: "En attente"
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                first_name: "", last_name: "", phone: "", email: "", is_minor: false,
                date_of_birth: "", gender: "Non spécifié", blood_type: "Inconnu",
                first_parent_name: "", first_parent_relation: "", first_parent_phone: "", first_parent_email: "",
                second_parent_name: "", second_parent_relation: "", second_parent_phone: "", second_parent_email: "",
                payment_status: "En attente"
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && initialData) {
            updateMutation.mutate({ id: initialData.id, data: formData }, { onSuccess: onClose });
        } else {
            createMutation.mutate(formData, { onSuccess: onClose });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent
                className="w-full max-w-2xl p-0 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-10 p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="px-8 pt-8 pb-6">
                        <DialogTitle className="text-[22px] font-semibold text-gray-900 leading-tight">
                            {isEdit ? "Modifier le client" : "Ajouter un nouveau client"}
                        </DialogTitle>
                        <DialogDescription className="text-[14px] text-gray-400 mt-1 font-normal">
                            {isEdit
                                ? `Mettre à jour les détails pour ${formData.first_name} ${formData.last_name}`
                                : "Remplissez les détails pour enregistrer un nouveau client."}
                        </DialogDescription>
                    </div>

                    <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-8">

                        {/* INFORMATIONS PERSONNELLES */}
                        <div className="space-y-5">
                            <SectionTitle>Informations Personnelles</SectionTitle>

                            {/* Row 1: Nom Complet + Âge */}
                            <div className="grid grid-cols-2 gap-5">
                                <FormField label="Nom Complet" required>
                                    <TextInput
                                        name="first_name"
                                        value={formData.first_name || ""}
                                        onChange={handleChange}
                                        placeholder="ex: Sarah Johnson"
                                        required
                                    />
                                </FormField>
                                <FormField label="Âge" required>
                                    <TextInput
                                        name="age"
                                        type="number"
                                        value={(formData as any).age || ""}
                                        onChange={handleChange}
                                        placeholder="ex: 12"
                                        required
                                    />
                                </FormField>
                            </div>

                            {/* Row 2: Date de Naissance + Genre */}
                            <div className="grid grid-cols-2 gap-5">
                                <FormField label="Date de naissance">
                                    <TextInput
                                        name="date_of_birth"
                                        type="date"
                                        value={formData.date_of_birth || ""}
                                        onChange={handleChange}
                                    />
                                </FormField>
                                <FormField label="Genre">
                                    <SelectInput
                                        name="gender"
                                        value={formData.gender || "Non spécifié"}
                                        onChange={handleChange}
                                    >
                                        <option value="Non spécifié">Sélectionner le genre</option>
                                        <option value="Féminin">Féminin</option>
                                        <option value="Masculin">Masculin</option>
                                    </SelectInput>
                                </FormField>
                            </div>

                            {/* Row 3: Statut de Paiement + Programme */}
                            <div className="grid grid-cols-2 gap-5">

                                <FormField label="Programme" required>
                                    <SelectInput
                                        name="program"
                                        value={(formData as any).program || ""}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Choisir un programme</option>
                                        <option value="Natation">Natation</option>
                                        <option value="Mathématiques">Mathématiques</option>
                                        <option value="Yoga">Yoga</option>
                                        <option value="Art">Art</option>
                                    </SelectInput>
                                </FormField>

                                <FormField label="Statut de Paiement" required>
                                    <SelectInput
                                        name="payment_status"
                                        value={formData.payment_status || "En attente"}
                                        onChange={handleChange}
                                    >
                                        <option value="Payé">Payé</option>
                                        <option value="En attente">En attente</option>
                                        <option value="Retard">En retard</option>
                                    </SelectInput>
                                </FormField>
                            </div>
                        </div>

                        {/* CONTACT */}
                        <div className="space-y-5">
                            <SectionTitle>Contact</SectionTitle>
                            <div className="grid grid-cols-2 gap-5">
                                <FormField label="Email">
                                    <TextInput
                                        name="email"
                                        type="email"
                                        value={formData.email || ""}
                                        onChange={handleChange}
                                        placeholder="email@exemple.com"
                                    />
                                </FormField>
                                <FormField label="Téléphone">
                                    <TextInput
                                        name="phone"
                                        value={formData.phone || ""}
                                        onChange={handleChange}
                                        placeholder="+XX X XX XX XX"
                                    />
                                </FormField>
                            </div>
                        </div>

                        {/* PARENT / TUTEUR */}
                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <SectionTitle>Parent / Tuteur</SectionTitle>
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, is_minor: !prev.is_minor }))}
                                    className={`text-[12px] font-medium px-4 py-1.5 rounded-full border transition-all ${formData.is_minor
                                        ? "bg-gray-900 text-white border-gray-900"
                                        : "bg-white text-gray-400 border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    {formData.is_minor ? "Mineur: ACTIVER" : "Mineur: DÉSACTIVER"}
                                </button>
                            </div>

                            {formData.is_minor && (
                                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-1 duration-200">
                                    {/* Parent 1 */}
                                    <div className="grid grid-cols-2 gap-5">
                                        <FormField label="Nom Complet">
                                            <TextInput
                                                name="first_parent_name"
                                                value={formData.first_parent_name || ""}
                                                onChange={handleChange}
                                                placeholder="Nom complet du tuteur"
                                            />
                                        </FormField>
                                        <FormField label="Relation">
                                            <SelectInput
                                                name="first_parent_relation"
                                                value={formData.first_parent_relation || ""}
                                                onChange={handleChange}
                                            >
                                                <option value="">Sélectionner la relation</option>
                                                <option value="Mère">Mère</option>
                                                <option value="Père">Père</option>
                                                <option value="Autre">Autre</option>
                                            </SelectInput>
                                        </FormField>
                                        <FormField label="Téléphone">
                                            <TextInput
                                                name="first_parent_phone"
                                                value={formData.first_parent_phone || ""}
                                                onChange={handleChange}
                                                placeholder="+XX X XX XX XX"
                                            />
                                        </FormField>
                                        <FormField label="Email">
                                            <TextInput
                                                name="first_parent_email"
                                                type="email"
                                                value={formData.first_parent_email || ""}
                                                onChange={handleChange}
                                                placeholder="parent@exemple.com"
                                            />
                                        </FormField>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-dashed border-gray-100 pt-4">
                                        <p className="text-[12px] text-gray-400 mb-4 font-medium uppercase tracking-widest">Second Tuteur (optionnel)</p>
                                        <div className="grid grid-cols-2 gap-5">
                                            <FormField label="Nom Complet">
                                                <TextInput
                                                    name="second_parent_name"
                                                    value={formData.second_parent_name || ""}
                                                    onChange={handleChange}
                                                    placeholder="Nom complet du tuteur"
                                                />
                                            </FormField>
                                            <FormField label="Relation">
                                                <SelectInput
                                                    name="second_parent_relation"
                                                    value={formData.second_parent_relation || ""}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Sélectionner la relation</option>
                                                    <option value="Mère">Mère</option>
                                                    <option value="Père">Père</option>
                                                    <option value="Autre">Autre</option>
                                                </SelectInput>
                                            </FormField>
                                            <FormField label="Téléphone">
                                                <TextInput
                                                    name="second_parent_phone"
                                                    value={formData.second_parent_phone || ""}
                                                    onChange={handleChange}
                                                    placeholder="+XX X XX XX XX"
                                                />
                                            </FormField>
                                            <FormField label="Email">
                                                <TextInput
                                                    name="second_parent_email"
                                                    type="email"
                                                    value={formData.second_parent_email || ""}
                                                    onChange={handleChange}
                                                    placeholder="parent@exemple.com"
                                                />
                                            </FormField>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 text-[14px] font-medium text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 py-2.5 rounded-lg bg-gray-900 hover:bg-gray-700 text-white font-medium text-[14px] min-w-[160px] flex items-center justify-center transition-colors"
                            >
                                {isLoading
                                    ? <Loader2 className="h-4 w-4 animate-spin" />
                                    : (isEdit ? "Enregistrer" : "Ajouter le client")}
                            </button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

/* ─── Sub-components ─────────────────────────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
            {children}
        </h3>
    );
}

function FormField({ label, children, required = false }: { label: string; children: React.ReactNode; required?: boolean }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-gray-700 leading-none">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            {children}
        </div>
    );
}

function TextInput({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`
                w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4
                text-[14px] text-gray-900 placeholder:text-gray-300
                focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200
                transition-all
                \${className}
            `}
        />
    );
}

function SelectInput({ children, className = "", ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <div className="relative">
            <select
                {...props}
                className={`
                    w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 pr-10
                    text-[14px] text-gray-900 appearance-none cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200
                    transition-all
                    \${className}
                `}
            >
                {children}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
    );
}