"use client";

import Link from "next/link";
import { galleryItems } from "@/data/gallery";
import { useLanguage } from "@/lib/language-context";
import { LazyImage } from "@/components/LazyImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export function Collections() {
  const { t } = useLanguage();
  
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

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {galleryItems.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <Link href={`/gallery/${item.id}`} className="group block">
                  <div className="relative mb-3 h-72 overflow-hidden bg-zinc-100">
                    <LazyImage
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      rootMargin="100px"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
                  </div>
                  <h3 className="text-center text-sm tracking-wide transition-colors group-hover:text-zinc-600">
                    {item.title}
                  </h3>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-1/2 border-zinc-300 bg-white hover:bg-zinc-50 sm:-left-4" />
          <CarouselNext className="right-0 translate-x-1/2 border-zinc-300 bg-white hover:bg-zinc-50 sm:-right-4" />
        </Carousel>

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
