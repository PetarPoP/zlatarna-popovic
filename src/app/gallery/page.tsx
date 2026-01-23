import Link from "next/link";
import { galleryItems, getGalleryCategories } from "@/data/gallery";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Galerija | Zlatarna Popović",
  description: "Pregledajte našu kolekciju finog nakita i satova.",
};

export default function GalleryPage() {
  const categories = getGalleryCategories();

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navigation variant="light" />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl tracking-[0.2em] sm:text-5xl">
              Galerija
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-zinc-600 sm:text-base">
              Istražite našu kolekciju ručno izrađenog nakita i luksuznih satova.
              Svaki komad priča svoju jedinstvenu priču.
            </p>
          </div>

          <GalleryGrid items={galleryItems} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
