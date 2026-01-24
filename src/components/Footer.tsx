"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-black py-12 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-3">
        <div>
          <h3 className="mb-4 text-sm tracking-[0.4em]">ZLATARNA POPOVIĆ</h3>
          <p className="text-sm text-white/70">
            {t.footer.description}
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.3em]">{t.footer.navigation}</h4>
          <div className="space-y-2 text-sm text-white/70">
            <a href="/#collections" className="block transition hover:text-white">
              {t.nav.collections}
            </a>
            <a href="/#about" className="block transition hover:text-white">
              {t.nav.about}
            </a>
            <Link href="/gallery" className="block transition hover:text-white">
              {t.nav.gallery}
            </Link>
            <a href="/#contact" className="block transition hover:text-white">
              {t.nav.contact}
            </a>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.3em]">{t.footer.workingHours}</h4>
          <div className="space-y-1 text-sm text-white/70">
            <p>{t.footer.weekdays}</p>
            <p>{t.footer.saturday}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-6 text-center text-xs text-white/60">
        © 2026 Zlatarna Popović. {t.footer.rights}
      </div>
    </footer>
  );
}
