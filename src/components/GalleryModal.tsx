"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { X, ExternalLink } from "lucide-react";
import type { GalleryItem } from "@/data/gallery";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type GalleryModalProps = {
  item: GalleryItem;
};

export function GalleryModal({ item }: GalleryModalProps) {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog defaultOpen onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto rounded-none border-none p-0 sm:rounded-none">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-zinc-100 md:aspect-auto md:h-full">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8">
            <DialogHeader className="mb-6 text-left">
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
                {item.category}
              </p>
              <DialogTitle className="text-2xl tracking-[0.15em] sm:text-3xl font-normal">
                {item.title}
              </DialogTitle>
            </DialogHeader>

            <DialogDescription className="mb-8 leading-7 text-zinc-600 text-base">
              {item.description}
            </DialogDescription>

            <div className="space-y-3">
              <Link
                href={`/gallery/${item.id}`}
                className="flex w-full items-center justify-center gap-2 bg-black px-6 py-3 text-xs uppercase tracking-[0.3em] text-white transition-colors hover:bg-zinc-800"
              >
                Pogledaj detalje
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
              <button
                onClick={() => router.back()}
                className="w-full border border-zinc-300 px-6 py-3 text-xs uppercase tracking-[0.3em] text-zinc-900 transition-colors hover:border-zinc-500"
              >
                Zatvori
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
