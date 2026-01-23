import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getGalleryItem, galleryItems } from "@/data/gallery";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

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
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-4">
          <Link
            href="/gallery"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Natrag na galeriju
          </Link>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="relative aspect-square overflow-hidden bg-zinc-100">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
                {item.category}
              </p>
              <h1 className="mb-6 text-3xl tracking-[0.15em] sm:text-4xl">
                {item.title}
              </h1>
              <p className="mb-8 leading-7 text-zinc-600">{item.description}</p>

              <div className="space-y-4">
                <Link
                  href="/#contact"
                  className="block w-full bg-black px-8 py-4 text-center text-xs uppercase tracking-[0.35em] text-white transition-colors hover:bg-zinc-800"
                >
                  Zatražite informacije
                </Link>
                <Link
                  href="/#contact"
                  className="block w-full border border-zinc-300 px-8 py-4 text-center text-xs uppercase tracking-[0.35em] text-zinc-900 transition-colors hover:border-zinc-500"
                >
                  Rezervirajte termin
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-between border-t border-zinc-200 pt-8">
            {prevItem ? (
              <Link
                href={`/gallery/${prevItem.id}`}
                className="group flex items-center gap-3 text-sm text-zinc-600 transition-colors hover:text-zinc-900"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span className="hidden sm:inline">{prevItem.title}</span>
                <span className="sm:hidden">Prethodni</span>
              </Link>
            ) : (
              <div />
            )}
            {nextItem ? (
              <Link
                href={`/gallery/${nextItem.id}`}
                className="group flex items-center gap-3 text-sm text-zinc-600 transition-colors hover:text-zinc-900"
              >
                <span className="hidden sm:inline">{nextItem.title}</span>
                <span className="sm:hidden">Sljedeći</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
