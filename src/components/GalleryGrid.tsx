"use client";

import Link from "next/link";
import { useState } from "react";
import type { GalleryItem } from "@/data/gallery";
import { getGalleryCategories } from "@/data/gallery";

type GalleryGridProps = {
  items: GalleryItem[];
};

export function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = getGalleryCategories();

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
            selectedCategory === null
              ? "bg-black text-white"
              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
          }`}
        >
          Sve
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
              selectedCategory === category
                ? "bg-black text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Link
            key={item.id}
            href={`/gallery/${item.id}`}
            className="group relative"
          >
            <article className="overflow-hidden">
              <div className="relative aspect-square overflow-hidden bg-zinc-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="bg-white/90 px-6 py-3 text-xs uppercase tracking-[0.3em] text-zinc-900">
                    Pogledaj
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="mb-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
                  {item.category}
                </p>
                <h3 className="text-lg tracking-wide">{item.title}</h3>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}
