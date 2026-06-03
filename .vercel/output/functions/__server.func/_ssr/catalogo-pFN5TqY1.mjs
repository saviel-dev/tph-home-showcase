import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { p as products, P as ProductCard } from "./ProductCard-CPMiLR9C.mjs";
import { h as Search, X, i as SlidersHorizontal, j as ChevronLeft, k as ChevronRight, l as PackageSearch } from "../_libs/lucide-react.mjs";
import "./router-D9tPwcSo.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const bgVideo = "/assets/bg-catalog-eKBOyi4v.mp4";
const categories = ["Todos", "Laminado", "Vinílico", "Porcelanato", "Cerámico", "SPC"];
const sortOptions = [{
  value: "default",
  label: "Relevancia"
}, {
  value: "price-asc",
  label: "Precio: menor a mayor"
}, {
  value: "price-desc",
  label: "Precio: mayor a menor"
}, {
  value: "name-asc",
  label: "Nombre A–Z"
}];
function FadeInCard({
  children,
  delay = 0
}) {
  const [visible, setVisible] = reactExports.useState(false);
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px"
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: `transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, style: {
    transitionDelay: `${delay}ms`
  }, children });
}
function CatalogPage() {
  const [activeCategory, setActiveCategory] = reactExports.useState("Todos");
  const [query, setQuery] = reactExports.useState("");
  const [sort, setSort] = reactExports.useState("default");
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const itemsPerPage = 10;
  const countByCategory = reactExports.useMemo(() => {
    const map = {
      Todos: products.length
    };
    products.forEach((p) => {
      map[p.category] = (map[p.category] ?? 0) + 1;
    });
    return map;
  }, []);
  const filtered = reactExports.useMemo(() => {
    let result = activeCategory === "Todos" ? products : products.filter((p) => p.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.color.toLowerCase().includes(q));
    }
    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "name-asc") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [activeCategory, query, sort]);
  const hasActiveFilters = query.trim() !== "" || activeCategory !== "Todos" || sort !== "default";
  reactExports.useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, query, sort]);
  function clearAll() {
    setQuery("");
    setActiveCategory("Todos");
    setSort("default");
  }
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedProducts = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: bgVideo, autoPlay: true, muted: true, loop: true, playsInline: true, className: "absolute inset-0 h-full w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--brand-pink)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[var(--brand-pink)]" }),
          "Catálogo"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 text-3xl font-black leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl", children: [
          "Pisos para",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--brand-teal)]", children: "cada ambiente" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-xl text-sm leading-relaxed text-white/70", children: "Explorá nuestra selección de pisos. Buscá por nombre, filtrá por categoría y ordená como prefieras." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-col sm:flex-row w-full sm:max-w-xl items-stretch sm:items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 17, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "catalog-search", type: "text", value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Buscar por nombre, color...", className: "w-full rounded-xl border border-transparent bg-white py-3 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:border-[var(--brand-teal)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]/30 transition-all" }),
            query && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQuery(""), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 15 }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowFilters((v) => !v), className: `flex items-center justify-center cursor-pointer gap-2 rounded-xl border px-4 py-3 text-sm font-medium shadow-sm transition-all sm:w-auto w-full ${showFilters ? "border-[var(--brand-teal)] bg-white text-[var(--brand-teal)]" : "border-transparent bg-white text-foreground hover:border-[var(--brand-teal)] hover:text-[var(--brand-teal)]"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { size: 16 }),
            "Filtros"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex overflow-x-auto items-center gap-2 py-4 [&::-webkit-scrollbar]:hidden", style: {
        scrollbarWidth: "none",
        msOverflowStyle: "none"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mr-1 shrink-0", children: "Categoría:" }),
        categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { id: `filter-${c.toLowerCase()}`, onClick: () => setActiveCategory(c), className: `flex items-center shrink-0 cursor-pointer gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${activeCategory === c ? "border-[var(--brand-teal)] bg-[var(--brand-teal)] text-white shadow-sm" : "border-border bg-background text-foreground hover:bg-muted"}`, children: [
          c,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-1.5 py-0.5 text-[10px] font-bold ${activeCategory === c ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`, children: countByCategory[c] ?? 0 })
        ] }, c))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid transition-all duration-300 ease-in-out ${showFilters ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex overflow-x-auto items-center gap-2 border-t border-border py-4 [&::-webkit-scrollbar]:hidden", style: {
        scrollbarWidth: "none",
        msOverflowStyle: "none"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground shrink-0", children: "Ordenar:" }),
        sortOptions.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSort(opt.value), className: `rounded-lg border shrink-0 cursor-pointer px-3 py-1.5 text-sm font-medium transition-all ${sort === opt.value ? "border-[var(--brand-pink)] bg-[var(--brand-pink)]/10 text-[var(--brand-pink)]" : "border-border bg-background text-foreground hover:bg-muted"}`, children: opt.label }, opt.value))
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          filtered.length === 0 ? "Sin resultados" : `Mostrando ${filtered.length} producto${filtered.length !== 1 ? "s" : ""}`,
          activeCategory !== "Todos" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 font-medium text-foreground", children: [
            "en ",
            activeCategory
          ] }),
          query && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 font-medium text-foreground", children: [
            'para "',
            query,
            '"'
          ] })
        ] }),
        hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: clearAll, className: "flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 }),
          "Limpiar filtros"
        ] })
      ] }),
      paginatedProducts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: paginatedProducts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FadeInCard, { delay: i * 80, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }) }, p.id)) }),
        totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCurrentPage((p) => Math.max(1, p - 1)), disabled: currentPage === 1, className: "flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-sm transition-all hover:bg-muted disabled:opacity-50 disabled:pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 18 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: Array.from({
            length: totalPages
          }).map((_, i) => {
            const page = i + 1;
            return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              setCurrentPage(page);
              window.scrollTo({
                top: 400,
                behavior: "smooth"
              });
            }, className: `flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all ${currentPage === page ? "bg-[var(--brand-teal)] text-white shadow-md" : "hover:bg-muted text-muted-foreground"}`, children: page }, page);
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            setCurrentPage((p) => Math.min(totalPages, p + 1));
            window.scrollTo({
              top: 400,
              behavior: "smooth"
            });
          }, disabled: currentPage === totalPages, className: "flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-sm transition-all hover:bg-muted disabled:opacity-50 disabled:pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18 }) })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-24 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-20 w-20 items-center justify-center rounded-2xl bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageSearch, { size: 36, className: "text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-lg font-bold", children: "No encontramos resultados" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-xs text-sm text-muted-foreground", children: "Probá con otro término de búsqueda o cambiá los filtros activos." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: clearAll, className: "mt-6 rounded-lg bg-[var(--brand-teal)] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 transition", children: "Ver todos los productos" })
      ] })
    ] })
  ] });
}
export {
  CatalogPage as component
};
