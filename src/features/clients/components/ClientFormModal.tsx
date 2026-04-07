"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, X, Calendar, ChevronDown } from "lucide-react";

import { IClient } from "../types/client";
import { useCreateClient, useUpdateClient } from "../hooks/useClients";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
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

    const [showSecondParent, setShowSecondParent] = useState(false);
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
            setShowSecondParent(!!initialData.second_parent_name);
        } else {
            setFormData({
                first_name: "", last_name: "", phone: "", email: "", is_minor: false,
                date_of_birth: "", gender: "Non spécifié", blood_type: "Inconnu",
                first_parent_name: "", first_parent_relation: "", first_parent_phone: "", first_parent_email: "",
                second_parent_name: "", second_parent_relation: "", second_parent_phone: "", second_parent_email: "",
                payment_status: "En attente"
            });
            setShowSecondParent(false);
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
            <DialogContent className="w-[60vw] max-w-none p-0 bg-white border-none shadow-[0_20px_80px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden">
                <div className="max-h-[92vh] overflow-y-auto custom-scrollbar">
                    {/* Header: Éclatant & Espacé */}
                    <div className="px-14 pt-14 pb-8 flex items-start justify-between border-b border-slate-50">
                        <div className="space-y-1.5">
                            <DialogTitle className="text-[34px] font-medium tracking-tight text-[#0F172A]">
                                {isEdit ? "Modifier le profil" : "Ajouter un client"}
                            </DialogTitle>
                            <p className="text-[17px] text-slate-400 font-normal">
                                {isEdit ? `Synchronisation des données pour ${formData.first_name} ${formData.last_name}` : "Formulaire complet d'enregistrement des nouveaux clients."}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="px-14 py-12 space-y-14">
                        {/* Section: INFORMATIONS PERSONNELLES - 3 COLONNES */}
                        <div className="space-y-10">
                            <h3 className="text-[14px] font-medium uppercase tracking-[0.3em] text-slate-300">Matrice de données personnelles</h3>

                            <div className="grid grid-cols-3 gap-x-12 gap-y-10">
                                <FormInput label="Prénom" asterisk>
                                    <Input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Prénom" required />
                                </FormInput>
                                <FormInput label="Nom" asterisk>
                                    <Input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Nom de famille" required />
                                </FormInput>
                                <FormInput label="Âge" asterisk>
                                    <Input name="age" type="number" value={formData.age || ""} onChange={handleChange} placeholder="ex: 12" required />
                                </FormInput>
                                <FormInput label="Date de naissance">
                                    <Input name="date_of_birth" type="date" value={formData.date_of_birth || ""} onChange={handleChange} />
                                </FormInput>
                                <FormInput label="Genre">
                                    <Select name="gender" value={formData.gender || "Non spécifié"} onChange={handleChange}>
                                        <option value="Non spécifié">Sélectionner</option>
                                        <option value="Féminin">Féminin</option>
                                        <option value="Masculin">Masculin</option>
                                    </Select>
                                </FormInput>
                                <FormInput label="Programme" asterisk>
                                    <Select name="program" value={formData.program || ""} onChange={handleChange} required>
                                        <option value="">Choisir un programme</option>
                                        <option value="Natation">Natation</option>
                                        <option value="Mathématiques">Mathématiques</option>
                                        <option value="Yoga">Yoga</option>
                                        <option value="Karaté">Karaté</option>
                                    </Select>
                                </FormInput>

                                <FormInput label="Statut de Paiement" asterisk>
                                    <Select name="payment_status" value={formData.payment_status || "En attente"} onChange={handleChange}>
                                        <option value="Payé">Payé</option>
                                        <option value="En attente">En attente</option>
                                        <option value="Retard">Retard</option>
                                    </Select>
                                </FormInput>
                            </div>
                        </div>

                        {/* Section: CONTACT */}
                        <div className="space-y-10">
                            <h3 className="text-[14px] font-medium uppercase tracking-[0.3em] text-slate-300">Contact & Accessibilité</h3>
                            <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                                <FormInput label="Email Principal" >
                                    <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@exemple.com" />
                                </FormInput>
                                <FormInput label="Téléphone Mobile">
                                    <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+XX X XX XX XX" />
                                </FormInput>
                            </div>
                        </div>

                        {/* Section: PARENT / TUTEUR */}
                        <div className="space-y-10">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-50">
                                <h3 className="text-[14px] font-medium uppercase tracking-[0.3em] text-slate-300">Protocole de Tutelle</h3>
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, is_minor: !prev.is_minor }))}
                                    className={`text-[13px] font-medium px-8 py-3 rounded-full border transition-all ${formData.is_minor ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'bg-slate-50 text-slate-400 border-slate-200'}`}
                                >
                                    {formData.is_minor ? "MINEUR ACTIVÉ" : "ACTIVER MINEUR"}
                                </button>
                            </div>

                            {formData.is_minor && (
                                <div className="space-y-12 pt-4 animate-in fade-in slide-in-from-bottom-2">
                                    {/* Premier Parent */}
                                    <div className="grid grid-cols-3 gap-x-12 gap-y-10">
                                        <FormInput label="1er Parent" asterisk>
                                            <Input name="first_parent_name" value={formData.first_parent_name || ""} onChange={handleChange} placeholder="Nom du tuteur légal" required />
                                        </FormInput>
                                        <FormInput label="Relation">
                                            <Select name="first_parent_relation" value={formData.first_parent_relation || ""} onChange={handleChange}>
                                                <option value="">Sélectionner</option>
                                                <option value="Mère">Mère</option>
                                                <option value="Père">Père</option>
                                                <option value="Autre">Autre</option>
                                            </Select>
                                        </FormInput>
                                        <FormInput label="Téléphone" asterisk>
                                            <Input name="first_parent_phone" value={formData.first_parent_phone || ""} onChange={handleChange} placeholder="+XX X XX XX XX" required />
                                        </FormInput>
                                    </div>

                                    {/* Deuxième Parent */}
                                    <div className="grid grid-cols-3 gap-x-12 gap-y-10">
                                        <FormInput label="2ème Parent">
                                            <Input name="second_parent_name" value={formData.second_parent_name || ""} onChange={handleChange} placeholder="Nom du tuteur secondaire" />
                                        </FormInput>
                                        <FormInput label="Relation">
                                            <Select name="second_parent_relation" value={formData.second_parent_relation || ""} onChange={handleChange}>
                                                <option value="">Sélectionner</option>
                                                <option value="Mère">Mère</option>
                                                <option value="Père">Père</option>
                                                <option value="Autre">Autre</option>
                                            </Select>
                                        </FormInput>
                                        <FormInput label="Téléphone">
                                            <Input name="second_parent_phone" value={formData.second_parent_phone || ""} onChange={handleChange} placeholder="+XX X XX XX XX" />
                                        </FormInput>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer: Actions Équilibrées */}
                        <div className="flex items-center justify-end gap-10 pt-10 border-t border-slate-50">
                            <button
                                type="button"
                                onClick={onClose}
                                className="text-[17px] font-medium text-slate-300 hover:text-slate-500 transition-colors"
                            >
                                Annuler
                            </button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="h-10 px-10 rounded-full bg-[#0F172A] hover:bg-slate-800 text-white font-medium text-[17px] min-w-[240px] transition-all shadow-lg shadow-slate-100"
                            >
                                {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : (isEdit ? "Mettre à jour" : "Enregistrer le client")}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function FormInput({ label, children, asterisk = false }: { label: string; children: React.ReactNode; asterisk?: boolean }) {
    return (
        <div className="space-y-3.5">
            <label className="text-[16px] font-medium text-[#0F172A] ml-1 flex items-center gap-1.5 leading-none">
                {label} {asterisk && <span className="text-red-500 text-[12px]">*</span>}
            </label>
            {children}
        </div>
    );
}

function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={`w-full h-12 bg-[#F8FAFC] border-none rounded-full px-8 text-[15px] text-[#0F172A] placeholder:text-slate-300 placeholder:italic focus:outline-none focus:ring-2 focus:ring-[#0F172A]/5 transition-all outline-none ${className}`}
        />
    );
}

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <div className="relative">
            <select
                {...props}
                className="w-full h-12 bg-[#F8FAFC] border-none rounded-full px-8 text-[15px] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F172A]/5 transition-all appearance-none cursor-pointer outline-none"
            >
                {children}
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 pointer-events-none" />
        </div>
    );
}
