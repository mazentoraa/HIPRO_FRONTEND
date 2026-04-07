
"use client";

import {
  Users,
  GraduationCap,
  CalendarDays,
  DollarSign,
  Plus,
  UserPlus,
  CalendarPlus,
  CreditCard,
  TrendingUp,
  Clock,
  UserCheck,
  AlertCircle,
} from "lucide-react";

import { StatsCard } from "@/components/shared/StatsCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const revenueData = [
  { month: "Janv", revenue: 12400 },
  { month: "Févr", revenue: 15200 },
  { month: "Mars", revenue: 18100 },
  { month: "Avril", revenue: 16800 },
  { month: "Mai", revenue: 21300 },
  { month: "Juin", revenue: 24500 },
];

const attendanceData = [
  { week: "W1", rate: 92 },
  { week: "W2", rate: 88 },
  { week: "W3", rate: 95 },
  { week: "W4", rate: 91 },
  { week: "W5", rate: 87 },
  { week: "W6", rate: 93 },
];

const ageData = [
  { name: "5-10 ans", value: 35 },
  { name: "11-15 ans", value: 28 },
  { name: "16-20 ans", value: 18 },
  { name: "Adultes", value: 19 },
];

const PIE_COLORS = [
  "hsl(224,76%,48%)",
  "hsl(43,80%,46%)",
  "hsl(142,76%,36%)",
  "hsl(199,89%,48%)",
];

const recentActivity = [
  {
    icon: UserPlus,
    text: "Sarah Johnson s'est inscrite",
    time: "il y a 2 min",
    type: "info" as const,
  },
  {
    icon: CreditCard,
    text: "Paiement reçu — 450 DT",
    time: "il y a 15 min",
    type: "success" as const,
  },
  {
    icon: UserCheck,
    text: "Entraîneur Mark assigné au Yoga",
    time: "il y a 1 heure",
    type: "neutral" as const,
  },
  {
    icon: AlertCircle,
    text: "Absence signalée — Alex M.",
    time: "il y a 2 heures",
    type: "warning" as const,
  },
  {
    icon: CalendarDays,
    text: "Nouvelle session : Piano Avancé",
    time: "il y a 3 heures",
    type: "info" as const,
  },
];

const upcomingSessions = [
  {
    name: "Natation — Débutants",
    trainer: "Coach David",
    time: "09:00",
    capacity: "8/12",
  },
  {
    name: "Mathématiques — Niveau 3",
    trainer: "Mme Emily",
    time: "10:30",
    capacity: "15/15",
  },
  {
    name: "Yoga — Adultes",
    trainer: "Entraîneur Lina",
    time: "14:00",
    capacity: "6/10",
  },
  {
    name: "Atelier d'Art",
    trainer: "M. Carlos",
    time: "16:00",
    capacity: "10/14",
  },
];

export default function DashboardPage() {
  return (
    <div className="animate-fade-in space-y-4 p-4 bg-[#F8FAFC] min-h-screen px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-[40px] font-semibold tracking-tight text-[#0F172A]">
            Tableau de bord
          </h1>
          <p className="text-[17px] text-[#64748B] font-light">
            Bon retour — voici l&apos;aperçu de votre centre
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 h-12 px-6 shadow-sm border-slate-200">
            <CalendarPlus className="h-4 w-4 text-slate-500" />
            Planning
          </Button>

          <Button variant="accent" className="gap-2 h-12 px-6">
            <Plus className="h-4 w-4" />
            Ajouter un client
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Clients"
          value="1,284"
          change="+12% depuis le mois dernier"
          changeType="positive"
          icon={Users}
          accent="primary"
        />

        <StatsCard
          title="Entraîneurs Actifs"
          value="32"
          change="+3 ce trimestre"
          changeType="positive"
          icon={GraduationCap}
          accent="gold"
        />

        <StatsCard
          title="Sessions cette semaine"
          value="86"
          change="4 annulées"
          changeType="negative"
          icon={CalendarDays}
          accent="success"
        />

        <StatsCard
          title="Revenu ce mois"
          value="24,500 €"
          change="+18% vs mois dernier"
          changeType="positive"
          icon={DollarSign}
          accent="gold"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="premium-shadow rounded-2xl border border-border/50 bg-card p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Aperçu des Revenus</h3>
              <p className="text-sm text-muted-foreground">
                Tendance mensuelle des revenus
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-green-600">
              <TrendingUp className="h-4 w-4" /> +18%
            </div>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueData}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                className="text-xs"
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                className="text-xs"
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                }}
              />

              <Bar
                dataKey="revenue"
                fill="hsl(224,76%,48%)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="premium-shadow rounded-2xl border border-border/50 bg-card p-6">
          <h3 className="mb-1 text-lg font-semibold">Clients par Âge</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Aperçu de la distribution
          </p>

          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={ageData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                paddingAngle={4}
              >
                {ageData.map((_, index) => (
                  <Cell key={index} fill={PIE_COLORS[index]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-2 grid grid-cols-2 gap-2">
            {ageData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center gap-2 text-xs"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: PIE_COLORS[index] }}
                />

                <span className="text-muted-foreground">{item.name}</span>
                <span className="ml-auto font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="premium-shadow rounded-2xl border border-border/50 bg-card p-6">
          <h3 className="mb-1 text-lg font-semibold">Tendance de Présence</h3>
          <p className="mb-4 text-sm text-muted-foreground">Moyenne hebdomadaire</p>

          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={attendanceData}>
              <XAxis
                dataKey="week"
                axisLine={false}
                tickLine={false}
                className="text-xs"
              />

              <YAxis
                domain={[80, 100]}
                axisLine={false}
                tickLine={false}
                className="text-xs"
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                }}
              />

              <Line
                type="monotone"
                dataKey="rate"
                stroke="hsl(224,76%,48%)"
                strokeWidth={2.5}
                dot={{ fill: "hsl(224,76%,48%)", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="premium-shadow rounded-2xl border border-border/50 bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold">Sessions à venir</h3>

          <div className="space-y-3">
            {upcomingSessions.map((session) => (
              <div
                key={session.name}
                className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3 transition-colors hover:bg-secondary"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Clock className="h-4 w-4 text-primary" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {session.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session.trainer} · {session.time}
                  </p>
                </div>

                <span className="shrink-0 text-xs text-muted-foreground">
                  {session.capacity}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="premium-shadow rounded-2xl border border-border/50 bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold">Activité Récente</h3>

          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <activity.icon className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>

                <StatusBadge
                  status={
                    activity.type === "success"
                      ? "New"
                      : activity.type === "warning"
                        ? "Alert"
                        : "Info"
                  }
                  type={activity.type}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
