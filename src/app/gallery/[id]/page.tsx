import { notFound } from "next/navigation";
import { getGalleryItem, galleryItems } from "@/data/gallery";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GalleryItemContent } from "./GalleryItemContent";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return galleryItems.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const item = getGalleryItem(id);

  if (!item) {
    return {
      title: "Nije pronađeno | Zlatarna Popović",
    };
  }

  return {
    title: `${item.title} | Zlatarna Popović`,
    description: item.description,
  };
}

export default async function GalleryItemPage({ params }: PageProps) {
  const { id } = await params;
  const item = getGalleryItem(id);

  if (!item) {
    notFound();
  }

  const currentIndex = galleryItems.findIndex((i) => i.id === id);
  const prevItem = currentIndex > 0 ? galleryItems[currentIndex - 1] : null;
  const nextItem =
    currentIndex < galleryItems.length - 1
      ? galleryItems[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navigation variant="light" />

      <main className="pt-24 pb-16">
        <GalleryItemContent 
          item={item} 
          prevItem={prevItem} 
          nextItem={nextItem} 
        />
      </main>

      <Footer />
    </div>
  );
}
