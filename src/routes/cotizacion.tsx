import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { products, type Product } from "@/data/products";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  ChevronDown,
  CheckCircle2,
  ShoppingBag,
  User,
} from "lucide-react";

export const Route = createFileRoute("/cotizacion")({
  head: () => ({
    meta: [
      { title: "Cotización Online — TPH" },
      {
        name: "description",
        content:
          "Cotizá tus pisos favoritos en segundos. Seleccioná productos, completá tus datos y recibí tu presupuesto por WhatsApp.",
      },
    ],
  }),
  component: CotizacionPage,
});

// ─── Types ────────────────────────────────────────────────────────────────────

type QuoteItem = Product & { quantity: number };

type ClientData = {
  name: string;
  rut: string;
  phone: string;
  address: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatARS = (n: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);

const CATEGORY_COLORS: Record<string, string> = {
  Laminado: "#01c3cd",
  Vinílico: "#ff0084",
  Porcelanato: "#ffbe00",
  Cerámico: "#01c3cd",
  SPC: "#ff0084",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepBadge({
  n,
  active,
  done,
  label,
}: {
  n: number;
  active: boolean;
  done: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all ${
          done
            ? "bg-[var(--brand-teal)] text-white"
            : active
              ? "bg-foreground text-background"
              : "bg-muted text-muted-foreground"
        }`}
      >
        {done ? <CheckCircle2 size={14} /> : n}
      </span>
      <span
        className={`hidden text-xs font-medium sm:inline ${
          active ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function CategoryDot({ category }: { category: string }) {
  return (
    <span
      className="inline-block h-2 w-2 shrink-0 rounded-full"
      style={{ backgroundColor: CATEGORY_COLORS[category] ?? "#01c3cd" }}
    />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function CotizacionPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [client, setClient] = useState<ClientData>({
    name: "",
    rut: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<Partial<ClientData>>({});

  const ITEMS_PER_PAGE = 10;

  // ── Product filtering ──────────────────────────────────────────────────────

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return ["Todos", ...cats];
  }, []);

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== "Todos")
      result = result.filter((p) => p.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, query]);

  // Reset page when filters change
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const paginated = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  function handleFilterChange(cb: () => void) {
    cb();
    setCurrentPage(1);
  }

  // ── Quote logic ────────────────────────────────────────────────────────────

  const total = quoteItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function addProduct(product: Product) {
    setQuoteItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing)
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function changeQty(id: string, delta: number) {
    setQuoteItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  }

  function removeItem(id: string) {
    setQuoteItems((prev) => prev.filter((i) => i.id !== id));
  }

  // ── Client validation ──────────────────────────────────────────────────────

  function validate(): boolean {
    const e: Partial<ClientData> = {};
    if (!client.name.trim()) e.name = "Requerido";
    if (!client.phone.trim()) e.phone = "Requerido";
    if (!client.address.trim()) e.address = "Requerido";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── WhatsApp ───────────────────────────────────────────────────────────────

  function openWhatsApp() {
    if (!validate()) return;

    const rawLines: (string | null)[] = [
      `> *Cotización TPH — Todo para tu Hogar*`,
      ``,
      `> *Datos del cliente*`,
      `• Nombre: ${client.name}`,
      client.rut ? `• RUT: ${client.rut}` : null,
      `• Teléfono: ${client.phone}`,
      `• Dirección: ${client.address}`,
      ``,
      `> *Productos solicitados*`,
      ...quoteItems.map(
        (item) =>
          `• ${item.name} (${item.size}) × ${item.quantity} u. = ${formatARS(item.price * item.quantity)}`
      ),
      ``,
      `> *Total estimado: ${formatARS(total)}*`,
      ``,
      `_Solicito presupuesto formal para los productos indicados._`,
    ];

    const message = rawLines.filter((l): l is string => l !== null).join("\n");

    const phone = "584122865550";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f8f9fc]">

      {/* ── HERO ── */}
      <section className="relative border-b border-border bg-[#0d0f11] overflow-hidden">
        {/* Animated orbs */}
        <div className="hero-orb hero-orb-1" style={{ width: 400, height: 400, background: "#01c3cd", opacity: 0.13, top: "-60px", right: "8%" }} />
        <div className="hero-orb hero-orb-2" style={{ width: 280, height: 280, background: "#ff0084", opacity: 0.09, bottom: "-50px", left: "15%" }} />
        <div className="hero-orb hero-orb-3" style={{ width: 220, height: 220, background: "#ffbe00", opacity: 0.08, top: "10px", left: "45%" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div>
            <span className="inline-block rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[var(--brand-teal)] shadow-sm">
              Cotización
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Cotizá tu piso online
            </h1>
            <p className="mt-2 text-sm text-white/50 max-w-md">
              Elegí productos, completá tus datos y recibí tu presupuesto por WhatsApp en segundos.
            </p>
          </div>
        </div>
      </section>

      {/* ── Step indicator + content ── */}
      <div className="px-4 py-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
      {/* ── Step indicator ── */}
      <div className="mx-auto max-w-2xl mb-6">
        <div className="flex items-center gap-3">
          <StepBadge
            n={1}
            active={step === 1}
            done={step > 1}
            label="Productos"
          />
          <span
            className={`flex-1 h-px transition-colors ${step > 1 ? "bg-[var(--brand-teal)]" : "bg-border"}`}
          />
          <StepBadge n={2} active={step === 2} done={step > 2} label="Datos" />
          <span
            className={`flex-1 h-px transition-colors ${step > 2 ? "bg-[var(--brand-teal)]" : "bg-border"}`}
          />
          <StepBadge n={3} active={step === 3} done={false} label="Resumen" />
        </div>
      </div>

      {/* ── STEP 1: Products ── */}
      {step === 1 && (
        <div className="mx-auto max-w-2xl space-y-4">
          {/* Search & filter */}
          <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Search size={15} className="shrink-0 text-muted-foreground" />
              <input
                id="quote-search"
                type="text"
                value={query}
                onChange={(e) => handleFilterChange(() => setQuery(e.target.value))}
                placeholder="Buscar producto..."
                className="w-full text-sm focus:outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
              />
            </div>
            {/* Category chips */}
            <div
              className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none" }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilterChange(() => setActiveCategory(cat))}
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "border-[var(--brand-teal)] bg-[var(--brand-teal)] text-white"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product list */}
          <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
            {filtered.length === 0 && (
              <p className="py-10 text-center text-sm text-muted-foreground">
                Sin resultados.
              </p>
            )}
            {paginated.map((product, idx) => {
              const inQuote = quoteItems.find((i) => i.id === product.id);
              return (
                <div
                  key={product.id}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[#f8f9fc] ${
                    idx !== 0 ? "border-t border-border" : ""
                  }`}
                >
                  {/* Thumbnail */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 shrink-0 rounded-lg object-cover"
                  />

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <CategoryDot category={product.category} />
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {product.category}
                      </span>
                    </div>
                    <p className="truncate text-sm font-semibold text-foreground leading-tight">
                      {product.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {product.size} · {product.color}
                    </p>
                  </div>

                  {/* Price + action */}
                  <div className="shrink-0 flex flex-col items-end gap-1.5">
                    <span className="text-sm font-bold text-foreground">
                      {formatARS(product.price)}
                    </span>
                    {inQuote ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => changeQty(product.id, -1)}
                          className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-muted text-foreground hover:bg-border transition cursor-pointer"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-5 text-center text-xs font-bold">
                          {inQuote.quantity}
                        </span>
                        <button
                          onClick={() => changeQty(product.id, 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-md border border-[var(--brand-teal)] bg-[var(--brand-teal)] text-white hover:brightness-110 transition cursor-pointer"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addProduct(product)}
                        className="flex items-center gap-1 rounded-lg border border-[var(--brand-teal)] px-2.5 py-1 text-xs font-semibold text-[var(--brand-teal)] hover:bg-[var(--brand-teal)] hover:text-white transition cursor-pointer"
                      >
                        <Plus size={11} />
                        Agregar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-border px-4 py-2.5 bg-[#f8f9fc]">
                <span className="text-[11px] text-muted-foreground">
                  Página {safePage} de {totalPages}
                  <span className="ml-1 text-muted-foreground/60">
                    ({filtered.length} productos)
                  </span>
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={safePage === 1}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-white text-foreground transition hover:bg-muted disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
                    aria-label="Página anterior"
                  >
                    <ChevronDown size={13} className="rotate-90" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-semibold transition cursor-pointer ${
                        page === safePage
                          ? "bg-[var(--brand-teal)] text-white shadow-sm"
                          : "border border-border bg-white text-foreground hover:bg-muted"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={safePage === totalPages}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-white text-foreground transition hover:bg-muted disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
                    aria-label="Página siguiente"
                  >
                    <ChevronDown size={13} className="-rotate-90" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quote preview strip */}
          {quoteItems.length > 0 && (
            <div className="sticky bottom-4 rounded-xl border border-[var(--brand-teal)] bg-white shadow-lg p-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand-teal)]">
                  <ShoppingBag size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground leading-none mb-0.5">
                    {quoteItems.reduce((s, i) => s + i.quantity, 0)} ítem
                    {quoteItems.reduce((s, i) => s + i.quantity, 0) !== 1
                      ? "s"
                      : ""}
                  </p>
                  <p className="text-sm font-bold text-foreground leading-none">
                    {formatARS(total)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-1.5 rounded-lg bg-[var(--brand-teal)] px-4 py-2 text-sm font-bold text-white shadow-sm hover:brightness-110 transition cursor-pointer"
              >
                Continuar
                <ChevronDown size={14} className="-rotate-90" />
              </button>
            </div>
          )}

          {quoteItems.length === 0 && (
            <p className="text-center text-xs text-muted-foreground py-2">
              Agregá al menos un producto para continuar.
            </p>
          )}
        </div>
      )}

      {/* ── STEP 2: Client data ── */}
      {step === 2 && (
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand-teal)]">
                <User size={15} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground leading-tight">
                  Tus datos de contacto
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Necesitamos estos datos para enviarle la cotización formal.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Name */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="client-name"
                  className="mb-1 block text-xs font-semibold text-foreground"
                >
                  Nombre completo{" "}
                  <span className="text-[var(--brand-pink)]">*</span>
                </label>
                <input
                  id="client-name"
                  type="text"
                  value={client.name}
                  onChange={(e) =>
                    setClient((c) => ({ ...c, name: e.target.value }))
                  }
                  placeholder="Ej: María García"
                  className={`w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]/30 ${
                    errors.name
                      ? "border-[var(--brand-pink)]"
                      : "border-border focus:border-[var(--brand-teal)]"
                  }`}
                />
                {errors.name && (
                  <p className="mt-0.5 text-[10px] text-[var(--brand-pink)]">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* RUT */}
              <div>
                <label
                  htmlFor="client-rut"
                  className="mb-1 block text-xs font-semibold text-foreground"
                >
                  RUT / DNI
                </label>
                <input
                  id="client-rut"
                  type="text"
                  value={client.rut}
                  onChange={(e) =>
                    setClient((c) => ({ ...c, rut: e.target.value }))
                  }
                  placeholder="Ej: 20-12345678-1"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition focus:border-[var(--brand-teal)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]/30"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="client-phone"
                  className="mb-1 block text-xs font-semibold text-foreground"
                >
                  Teléfono{" "}
                  <span className="text-[var(--brand-pink)]">*</span>
                </label>
                <input
                  id="client-phone"
                  type="tel"
                  value={client.phone}
                  onChange={(e) =>
                    setClient((c) => ({ ...c, phone: e.target.value }))
                  }
                  placeholder="Ej: +54 11 1234 5678"
                  className={`w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]/30 ${
                    errors.phone
                      ? "border-[var(--brand-pink)]"
                      : "border-border focus:border-[var(--brand-teal)]"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-0.5 text-[10px] text-[var(--brand-pink)]">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="client-address"
                  className="mb-1 block text-xs font-semibold text-foreground"
                >
                  Dirección de instalación{" "}
                  <span className="text-[var(--brand-pink)]">*</span>
                </label>
                <input
                  id="client-address"
                  type="text"
                  value={client.address}
                  onChange={(e) =>
                    setClient((c) => ({ ...c, address: e.target.value }))
                  }
                  placeholder="Ej: Av. Rivadavia 1234, CABA"
                  className={`w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]/30 ${
                    errors.address
                      ? "border-[var(--brand-pink)]"
                      : "border-border focus:border-[var(--brand-teal)]"
                  }`}
                />
                {errors.address && (
                  <p className="mt-0.5 text-[10px] text-[var(--brand-pink)]">
                    {errors.address}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Nav */}
          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition cursor-pointer"
            >
              ← Volver
            </button>
            <button
              onClick={() => {
                if (validate()) setStep(3);
              }}
              className="flex-1 rounded-lg bg-[var(--brand-teal)] px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:brightness-110 transition cursor-pointer"
            >
              Ver resumen →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: Summary + WhatsApp ── */}
      {step === 3 && (
        <div className="mx-auto max-w-2xl space-y-4">
          {/* Products summary */}
          <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <p className="text-sm font-bold text-foreground">
                Resumen de cotización
              </p>
              <button
                onClick={() => setStep(1)}
                className="text-xs font-medium text-[var(--brand-teal)] hover:underline cursor-pointer"
              >
                Editar
              </button>
            </div>

            {quoteItems.map((item, idx) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 px-4 py-3 ${idx !== 0 ? "border-t border-border" : ""}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-10 w-10 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground leading-tight">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {item.size}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs text-muted-foreground">
                    {item.quantity} u.
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {formatARS(item.price * item.quantity)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-1 text-muted-foreground hover:text-[var(--brand-pink)] transition cursor-pointer"
                  aria-label="Eliminar"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}

            {/* Total */}
            <div className="flex items-center justify-between border-t border-border bg-[#f8f9fc] px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Total estimado
              </span>
              <span className="text-lg font-black text-foreground">
                {formatARS(total)}
              </span>
            </div>
          </div>

          {/* Client summary */}
          <div className="rounded-xl border border-border bg-white shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-foreground">
                Datos del cliente
              </p>
              <button
                onClick={() => setStep(2)}
                className="text-xs font-medium text-[var(--brand-teal)] hover:underline cursor-pointer"
              >
                Editar
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div>
                <p className="text-muted-foreground">Nombre</p>
                <p className="font-semibold text-foreground">{client.name}</p>
              </div>
              {client.rut && (
                <div>
                  <p className="text-muted-foreground">RUT / DNI</p>
                  <p className="font-semibold text-foreground">{client.rut}</p>
                </div>
              )}
              <div>
                <p className="text-muted-foreground">Teléfono</p>
                <p className="font-semibold text-foreground">{client.phone}</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground">Dirección</p>
                <p className="font-semibold text-foreground">
                  {client.address}
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div
            className="rounded-lg border px-3 py-2.5 text-xs text-muted-foreground"
            style={{ borderColor: "#ffbe0040", backgroundColor: "#fffbeb" }}
          >
            <span
              className="font-semibold"
              style={{ color: "#b45309" }}
            >
              ⚠ Precios referenciales.
            </span>{" "}
            Los valores indicados son de lista y pueden variar según stock,
            metraje y condiciones de venta. Un asesor de TPH te confirmará el
            precio final.
          </div>

          {/* CTA nav */}
          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition cursor-pointer"
            >
              ← Volver
            </button>
            <button
              id="whatsapp-cta"
              onClick={openWhatsApp}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:brightness-110 cursor-pointer"
              style={{ backgroundColor: "#25d366" }}
            >
              <ion-icon name="logo-whatsapp" style={{ fontSize: "18px" }}></ion-icon>
              Finalizar por WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
