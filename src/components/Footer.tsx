"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black py-12 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-3">
        <div>
          <h3 className="mb-4 text-sm tracking-[0.4em]">ZLATARNA POPOVIĆ</h3>
          <p className="text-sm text-white/70">
            Izrađujemo bezvremenski nakit od 1985. Svaki komad priča priču o
            eleganciji i sofisticiranosti.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.3em]">Brzi linkovi</h4>
          <div className="space-y-2 text-sm text-white/70">
            <a href="/#collections" className="block transition hover:text-white">
              Kolekcije
            </a>
            <a href="/#about" className="block transition hover:text-white">
              O nama
            </a>
            <Link href="/gallery" className="block transition hover:text-white">
              Galerija
            </Link>
            <a href="/#contact" className="block transition hover:text-white">
              Kontakt
            </a>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.3em]">Pratite nas</h4>
          <div className="flex gap-4 text-sm text-white/70">
            <a href="#" className="transition hover:text-white">
              Instagram
            </a>
            <a href="#" className="transition hover:text-white">
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-6 text-center text-xs text-white/60">
        © 2026 Zlatarna Popović. Sva prava pridržana.
      </div>
    </footer>
  );
}
