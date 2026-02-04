"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type GalleryItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  isAvailable: boolean;
};

type FormData = {
  title: string;
  description: string;
  category: string;
  image: string;
  sortOrder: number;
  isAvailable: boolean;
};

const defaultFormData: FormData = {
  title: "",
  description: "",
  category: "",
  image: "",
  sortOrder: 0,
  isAvailable: true,
};

const categories = [
  "Prstenje",
  "Ogrlice",
  "Naušnice",
  "Narukvice",
  "Satovi",
  "Privjesci",
  "Broševi",
];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/admin/gallery");
      const result = await response.json();
      if (result.success) {
        setItems(result.items);
      }
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      toast.error("Greška pri učitavanju galerije");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenModal = (item?: GalleryItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        description: item.description,
        category: item.category,
        image: item.image,
        sortOrder: item.sortOrder,
        isAvailable: item.isAvailable,
      });
    } else {
      setEditingItem(null);
      setFormData(defaultFormData);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData(defaultFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.image) {
      toast.error("Popunite sva obavezna polja");
      return;
    }

    setIsSubmitting(true);

    try {
      const isEditing = !!editingItem;
      const response = await fetch("/api/admin/gallery", {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isEditing ? { id: editingItem.id, ...formData } : formData
        ),
      });

      const result = await response.json();
      if (result.success) {
        if (isEditing) {
          setItems((prev) =>
            prev.map((item) =>
              item.id === editingItem.id ? result.item : item
            )
          );
          toast.success("Stavka ažurirana");
        } else {
          setItems((prev) => [result.item, ...prev]);
          toast.success("Stavka dodana");
        }
        handleCloseModal();
      } else {
        toast.error(result.error || "Greška pri spremanju");
      }
    } catch (error) {
      console.error("Error saving item:", error);
      toast.error("Greška pri spremanju");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Jeste li sigurni da želite obrisati ovu stavku?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/gallery?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (result.success) {
        setItems((prev) => prev.filter((item) => item.id !== id));
        toast.success("Stavka obrisana");
      } else {
        toast.error("Greška pri brisanju");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Greška pri brisanju");
    }
  };

  const filteredItems = selectedCategory === "all"
    ? items
    : items.filter((item) => item.category === selectedCategory);

  const uniqueCategories = Array.from(new Set(items.map((item) => item.category)));

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-medium tracking-wide">Galerija</h1>
        
        <div className="flex gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[150px] border-zinc-700 bg-zinc-900">
              <SelectValue placeholder="Kategorija" />
            </SelectTrigger>
            <SelectContent className="border-zinc-700 bg-zinc-900 text-zinc-100">
              <SelectItem value="all">Sve kategorije</SelectItem>
              {uniqueCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button onClick={() => handleOpenModal()} className="bg-white text-black hover:bg-zinc-200">
            <Plus className="mr-2 h-4 w-4" />
            Dodaj stavku
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-zinc-600" />
          <p className="mt-4 text-zinc-400">Nema stavki u galeriji</p>
          <Button
            onClick={() => handleOpenModal()}
            className="mt-4 bg-white text-black hover:bg-zinc-200"
          >
            <Plus className="mr-2 h-4 w-4" />
            Dodaj prvu stavku
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 cursor-pointer"
            >
              <div className="relative aspect-square">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={`object-cover transition-transform group-hover:scale-105 ${!item.isAvailable ? "grayscale opacity-60" : ""}`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                
                <div className="absolute bottom-0 left-0 right-0 flex justify-end gap-2 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => handleOpenModal(item)}
                    className="h-8 w-8 bg-white/90 text-black hover:bg-white"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => handleDelete(item.id)}
                    className="h-8 w-8 bg-red-500/90 text-white hover:bg-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-3">
                <h3 className="truncate font-medium">{item.title}</h3>
                <p className="text-sm text-zinc-400">{item.category}</p>
                {!item.isAvailable && (
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Trenutno nedostupno
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="border-zinc-800 bg-zinc-900 text-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Uredi stavku" : "Dodaj novu stavku"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-zinc-300">Naziv *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Npr. Dijamantni prsten 'Vječnost'"
                className="mt-1.5 border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500"
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-zinc-300">Kategorija *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="mt-1.5 border-zinc-700 bg-zinc-800">
                  <SelectValue placeholder="Odaberi kategoriju" />
                </SelectTrigger>
                <SelectContent className="border-zinc-700 bg-zinc-900">
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="image" className="text-zinc-300">URL slike *</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="mt-1.5 border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500"
              />
              {formData.image && (
                <div className="mt-2 relative aspect-video w-full overflow-hidden rounded border border-zinc-700">
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    className="object-cover"
                    onError={() => toast.error("Neispravan URL slike")}
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="description" className="text-zinc-300">Opis *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Opis proizvoda..."
                rows={3}
                className="mt-1.5 border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 resize-none"
              />
            </div>

            <div>
              <Label htmlFor="sortOrder" className="text-zinc-300">Redoslijed (manji = prvo)</Label>
              <Input
                id="sortOrder"
                type="number"
                value={formData.sortOrder}
                onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                className="mt-1.5 border-zinc-700 bg-zinc-800 text-white w-24"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                id="isAvailable"
                type="checkbox"
                checked={formData.isAvailable}
                onChange={(e) =>
                  setFormData({ ...formData, isAvailable: e.target.checked })
                }
                className="h-4 w-4 cursor-pointer rounded border-zinc-600 bg-zinc-800 text-white"
              />
              <Label htmlFor="isAvailable" className="text-sm text-zinc-300 cursor-pointer">
                Proizvod je trenutno dostupan
              </Label>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCloseModal}
                className="text-zinc-400 hover:text-white"
              >
                Odustani
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-black hover:bg-zinc-200"
              >
                {isSubmitting ? "Spremanje..." : editingItem ? "Spremi" : "Dodaj"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
