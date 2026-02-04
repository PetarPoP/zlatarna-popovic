import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata = {
  title: "Admin | Zlatarna Popović",
  description: "Admin panel za upravljanje sadržajem",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-6">
          <Link 
            href="/admin" 
            className="text-lg font-medium tracking-wider text-white"
          >
            ZLATARNA POPOVIĆ
            <span className="ml-2 text-xs font-normal text-zinc-500">ADMIN</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            ← Povratak na stranicu
          </Link>
        </div>
        <AdminNav />
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
