import { useEffect, useMemo, useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/shared/Chatbot";
import { X, ChevronLeft, ChevronRight, Play, Download, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { galleryService, type GalleryCategory, type GalleryItem } from "@/services/gallery.service";

type CategoryOption = {
  label: string;
  slug: string; // filtro por slug
  id?: number;
};

export default function Galeria() {
  // categorias
  const [categories, setCategories] = useState<CategoryOption[]>([{ label: "Todos", slug: "all" }]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption>({ label: "Todos", slug: "all" });

  // itens
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // lightbox
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isBusy = loadingCategories || loadingItems;

  // Itens filtrados (o backend já pode filtrar, mas mantemos por segurança)
  const filteredItems = useMemo(() => {
    if (selectedCategory.slug === "all") return items;
    return items.filter((it) => it.category_slug === selectedCategory.slug);
  }, [items, selectedCategory.slug]);

  // =========================
  // 1) Carregar categorias
  // =========================
  useEffect(() => {
    let mounted = true;

    async function loadCategories() {
      setLoadingCategories(true);
      setError(null);

      try {
        const data: GalleryCategory[] = await galleryService.getCategories();

        const options: CategoryOption[] = [
          { label: "Todos", slug: "all" },
          ...data
            .filter((c) => c.is_active)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((c) => ({
              label: c.name,
              slug: c.slug,
              id: c.id,
            })),
        ];

        if (mounted) {
          setCategories(options);

          // Se categoria selecionada não existir mais, volta para Todos
          const stillExists = options.find((o) => o.slug === selectedCategory.slug);
          if (!stillExists) setSelectedCategory({ label: "Todos", slug: "all" });
        }
      } catch (e: any) {
        if (mounted) setError(e?.message || "Erro ao buscar categorias");
      } finally {
        if (mounted) setLoadingCategories(false);
      }
    }

    loadCategories();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =========================
  // 2) Carregar itens (depende da categoria)
  // =========================
  useEffect(() => {
    let mounted = true;

    async function loadItems() {
      setLoadingItems(true);
      setError(null);

      try {
        const data =
          selectedCategory.slug === "all"
            ? await galleryService.getItems({ ordering: "-date" })
            : await galleryService.getItems({ category_slug: selectedCategory.slug, ordering: "-date" });

        if (mounted) setItems(data);
      } catch (e: any) {
        if (mounted) setError(e?.message || "Erro ao buscar itens");
      } finally {
        if (mounted) setLoadingItems(false);
      }
    }

    loadItems();

    return () => {
      mounted = false;
    };
  }, [selectedCategory.slug]);

  // =========================
  // Lightbox helpers
  // =========================
  const openLightbox = (item: GalleryItem, index: number) => {
    setSelectedItem(item);
    setCurrentIndex(index);
  };

  const closeLightbox = () => setSelectedItem(null);

  const navigateLightbox = (direction: "prev" | "next") => {
    if (filteredItems.length === 0) return;

    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % filteredItems.length
        : (currentIndex - 1 + filteredItems.length) % filteredItems.length;

    setCurrentIndex(newIndex);
    setSelectedItem(filteredItems[newIndex]);
  };

  const handleDownload = async () => {
    if (!selectedItem) return;

    try {
      await galleryService.registerDownload(selectedItem.id);
    } catch {
      // não bloqueia download se falhar contador
    }

    window.open(selectedItem.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-20">
        {/* HERO */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA5] via-teal-500 to-[#9C27B0]" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-accent font-medium mb-6">
                Nossa Galeria
              </span>
              <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight">
                Momentos que{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                  Inspiram
                </span>
              </h1>
              <p className="text-xl text-white/95 leading-relaxed">
                Reviva os momentos especiais que marcam nossa jornada de transformação
              </p>
            </div>
          </div>
        </section>

        {/* GALERIA */}
        <section className="py-20 lg:py-32 bg-[#FAFAFA]">
          <div className="container mx-auto px-4 lg:px-8">
            {/* ERRO */}
            {error && (
              <div className="mb-8 p-4 rounded-2xl border border-red-200 bg-red-50 text-red-700 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="font-semibold">Ocorreu um erro</p>
                  <p className="text-sm opacity-90">{error}</p>
                  <p className="text-xs opacity-80 mt-2">
                    Confirma se o backend está a rodar e se o teu <b>VITE</b> env está certo.
                  </p>
                </div>
              </div>
            )}

            {/* FILTROS */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => {
                const active = selectedCategory.slug === cat.slug;
                return (
                  <Button
                    key={cat.slug}
                    variant={active ? "default" : "outline"}
                    onClick={() => setSelectedCategory(cat)}
                    disabled={loadingItems}
                    className={
                      active
                        ? "bg-[#00BFA5] hover:bg-[#00BFA5]/90 rounded-full px-6"
                        : "rounded-full px-6 hover:border-[#00BFA5] hover:text-[#00BFA5]"
                    }
                  >
                    {cat.label}
                  </Button>
                );
              })}
            </div>

            {/* LOADER */}
            {isBusy && (
              <div className="flex items-center justify-center py-16 text-slate-500">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Carregando galeria...
              </div>
            )}

            {/* GRID */}
            {!isBusy && (
              <>
                {filteredItems.length === 0 ? (
                  <div className="text-center py-16 text-slate-500">
                    <p className="font-semibold">Nenhum item encontrado</p>
                    <p className="text-sm opacity-80">Adiciona itens no admin ou muda a categoria.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((item, index) => (
                      <div
                        key={item.id}
                        onClick={() => openLightbox(item, index)}
                        className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${
                          index % 5 === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                        }`}
                      >
                        <div className={`relative ${index % 5 === 0 ? "h-[500px]" : "h-[280px]"} overflow-hidden`}>
                          <img
                            src={item.thumb || item.url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                          <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                            <Badge className="w-fit mb-2 bg-[#00BFA5] hover:bg-[#00BFA5]/90 font-accent">
                              {item.category_name}
                            </Badge>
                            <h3 className="font-display font-bold text-xl text-white mb-1">{item.title}</h3>
                            <p className="text-white/80 text-sm">{item.formatted_date || item.date}</p>
                          </div>

                          {item.type === "video" && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="text-[#00BFA5] ml-1" size={24} fill="currentColor" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* LIGHTBOX */}
        <Dialog open={!!selectedItem} onOpenChange={closeLightbox}>
          <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-black/95 border-none">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* fechar */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X size={24} />
              </button>

              {/* navegação */}
              <button
                onClick={() => navigateLightbox("prev")}
                className="absolute left-4 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft size={28} />
              </button>

              <button
                onClick={() => navigateLightbox("next")}
                className="absolute right-4 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight size={28} />
              </button>

              {/* conteúdo */}
              {selectedItem && (
                <div className="relative max-w-full max-h-full p-8 w-full">
                  {selectedItem.type === "video" ? (
                    <div className="w-full flex justify-center">
                      <video controls className="max-w-full max-h-[70vh] rounded-lg" src={selectedItem.url} />
                    </div>
                  ) : (
                    <img
                      src={selectedItem.url}
                      alt={selectedItem.title}
                      className="max-w-full max-h-[70vh] object-contain rounded-lg mx-auto"
                    />
                  )}

                  {/* info */}
                  <div className="absolute bottom-0 left-8 right-8 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <Badge className="mb-2 bg-[#00BFA5] hover:bg-[#00BFA5]/90 font-accent">
                          {selectedItem.category_name}
                        </Badge>
                        <h3 className="font-display font-bold text-2xl text-white truncate">{selectedItem.title}</h3>
                        <p className="text-white/70">{selectedItem.formatted_date || selectedItem.date}</p>
                      </div>

                      <Button
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10"
                        onClick={handleDownload}
                      >
                        <Download className="mr-2" size={18} />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* thumbs */}
              {filteredItems.length > 0 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm p-2 rounded-full">
                  {filteredItems.slice(0, 8).map((it, idx) => (
                    <button
                      key={it.id}
                      onClick={() => openLightbox(it, idx)}
                      className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                        currentIndex === idx ? "border-[#00BFA5] scale-110" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      title={it.title}
                    >
                      <img src={it.thumb || it.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
