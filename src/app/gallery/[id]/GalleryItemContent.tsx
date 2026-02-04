"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageCircle, Send, Loader2, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { GalleryItem } from "@/data/gallery";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";

type GalleryItemContentProps = {
  item: GalleryItem;
  prevItem: GalleryItem | null;
  nextItem: GalleryItem | null;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormStatus = "idle" | "loading" | "success" | "error";

export function GalleryItemContent({ item, prevItem, nextItem }: GalleryItemContentProps) {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Helper to translate category names
  const translateCategory = (category: string): string => {
    return (t.categories as Record<string, string>)[category] || category;
  };

  const isFormValid = formData.name.trim() !== "" && 
                      formData.email.trim() !== "" && 
                      formData.message.trim() !== "";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/product-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          productTitle: item.title,
          productCategory: item.category,
          productImage: item.image,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setFormStatus("error");
        setErrorMessage(result.error || t.contact.errorMessage);
      }
    } catch {
      setFormStatus("error");
      setErrorMessage(t.contact.errorMessage);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4">
      <Link
        href="/gallery"
        className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {t.gallery.view === "Pogledaj" ? "Natrag na galeriju" : "Back to gallery"}
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
            {translateCategory(item.category)}
          </p>
          <h1 className="mb-6 text-3xl tracking-[0.15em] sm:text-4xl">
            {item.title}
          </h1>
          {!item.isAvailable && (
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
              Trenutno nedostupno
            </p>
          )}
          <p className="mb-8 leading-7 text-zinc-600">{item.description}</p>

          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full rounded-lg bg-black px-8 py-6 text-xs uppercase tracking-[0.35em] text-white transition-colors hover:bg-zinc-800"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                {t.modal.hideInquiry}
              </>
            ) : (
              <>
                <MessageCircle className="mr-2 h-4 w-4" />
                {t.modal.interested}
              </>
            )}
          </Button>

          {/* Expandable Form */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-5">
                  {formStatus === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-6 text-center"
                    >
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <Send className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="mb-2 text-lg font-medium text-zinc-900">
                        {t.modal.successTitle}
                      </h3>
                      <p className="text-sm text-zinc-600">
                        {t.modal.successMessage}
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="mb-3 rounded bg-amber-50 p-3 text-sm text-amber-800">
                        <strong>{t.modal.article}:</strong> {item.title} ({translateCategory(item.category)})
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="name"
                            className="mb-1 block text-xs uppercase tracking-wider text-zinc-500"
                          >
                            {t.contact.nameLabel} *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-colors focus:border-zinc-500 focus:outline-none"
                            placeholder={t.contact.namePlaceholder}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="mb-1 block text-xs uppercase tracking-wider text-zinc-500"
                          >
                            {t.contact.emailLabel} *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-colors focus:border-zinc-500 focus:outline-none"
                            placeholder={t.contact.emailPlaceholder}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="mb-1 block text-xs uppercase tracking-wider text-zinc-500"
                        >
                          {t.contact.phoneLabel} {t.modal.optional}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-colors focus:border-zinc-500 focus:outline-none"
                          placeholder={t.contact.phonePlaceholder}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="mb-1 block text-xs uppercase tracking-wider text-zinc-500"
                        >
                          {t.modal.yourMessage} *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          className="w-full resize-none rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition-colors focus:border-zinc-500 focus:outline-none"
                          placeholder={t.modal.messagePlaceholder}
                        />
                      </div>

                      {formStatus === "error" && (
                        <div className="rounded bg-red-50 p-3 text-sm text-red-700">
                          {errorMessage}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={!isFormValid || formStatus === "loading"}
                        className="w-full cursor-pointer rounded-lg bg-zinc-900 px-4 py-6 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-zinc-800 disabled:bg-zinc-400"
                      >
                        {formStatus === "loading" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            {t.modal.sending}
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            {t.modal.sendInquiry}
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
            <span className="sm:hidden">
              {t.gallery.view === "Pogledaj" ? "Prethodni" : "Previous"}
            </span>
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
            <span className="sm:hidden">
              {t.gallery.view === "Pogledaj" ? "Sljedeći" : "Next"}
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
