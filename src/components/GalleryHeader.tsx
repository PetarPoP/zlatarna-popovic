"use client";

import { useLanguage } from "@/lib/language-context";

export function GalleryHeader() {
  const { t } = useLanguage();

  return (
    <div className="mb-12 text-center">
      <h1 className="mb-4 text-4xl tracking-[0.2em] sm:text-5xl">
        {t.gallery.title}
      </h1>
      <p className="mx-auto max-w-2xl text-sm text-zinc-600 sm:text-base">
        {t.gallery.pageDescription}
      </p>
    </div>
  );
}
