import { galleryItems } from "@/data/gallery";
import { GalleryGrid } from "@/components/GalleryGrid";
import { GalleryHeader } from "@/components/GalleryHeader";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Galerija | Zlatarna Popović",
  description: "Pregledajte našu kolekciju finog nakita i satova.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navigation variant="light" />

      <main className="pb-16 pt-24">
        <div className="mx-auto max-w-7xl px-4">
          <GalleryHeader />
          <GalleryGrid items={galleryItems} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
