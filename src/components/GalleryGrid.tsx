"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import type { GalleryItem } from "@/data/gallery";
import { getGalleryCategories } from "@/data/gallery";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { LazyImage } from "@/components/LazyImage";

type GalleryGridProps = {
  items: GalleryItem[];
};

export function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const categories = getGalleryCategories();
  const { t } = useLanguage();

  // Helper to translate category names
  const translateCategory = (category: string): string => {
    return (t.categories as Record<string, string>)[category] || category;
  };

  const filteredItems = useMemo(() => {
    let result = items;

    // Filter by category
    if (selectedCategory) {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [items, selectedCategory, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery("");
  };

  const hasActiveFilters = selectedCategory !== null || searchQuery.trim() !== "";

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Sidebar Filters */}
      <aside className="w-full shrink-0 lg:w-64">
        <div className="sticky top-28 space-y-6">
          {/* Search */}
          <div>
            <label
              htmlFor="gallery-search"
              className="mb-3 block text-xs uppercase tracking-[0.3em] text-zinc-500"
            >
              {t.gallery.search}
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                id="gallery-search"
                type="text"
                placeholder={t.gallery.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-zinc-200 bg-white py-3 pl-10 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none"
              />
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 hover:bg-transparent"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
              {t.gallery.filterBy}
            </p>
            <div className="space-y-1">
              <Button
                variant="ghost"
                onClick={() => setSelectedCategory(null)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  selectedCategory === null
                    ? "bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white"
                    : "text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                <span>{t.gallery.all}</span>
                <span className="text-xs opacity-60">{items.length}</span>
              </Button>
              {categories.map((category) => {
                const count = items.filter((item) => item.category === category).length;
                return (
                  <Button
                    key={category}
                    variant="ghost"
                    onClick={() => setSelectedCategory(category)}
                    className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      selectedCategory === category
                        ? "bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white"
                        : "text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    <span>{translateCategory(category)}</span>
                    <span className="text-xs opacity-60">{count}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full cursor-pointer rounded-lg border-zinc-200 px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-600 transition-colors hover:border-zinc-900 hover:text-zinc-900"
            >
              <X className="h-3 w-3" />
              {t.gallery.clearFilters}
            </Button>
          )}
        </div>
      </aside>

      {/* Gallery Grid */}
      <div className="flex-1">
        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            {filteredItems.length === 0
              ? t.gallery.noResults
              : filteredItems.length === 1
                ? `1 ${t.gallery.product}`
                : `${filteredItems.length} ${t.gallery.products}`}
          </p>
          {hasActiveFilters && (
            <p className="text-xs text-zinc-400">
              {selectedCategory && <span>{t.gallery.category}: {translateCategory(selectedCategory)}</span>}
              {selectedCategory && searchQuery && <span> • </span>}
              {searchQuery && <span>{t.gallery.searchLabel}: &quot;{searchQuery}&quot;</span>}
            </p>
          )}
        </div>

        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
              <Search className="h-8 w-8 text-zinc-400" />
            </div>
            <h3 className="mb-2 text-lg tracking-wide">{t.gallery.noResults}</h3>
            <p className="mb-4 text-sm text-zinc-500">
              {t.gallery.noResultsHint}
            </p>
            <Button
              onClick={clearFilters}
              className="cursor-pointer rounded-lg bg-zinc-900 px-6 py-2 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-zinc-800"
            >
              {t.gallery.clearFilters}
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                href={`/gallery/${item.id}`}
                className="group relative"
              >
                <article className="overflow-hidden">
                  <div className="relative aspect-square overflow-hidden bg-zinc-100">
                    <LazyImage
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      rootMargin="300px"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="bg-white/90 px-6 py-3 text-xs uppercase tracking-[0.3em] text-zinc-900">
                        {t.gallery.view}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="mb-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
                      {translateCategory(item.category)}
                    </p>
                    <h3 className="text-lg tracking-wide">{item.title}</h3>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
