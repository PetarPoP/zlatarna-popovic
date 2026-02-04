"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { GalleryItem } from "@/data/gallery";
import { useLanguage } from "@/lib/language-context";
import { LazyImage } from "@/components/LazyImage";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export function Collections() {
  const { t } = useLanguage();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/gallery");
        const result = await response.json();
        if (result.success) {
          const availableOnly = result.items.filter(
            (item: GalleryItem) => item.isAvailable
          );
          setItems(availableOnly.slice(0, 8));
        }
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);
  
  return (
    <section id="collections" className="snap-start bg-zinc-50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl tracking-[0.2em] sm:text-4xl md:text-5xl">
            {t.gallery.title}
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-zinc-600 sm:text-base">
            {t.gallery.description}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent" />
          </div>
        ) : items.length === 0 ? (
          <div className="py-12 text-center text-zinc-500">
            {t.gallery.noResults || "Nema stavki u galeriji"}
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {items.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <Link
                    href={`/gallery/${item.id}`}
                    className={cn(
                      "group block",
                      !item.isAvailable && "cursor-pointer opacity-70"
                    )}
                  >
                    <div className="relative mb-3 h-72 overflow-hidden bg-zinc-100">
                      <LazyImage
                        src={item.image}
                        alt={item.title}
                        className={cn(
                          "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105",
                          !item.isAvailable && "grayscale"
                        )}
                        rootMargin="100px"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
                      {!item.isAvailable && (
                        <div className="absolute inset-x-0 bottom-0 bg-black/60 py-2 text-center text-xs uppercase tracking-[0.25em] text-zinc-100">
                          Trenutno nedostupno
                        </div>
                      )}
                    </div>
                    <h3 className="text-center text-sm tracking-wide transition-colors group-hover:text-zinc-600">
                      {item.title}
                    </h3>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 border-zinc-300 bg-white hover:bg-zinc-50 sm:-left-12" />
            <CarouselNext className="-right-4 border-zinc-300 bg-white hover:bg-zinc-50 sm:-right-12" />
          </Carousel>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/gallery"
            className="inline-block rounded-lg bg-black px-8 py-3 text-xs uppercase tracking-[0.35em] text-white transition-colors hover:bg-zinc-800"
          >
            {t.nav.gallery}
          </Link>
        </div>
      </div>
    </section>
  );
}
