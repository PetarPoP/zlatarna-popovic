"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { hr } from "date-fns/locale";
import { toast } from "sonner";
import { MessageSquare, Mail, Phone, Trash2, Eye, EyeOff, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Inquiry = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
};

function InquiriesPageContent() {
  const searchParams = useSearchParams();
  const showUnreadOnly = searchParams.get("unread") === "true";
  
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterUnread, setFilterUnread] = useState(showUnreadOnly);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fetchInquiries = async () => {
    try {
      const params = new URLSearchParams();
      if (filterUnread) {
        params.set("unread", "true");
      }
      
      const response = await fetch(`/api/admin/inquiries?${params}`);
      const result = await response.json();
      if (result.success) {
        setInquiries(result.inquiries);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      toast.error("Greška pri učitavanju upita");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [filterUnread]);

  const handleToggleRead = async (id: number, currentIsRead: boolean) => {
    try {
      const response = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead: !currentIsRead }),
      });

      const result = await response.json();
      if (result.success) {
        if (filterUnread && !currentIsRead) {
          // If filtering unread and marking as read, remove from list
          setInquiries((prev) => prev.filter((inq) => inq.id !== id));
        } else {
          setInquiries((prev) =>
            prev.map((inq) =>
              inq.id === id ? { ...inq, isRead: !currentIsRead } : inq
            )
          );
        }
        toast.success(currentIsRead ? "Označeno kao nepročitano" : "Označeno kao pročitano");
      } else {
        toast.error("Greška pri ažuriranju");
      }
    } catch (error) {
      console.error("Error toggling read status:", error);
      toast.error("Greška pri ažuriranju");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Jeste li sigurni da želite obrisati ovaj upit?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (result.success) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
        toast.success("Upit obrisan");
      } else {
        toast.error("Greška pri brisanju upita");
      }
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      toast.error("Greška pri brisanju upita");
    }
  };

  const markAsReadOnServer = async (id: number) => {
    try {
      await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead: true }),
      });
    } catch (e) {
      console.error("Mark as read failed:", e);
    }
  };

  const handleExpand = async (id: number, isRead: boolean) => {
    const isClosing = expandedId === id;

    if (isClosing) {
      setExpandedId(null);
      // Tek kad zatvoriš poruku, ažuriraj prikaz (plavo nestane / nestane s liste)
      setInquiries((prev) => {
        const updated = prev.map((inq) =>
          inq.id === id ? { ...inq, isRead: true } : inq
        );
        if (filterUnread) return updated.filter((inq) => inq.id !== id);
        return updated;
      });
      return;
    }

    setExpandedId(id);
    if (!isRead) {
      markAsReadOnServer(id);
    }
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
        <h1 className="text-2xl font-medium tracking-wide">Upiti</h1>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setFilterUnread(!filterUnread)}
          className={cn(
            "border-zinc-700",
            filterUnread ? "bg-blue-500/20 text-blue-400" : "bg-zinc-900"
          )}
        >
          {filterUnread ? (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Prikaži sve
            </>
          ) : (
            <>
              <EyeOff className="mr-2 h-4 w-4" />
              Samo nepročitani
            </>
          )}
        </Button>
      </div>

      {inquiries.length === 0 ? (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <MessageSquare className="mx-auto h-12 w-12 text-zinc-600" />
          <p className="mt-4 text-zinc-400">
            {filterUnread ? "Nema nepročitanih upita" : "Nema upita"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className={cn(
                "rounded-lg border bg-zinc-900/50 overflow-hidden transition-colors",
                inq.isRead ? "border-zinc-800" : "border-blue-500/30 bg-blue-500/5"
              )}
            >
              <div
                className="flex cursor-pointer items-center gap-4 p-4"
                onClick={() => handleExpand(inq.id, inq.isRead)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    {!inq.isRead && (
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                    )}
                    <h3 className="font-medium">{inq.name}</h3>
                  </div>
                  <p className="mt-1 truncate text-sm text-zinc-400">
                    {inq.message}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-500 whitespace-nowrap">
                    {format(new Date(inq.createdAt), "d. MMM yyyy.", { locale: hr })}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-zinc-500 transition-transform ${
                      expandedId === inq.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {expandedId === inq.id && (
                <div className="border-t border-zinc-800 bg-zinc-900/30 p-4">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <a
                        href={`mailto:${inq.email}`}
                        className="flex items-center gap-2 text-zinc-300 hover:text-white"
                      >
                        <Mail className="h-4 w-4 text-zinc-500" />
                        {inq.email}
                      </a>
                      {inq.phone && (
                        <a
                          href={`tel:${inq.phone}`}
                          className="flex items-center gap-2 text-zinc-300 hover:text-white"
                        >
                          <Phone className="h-4 w-4 text-zinc-500" />
                          {inq.phone}
                        </a>
                      )}
                    </div>

                    <div className="rounded-lg bg-zinc-800/50 p-4">
                      <p className="text-sm text-zinc-500 mb-2">Poruka:</p>
                      <p className="whitespace-pre-wrap text-zinc-200">{inq.message}</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <p className="text-xs text-zinc-600">
                        Primljeno: {format(new Date(inq.createdAt), "d. MMMM yyyy. u HH:mm", { locale: hr })}
                      </p>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleRead(inq.id, inq.isRead);
                          }}
                          className="text-zinc-400 hover:text-white"
                        >
                          {inq.isRead ? (
                            <>
                              <EyeOff className="mr-2 h-4 w-4" />
                              Nepročitano
                            </>
                          ) : (
                            <>
                              <Eye className="mr-2 h-4 w-4" />
                              Pročitano
                            </>
                          )}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(inq.id);
                          }}
                          className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Obriši
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function InquiriesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </div>
      }
    >
      <InquiriesPageContent />
    </Suspense>
  );
}
