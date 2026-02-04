"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, MessageSquare, Image, Clock, User, Mail } from "lucide-react";
import { format } from "date-fns";
import { hr } from "date-fns/locale";

type Stats = {
  appointments: {
    total: number;
    pending: number;
    today: number;
  };
  inquiries: {
    total: number;
    unread: number;
  };
  gallery: {
    total: number;
  };
};

type Appointment = {
  id: number;
  name: string;
  email: string;
  service: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  createdAt: string;
};

type Inquiry = {
  id: number;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

type DashboardData = {
  stats: Stats;
  recent: {
    appointments: Appointment[];
    inquiries: Inquiry[];
  };
};

const statusLabels: Record<string, string> = {
  pending: "Na čekanju",
  confirmed: "Potvrđeno",
  completed: "Završeno",
  cancelled: "Otkazano",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  confirmed: "bg-blue-500/20 text-blue-400",
  completed: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
};

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        const result = await response.json();
        if (result.success) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center text-zinc-400">
        Greška pri učitavanju podataka
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-medium tracking-wide">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Danas"
          value={data.stats.appointments.today}
          subtitle="rezervacija"
          icon={Clock}
          href="/admin/appointments"
        />
        <StatCard
          title="Na čekanju"
          value={data.stats.appointments.pending}
          subtitle="rezervacija"
          icon={Calendar}
          href="/admin/appointments?status=pending"
          highlight={data.stats.appointments.pending > 0}
        />
        <StatCard
          title="Nepročitano"
          value={data.stats.inquiries.unread}
          subtitle="upita"
          icon={MessageSquare}
          href="/admin/inquiries?unread=true"
          highlight={data.stats.inquiries.unread > 0}
        />
        <StatCard
          title="Galerija"
          value={data.stats.gallery.total}
          subtitle="stavki"
          icon={Image}
          href="/admin/gallery"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Appointments */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center justify-between border-b border-zinc-800 p-4">
            <h2 className="font-medium">Nedavne rezervacije</h2>
            <Link
              href="/admin/appointments"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Prikaži sve →
            </Link>
          </div>
          <div className="divide-y divide-zinc-800">
            {data.recent.appointments.length === 0 ? (
              <div className="p-4 text-center text-sm text-zinc-500">
                Nema rezervacija
              </div>
            ) : (
              data.recent.appointments.map((apt) => (
                <div key={apt.id} className="flex items-center gap-4 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
                    <User className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">{apt.name}</p>
                    <p className="text-sm text-zinc-400">
                      {apt.service} • {format(new Date(apt.appointmentDate), "d. MMM", { locale: hr })}
                    </p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs ${statusColors[apt.status]}`}>
                    {statusLabels[apt.status]}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center justify-between border-b border-zinc-800 p-4">
            <h2 className="font-medium">Nedavni upiti</h2>
            <Link
              href="/admin/inquiries"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Prikaži sve →
            </Link>
          </div>
          <div className="divide-y divide-zinc-800">
            {data.recent.inquiries.length === 0 ? (
              <div className="p-4 text-center text-sm text-zinc-500">
                Nema upita
              </div>
            ) : (
              data.recent.inquiries.map((inq) => (
                <div key={inq.id} className="flex items-center gap-4 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
                    <Mail className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">
                      {!inq.isRead && (
                        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-500" />
                      )}
                      {inq.name}
                    </p>
                    <p className="truncate text-sm text-zinc-400">{inq.message}</p>
                  </div>
                  <span className="text-xs text-zinc-500">
                    {format(new Date(inq.createdAt), "d. MMM", { locale: hr })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ElementType;
  href: string;
  highlight?: boolean;
};

function StatCard({ title, value, subtitle, icon: Icon, href, highlight }: StatCardProps) {
  return (
    <Link
      href={href}
      className={`group rounded-lg border p-4 transition-colors ${
        highlight
          ? "border-blue-500/50 bg-blue-500/10 hover:border-blue-500"
          : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-400">{title}</span>
        <Icon className={`h-5 w-5 ${highlight ? "text-blue-400" : "text-zinc-500"}`} />
      </div>
      <div className="mt-2">
        <span className="text-3xl font-semibold">{value}</span>
        <span className="ml-2 text-sm text-zinc-500">{subtitle}</span>
      </div>
    </Link>
  );
}
