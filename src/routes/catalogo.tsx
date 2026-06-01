import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MessageCircle, Ruler, Palette } from "lucide-react";
import { products, type Product } from "@/data/products";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo de pisos — TPH" },
      { name: "description", content: "Explorá el catálogo TPH: pisos laminados, vinílicos, porcelanatos, SPC y cerámicos con precios y medidas." },
      { property: "og:title", content: "Catálogo de pisos — TPH" },
      { property: "og:description", content: "Pisos para el hogar con precios y medidas." },
    ],
  }),
  component: CatalogPage,
});

const categories = ["Todos", "Laminado", "Vinílico", "Porcelanato", "Cerámico", "SPC"] as const;

function CatalogPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("Todos");
  const filtered = useMemo(
    () => (active === "Todos" ? products : products.filter((p) => p.category === active)),
    [active]
  );

  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-pink)]">
            Catálogo
          </span>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
            Pisos para cada ambiente
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Explorá nuestra selección de pisos para el hogar. Filtrá por categoría y encontrá la
            opción ideal para tu proyecto.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                active === c
                  ? "border-[var(--brand-teal)] bg-[var(--brand-teal)] text-white"
                  : "border-border bg-background text-foreground hover:bg-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">
            No hay productos en esta categoría todavía.
          </p>
        )}
      </section>
    </>
  );
}

function ProductCard({ product }: { product: Product }) {
  const waHref = `https://wa.me/541112345678?text=${encodeURIComponent(
    `Hola TPH, me interesa el producto "${product.name}". ¿Pueden enviarme más información?`
  )}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          width={800}
          height={800}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-teal)]">
          {product.category}
        </span>
        <h3 className="mt-1 text-lg font-bold">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>

        <ul className="mt-4 space-y-1.5 text-sm">
          <li className="flex items-center gap-2 text-muted-foreground">
            <Ruler size={14} className="text-[var(--brand-yellow)]" />
            {product.size}
          </li>
          <li className="flex items-center gap-2 text-muted-foreground">
            <Palette size={14} className="text-[var(--brand-pink)]" />
            {product.color}
          </li>
        </ul>

        <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Desde</p>
            <p className="text-xl font-black text-foreground">
              ${product.price.toLocaleString("es-AR")}
              <span className="ml-1 text-xs font-medium text-muted-foreground">/m²</span>
            </p>
          </div>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3.5 py-2 text-xs font-semibold text-background transition hover:bg-foreground/85"
          >
            <MessageCircle size={14} /> Consultar
          </a>
        </div>
      </div>
    </article>
  );
}
