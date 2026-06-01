import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Truck, Sparkles, Award } from "lucide-react";
import heroImg from "@/assets/hero-floor.jpg";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TPH — Pisos para el hogar | Inicio" },
      { name: "description", content: "TPH especialistas en pisos para el hogar: laminados, vinílicos, porcelanatos y más. Conocé nuestro catálogo." },
      { property: "og:title", content: "TPH — Todo para tu Hogar" },
      { property: "og:description", content: "Pisos para el hogar con calidad y diseño." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = products.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-teal)]" />
              Pisos para tu hogar
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Transformá tu hogar con{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[var(--brand-teal)]">pisos de calidad</span>
                <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-[var(--brand-yellow)]/40" />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              En TPH encontrás laminados, vinílicos, porcelanatos y más. Productos seleccionados,
              asesoramiento profesional y la mejor relación calidad-precio.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--brand-teal)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
              >
                Ver catálogo <ArrowRight size={16} />
              </Link>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                Contactanos
              </Link>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
              {[
                { k: "+15", v: "Años", color: "var(--brand-teal)" },
                { k: "+500", v: "Modelos", color: "var(--brand-pink)" },
                { k: "100%", v: "Calidad", color: "var(--brand-yellow)" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="text-2xl font-black" style={{ color: s.color }}>{s.k}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/5">
              <img
                src={heroImg}
                alt="Ambiente moderno con piso de madera natural"
                width={1600}
                height={1024}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-border bg-background p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-pink)]/10">
                  <Award size={20} className="text-[var(--brand-pink)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Garantía oficial</p>
                  <p className="text-xs text-muted-foreground">En todos nuestros productos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { Icon: ShieldCheck, color: "var(--brand-teal)", t: "Calidad certificada", d: "Productos de primeras marcas con garantía." },
            { Icon: Truck, color: "var(--brand-pink)", t: "Envíos a todo el país", d: "Logística rápida y segura." },
            { Icon: Sparkles, color: "var(--brand-yellow)", t: "Asesoramiento", d: "Te ayudamos a elegir el piso ideal." },
            { Icon: Award, color: "var(--brand-teal)", t: "Experiencia", d: "Más de 15 años renovando hogares." },
          ].map(({ Icon, color, t, d }) => (
            <div key={t} className="rounded-xl border border-border bg-background p-5">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${color}1a` }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <h3 className="mt-4 text-sm font-bold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-pink)]">
              Destacados
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Productos seleccionados
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Conocé algunos de nuestros pisos más elegidos por nuestros clientes.
            </p>
          </div>
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-teal)] hover:underline"
          >
            Ver todo el catálogo <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <article
              key={p.id}
              className="group overflow-hidden rounded-xl border border-border bg-background transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={p.image}
                  alt={p.name}
                  width={800}
                  height={800}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-teal)]">
                  {p.category}
                </span>
                <h3 className="mt-1 text-lg font-bold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.size} · {p.color}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-border bg-foreground px-8 py-14 text-background sm:px-12">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                ¿Listo para renovar tu hogar?
              </h2>
              <p className="mt-3 max-w-xl text-background/70">
                Escribinos y recibí asesoramiento personalizado sobre el piso ideal para tu espacio.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--brand-teal)] px-6 py-3 text-sm font-semibold text-white hover:brightness-110"
              >
                Contactanos <ArrowRight size={16} />
              </Link>
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-2 rounded-md border border-background/20 bg-transparent px-6 py-3 text-sm font-semibold text-background hover:bg-background/10"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
