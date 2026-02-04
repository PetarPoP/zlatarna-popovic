"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, MessageSquare, Image } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Rezervacije",
    href: "/admin/appointments",
    icon: Calendar,
  },
  {
    label: "Upiti",
    href: "/admin/inquiries",
    icon: MessageSquare,
  },
  {
    label: "Galerija",
    href: "/admin/gallery",
    icon: Image,
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 border-t border-zinc-800 px-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 border-b-2 px-4 py-3 text-sm transition-colors",
              isActive
                ? "border-white text-white"
                : "border-transparent text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
