"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { hr } from "date-fns/locale";
import { toast } from "sonner";
import { Calendar, Phone, Mail, Clock, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Appointment = {
  id: number;
  name: string;
  email: string;
  phone: string;
  appointmentDate: string;
  appointmentTime: string;
  service: string;
  notes: string | null;
  status: string;
  createdAt: string;
};

const statusLabels: Record<string, string> = {
  pending: "Na čekanju",
  confirmed: "Potvrđeno",
  completed: "Završeno",
  cancelled: "Otkazano",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  confirmed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

const serviceLabels: Record<string, string> = {
  consultation: "Konzultacija",
  engraving: "Graviranje",
  repair: "Popravak",
  custom: "Izrada po narudžbi",
  appraisal: "Procjena vrijednosti",
};

function AppointmentsPageContent() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("status") || "all";
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fetchAppointments = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") {
        params.set("status", statusFilter);
      }
      
      const response = await fetch(`/api/admin/appointments?${params}`);
      const result = await response.json();
      if (result.success) {
        setAppointments(result.appointments);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Greška pri učitavanju rezervacija");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const response = await fetch("/api/admin/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const result = await response.json();
      if (result.success) {
        setAppointments((prev) =>
          prev.map((apt) =>
            apt.id === id ? { ...apt, status: newStatus } : apt
          )
        );
        toast.success("Status ažuriran");
        await fetchAppointments();
      } else {
        toast.error("Greška pri ažuriranju statusa");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Greška pri ažuriranju statusa");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Jeste li sigurni da želite obrisati ovu rezervaciju?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/appointments?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (result.success) {
        setAppointments((prev) => prev.filter((apt) => apt.id !== id));
        toast.success("Rezervacija obrisana");
      } else {
        toast.error("Greška pri brisanju rezervacije");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      toast.error("Greška pri brisanju rezervacije");
    }
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return format(date, "HH:mm");
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-medium tracking-wide">Rezervacije</h1>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] border-zinc-700 bg-zinc-900 text-zinc-100">
            <SelectValue placeholder="Filter po statusu" />
          </SelectTrigger>
          <SelectContent className="border-zinc-700 bg-zinc-900 text-zinc-100">
            <SelectItem value="all">Svi statusi</SelectItem>
            <SelectItem value="pending">Na čekanju</SelectItem>
            <SelectItem value="confirmed">Potvrđeno</SelectItem>
            <SelectItem value="completed">Završeno</SelectItem>
            <SelectItem value="cancelled">Otkazano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {appointments.length === 0 ? (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <Calendar className="mx-auto h-12 w-12 text-zinc-600" />
          <p className="mt-4 text-zinc-400">Nema rezervacija</p>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden"
            >
              <div
                className="flex cursor-pointer items-center gap-4 p-4"
                onClick={() => setExpandedId(expandedId === apt.id ? null : apt.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{apt.name}</h3>
                    <span className={`rounded-full border px-2 py-0.5 text-xs ${statusColors[apt.status]}`}>
                      {statusLabels[apt.status]}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {format(new Date(apt.appointmentDate), "d. MMMM yyyy.", { locale: hr })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {formatTime(apt.appointmentTime)}
                    </span>
                    <span>{serviceLabels[apt.service] || apt.service}</span>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-zinc-500 transition-transform ${
                    expandedId === apt.id ? "rotate-180" : ""
                  }`}
                />
              </div>

              {expandedId === apt.id && (
                <div className="border-t border-zinc-800 bg-zinc-900/50 p-5">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Kontakt
                      </p>
                      <div className="flex items-center gap-3 rounded-lg bg-zinc-800/50 px-3 py-2">
                        <Mail className="h-4 w-4 shrink-0 text-zinc-500" />
                        <a
                          href={`mailto:${apt.email}`}
                          className="text-sm text-zinc-200 hover:text-white transition-colors truncate"
                        >
                          {apt.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg bg-zinc-800/50 px-3 py-2">
                        <Phone className="h-4 w-4 shrink-0 text-zinc-500" />
                        <a
                          href={`tel:${apt.phone}`}
                          className="text-sm text-zinc-200 hover:text-white transition-colors"
                        >
                          {apt.phone}
                        </a>
                      </div>
                      {apt.notes && (
                        <div className="rounded-lg border border-zinc-700/50 bg-zinc-800/30 p-3">
                          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
                            Napomena
                          </p>
                          <p className="text-sm leading-relaxed text-zinc-300">{apt.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-4 sm:items-end">
                      <div className="w-full sm:w-auto space-y-2">
                        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                          Status i akcije
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <Select
                            value={apt.status}
                            onValueChange={(value) => handleStatusChange(apt.id, value)}
                          >
                            <SelectTrigger className="min-w-[160px] border-zinc-600 bg-zinc-800 text-zinc-100 hover:bg-zinc-700/80 hover:cursor-pointer">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="border-zinc-700 bg-zinc-900 text-zinc-100 hover:cursor-pointer">
                              <SelectItem value="pending">Na čekanju</SelectItem>
                              <SelectItem value="confirmed">Potvrđeno</SelectItem>
                              <SelectItem value="completed">Završeno</SelectItem>
                              <SelectItem value="cancelled">Otkazano</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(apt.id, "confirmed")}
                            className="bg-emerald-800 text-white hover:bg-emerald-600 border-0 shadow-sm hover:cursor-pointer"
                          >
                            Potvrdi termin
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(apt.id, "cancelled")}
                            className="bg-red-800 text-white hover:bg-red-600 border-0 shadow-sm hover:text-white hover:cursor-pointer"
                          >
                            Odbij termin
                          </Button>
                        </div>
                        <div className="pt-2 border-t border-zinc-800">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(apt.id)}
                            className="text-zinc-400 hover:text-red-400 hover:bg-red-500/10 hover:cursor-pointer"
                          >
                            <Trash2 className="mr-2 h-3.5 w-3.5" />
                            Obriši rezervaciju
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-zinc-500">
                    Kreirano {format(new Date(apt.createdAt), "d. MMMM yyyy. u HH:mm", { locale: hr })}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AppointmentsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </div>
      }
    >
      <AppointmentsPageContent />
    </Suspense>
  );
}
