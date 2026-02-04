import { getGalleryItem } from "@/data/gallery";
import { GalleryModal } from "@/components/GalleryModal";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function GalleryModalPage({ params }: PageProps) {
  const { id } = await params;
  const item = await getGalleryItem(id);

  if (!item) {
    return null;
  }

  return <GalleryModal item={item} />;
}
