import { notFound } from "next/navigation";
import { getGalleryItem, getGalleryItems, getAdjacentItems } from "@/data/gallery";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GalleryItemContent } from "./GalleryItemContent";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const items = await getGalleryItems();
  return items.map((item) => ({
    id: String(item.id),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const item = await getGalleryItem(id);

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
  const item = await getGalleryItem(id);

  if (!item) {
    notFound();
  }

  const { prev: prevItem, next: nextItem } = await getAdjacentItems(item.id);

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
