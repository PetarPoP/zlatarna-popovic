import { prisma } from "@/lib/prisma";

export type GalleryItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  isAvailable: boolean;
};

// Fetch all gallery items – dostupni prvo, nedostupni na dnu
export async function getGalleryItems(): Promise<GalleryItem[]> {
  const items = await prisma.galleryItem.findMany({
    orderBy: [
      { isAvailable: "desc" },
      { sortOrder: "asc" },
      { createdAt: "desc" },
    ],
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      image: true,
      isAvailable: true,
    },
  });
  return items;
}

// Fetch single gallery item by ID
export async function getGalleryItem(id: string | number): Promise<GalleryItem | null> {
  const item = await prisma.galleryItem.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      image: true,
      isAvailable: true,
    },
  });
  return item;
}

// Get all unique categories
export async function getGalleryCategories(): Promise<string[]> {
  const items = await prisma.galleryItem.findMany({
    select: { category: true },
    distinct: ["category"],
  });
  return items.map((item) => item.category);
}

// Get adjacent items for navigation (isti redoslijed kao getGalleryItems)
export async function getAdjacentItems(currentId: number): Promise<{
  prev: GalleryItem | null;
  next: GalleryItem | null;
}> {
  const items = await prisma.galleryItem.findMany({
    orderBy: [
      { isAvailable: "desc" },
      { sortOrder: "asc" },
      { createdAt: "desc" },
    ],
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      image: true,
      isAvailable: true,
    },
  });

  const currentIndex = items.findIndex((item) => item.id === currentId);
  
  return {
    prev: currentIndex > 0 ? items[currentIndex - 1] : null,
    next: currentIndex < items.length - 1 ? items[currentIndex + 1] : null,
  };
}
