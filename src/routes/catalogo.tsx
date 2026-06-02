import { createFileRoute } from "@tanstack/react-router";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Search, SlidersHorizontal, X, PackageSearch, ChevronLeft, ChevronRight } from "lucide-react";
import bgVideo from "@/assets/media/bg-catalog.mp4";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo de Pisos y Revestimientos — TPH" },
      { name: "description", content: "Explorá el catálogo TPH: pisos laminados, vinílicos, porcelanatos, SPC y cerámicos con precios, características y medidas." },
      { name: "keywords", content: "catalogo pisos, precios pisos laminados, porcelanatos medidas, pisos spc, revestimientos" },
      { property: "og:title", content: "Catálogo de Pisos y Revestimientos — TPH" },
      { property: "og:description", content: "Explorá nuestro catálogo completo con precios y medidas." },
    ],
  }),
  component: CatalogPage,
});

const categories = ["Todos", "Laminado", "Vinílico", "Porcelanato", "Cerámico", "SPC"] as const;
type Category = (typeof categories)[number];

const sortOptions = [
  { value: "default", label: "Relevancia" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "name-asc", label: "Nombre A–Z" },
];

function FadeInCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const countByCategory = useMemo(() => {
    const map: Record<string, number> = { Todos: products.length };
    products.forEach((p) => {
      map[p.category] = (map[p.category] ?? 0) + 1;
    });
    return map;
  }, []);

  const filtered = useMemo(() => {
    let result = activeCategory === "Todos" ? products : products.filter((p) => p.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q)
      );
    }
    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "name-asc") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [activeCategory, query, sort]);

  const hasActiveFilters = query.trim() !== "" || activeCategory !== "Todos" || sort !== "default";

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, query, sort]);

  function clearAll() {
    setQuery("");
    setActiveCategory("Todos");
    setSort("default");
  }

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {/* HEADER — VIDEO HERO */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Background video */}
        <video
          src={bgVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/80" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--brand-pink)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-pink)]" />
            Catálogo
          </span>
          <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
            Pisos para{" "}
            <span className="text-[var(--brand-teal)]">cada ambiente</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
            Explorá nuestra selección de pisos. Buscá por nombre, filtrá por categoría y ordená como prefieras.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-5 flex flex-col sm:flex-row w-full sm:max-w-xl items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="catalog-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nombre, color..."
                className="w-full rounded-xl border border-transparent bg-white py-3 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:border-[var(--brand-teal)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]/30 transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={15} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`flex items-center justify-center cursor-pointer gap-2 rounded-xl border px-4 py-3 text-sm font-medium shadow-sm transition-all sm:w-auto w-full ${
                showFilters
                  ? "border-[var(--brand-teal)] bg-white text-[var(--brand-teal)]"
                  : "border-transparent bg-white text-foreground hover:border-[var(--brand-teal)] hover:text-[var(--brand-teal)]"
              }`}
            >
              <SlidersHorizontal size={16} />
              Filtros
            </button>
          </div>
        </div>
      </section>


      {/* FILTERS PANEL */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category pills — always visible */}
          <div 
            className="flex overflow-x-auto items-center gap-2 py-4 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mr-1 shrink-0">Categoría:</span>
            {categories.map((c) => (
              <button
                key={c}
                id={`filter-${c.toLowerCase()}`}
                onClick={() => setActiveCategory(c)}
                className={`flex items-center shrink-0 cursor-pointer gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                  activeCategory === c
                    ? "border-[var(--brand-teal)] bg-[var(--brand-teal)] text-white shadow-sm"
                    : "border-border bg-background text-foreground hover:bg-muted"
                }`}
              >
                {c}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    activeCategory === c ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {countByCategory[c] ?? 0}
                </span>
              </button>
            ))}
          </div>

          {/* Sort — visible when filters panel open */}
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              showFilters ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div 
                className="flex overflow-x-auto items-center gap-2 border-t border-border py-4 [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground shrink-0">Ordenar:</span>
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSort(opt.value)}
                    className={`rounded-lg border shrink-0 cursor-pointer px-3 py-1.5 text-sm font-medium transition-all ${
                      sort === opt.value
                        ? "border-[var(--brand-pink)] bg-[var(--brand-pink)]/10 text-[var(--brand-pink)]"
                        : "border-border bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Results count + clear */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {filtered.length === 0
              ? "Sin resultados"
              : `Mostrando ${filtered.length} producto${filtered.length !== 1 ? "s" : ""}`}
            {activeCategory !== "Todos" && (
              <span className="ml-1 font-medium text-foreground">en {activeCategory}</span>
            )}
            {query && (
              <span className="ml-1 font-medium text-foreground">para "{query}"</span>
            )}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            >
              <X size={12} />
              Limpiar filtros
            </button>
          )}
        </div>

        {/* GRID */}
        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedProducts.map((p, i) => (
                <FadeInCard key={p.id} delay={i * 80}>
                  <ProductCard product={p} />
                </FadeInCard>
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-sm transition-all hover:bg-muted disabled:opacity-50 disabled:pointer-events-none"
                >
                  <ChevronLeft size={18} />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 400, behavior: "smooth" });
                        }}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                          currentPage === page 
                            ? "bg-[var(--brand-teal)] text-white shadow-md" 
                            : "hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => {
                    setCurrentPage(p => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-sm transition-all hover:bg-muted disabled:opacity-50 disabled:pointer-events-none"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
              <PackageSearch size={36} className="text-muted-foreground" />
            </div>
            <h3 className="mt-5 text-lg font-bold">No encontramos resultados</h3>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Probá con otro término de búsqueda o cambiá los filtros activos.
            </p>
            <button
              onClick={clearAll}
              className="mt-6 rounded-lg bg-[var(--brand-teal)] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 transition"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </section>
    </>
  );
}
