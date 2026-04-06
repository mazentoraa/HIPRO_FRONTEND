
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
  { month: "Jan", revenue: 12400 },
  { month: "Feb", revenue: 15200 },
  { month: "Mar", revenue: 18100 },
  { month: "Apr", revenue: 16800 },
  { month: "May", revenue: 21300 },
  { month: "Jun", revenue: 24500 },
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
  { name: "5-10", value: 35 },
  { name: "11-15", value: 28 },
  { name: "16-20", value: 18 },
  { name: "Adults", value: 19 },
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
    text: "Sarah Johnson registered",
    time: "2 min ago",
    type: "info" as const,
  },
  {
    icon: CreditCard,
    text: "Payment received — $450",
    time: "15 min ago",
    type: "success" as const,
  },
  {
    icon: UserCheck,
    text: "Trainer Mark assigned to Yoga",
    time: "1 hour ago",
    type: "neutral" as const,
  },
  {
    icon: AlertCircle,
    text: "Missed attendance — Alex M.",
    time: "2 hours ago",
    type: "warning" as const,
  },
  {
    icon: CalendarDays,
    text: "New session: Piano Advanced",
    time: "3 hours ago",
    type: "info" as const,
  },
];

const upcomingSessions = [
  {
    name: "Swimming — Beginners",
    trainer: "Coach David",
    time: "09:00 AM",
    capacity: "8/12",
  },
  {
    name: "Mathematics — Level 3",
    trainer: "Ms. Emily",
    time: "10:30 AM",
    capacity: "15/15",
  },
  {
    name: "Yoga — Adults",
    trainer: "Trainer Lina",
    time: "02:00 PM",
    capacity: "6/10",
  },
  {
    name: "Art Workshop",
    trainer: "Mr. Carlos",
    time: "04:00 PM",
    capacity: "10/14",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Welcome back — here&apos;s your center overview
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 rounded-xl">
            <CalendarPlus className="h-4 w-4" />
            Schedule
          </Button>

          <Button className="gap-2 rounded-xl">
            <Plus className="h-4 w-4" />
            Add Client
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <StatsCard
          title="Total Clients"
          value="1,284"
          change="+12% from last month"
          changeType="positive"
          icon={Users}
          accent="primary"
        />

        <StatsCard
          title="Active Trainers"
          value="32"
          change="+3 this quarter"
          changeType="positive"
          icon={GraduationCap}
          accent="gold"
        />

        <StatsCard
          title="Sessions This Week"
          value="86"
          change="4 cancelled"
          changeType="negative"
          icon={CalendarDays}
          accent="success"
        />

        <StatsCard
          title="Revenue This Month"
          value="$24,500"
          change="+18% vs last month"
          changeType="positive"
          icon={DollarSign}
          accent="gold"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="premium-shadow rounded-2xl border border-border/50 bg-card p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Revenue Overview</h3>
              <p className="text-sm text-muted-foreground">
                Monthly revenue trend
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
          <h3 className="mb-1 text-lg font-semibold">Clients by Age</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Distribution overview
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
          <h3 className="mb-1 text-lg font-semibold">Attendance Trend</h3>
          <p className="mb-4 text-sm text-muted-foreground">Weekly average</p>

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
                stroke="hsl(142,76%,36%)"
                strokeWidth={2.5}
                dot={{ fill: "hsl(142,76%,36%)", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="premium-shadow rounded-2xl border border-border/50 bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold">Upcoming Sessions</h3>

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
          <h3 className="mb-4 text-lg font-semibold">Recent Activity</h3>

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
