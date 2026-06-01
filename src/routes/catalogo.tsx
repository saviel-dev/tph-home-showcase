import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

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

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
