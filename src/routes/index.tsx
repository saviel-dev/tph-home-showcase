import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ShieldCheck, Truck, Sparkles, Award } from "lucide-react";
import heroImg from "@/assets/hero-floor.jpg";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TPH — Todo para tu Hogar | Especialistas en Pisos y Revestimientos" },
      { name: "description", content: "En TPH somos especialistas en pisos para tu hogar: laminados, vinílicos, porcelanatos, cerámicos y SPC. Renovamos tus espacios con la mejor calidad." },
      { name: "keywords", content: "pisos laminados, pisos vinilicos, porcelanatos, ceramicos, pisos spc, tph pisos, inicio" },
      { property: "og:title", content: "TPH — Especialistas en Pisos y Revestimientos" },
      { property: "og:description", content: "En TPH somos especialistas en pisos para tu hogar. Renovamos tus espacios con la mejor calidad." },
    ],
  }),
  component: HomePage,
});

function AnimatedCounter({ end, prefix = "", suffix = "" }: { end: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out effect so it slows down nicely towards the end
      const easeOut = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        window.requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    window.requestAnimationFrame(animate);
  }, [end]);

  return <>{prefix}{count}{suffix}</>;
}

function FadeInSection({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setIsVisible(true);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function HomePage() {
  const featured = products.slice(0, 3);

  const [titlePhase, setTitlePhase] = useState(0);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [showDesc, setShowDesc] = useState(false);

  const fullText1 = "Transformá tu hogar con ";
  const fullText2 = "pisos de calidad";

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText1.length) {
        setText1(fullText1.slice(0, i + 1));
      } else if (i < fullText1.length + fullText2.length) {
        if (i === fullText1.length) setTitlePhase(1);
        setText2(fullText2.slice(0, i - fullText1.length + 1));
      } else {
        setTitlePhase(2);
        setShowDesc(true);
        clearInterval(interval);
      }
      i++;
    }, 45);
    return () => clearInterval(interval);
  }, []);

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
            <h1 className="mt-5 min-h-[90px] text-4xl font-black leading-[1.05] tracking-tight sm:min-h-[100px] sm:text-5xl lg:min-h-0 lg:text-6xl">
              {text1}
              {titlePhase >= 1 && (
                <span className="relative inline-block">
                  <span className="relative z-10 text-[var(--brand-teal)]">{text2}</span>
                  {titlePhase === 2 && (
                    <span className="absolute inset-x-0 bottom-1 -z-0 h-3 animate-in fade-in duration-500 bg-[var(--brand-yellow)]/40" />
                  )}
                </span>
              )}
              {titlePhase < 2 && (
                <span className="ml-1 animate-pulse border-r-4 border-[var(--brand-teal)]" />
              )}
            </h1>
            <p className={`mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg transition-all duration-1000 ${showDesc ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
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
                { end: 15, prefix: "+", suffix: "", v: "Años", color: "var(--brand-teal)" },
                { end: 500, prefix: "+", suffix: "", v: "Modelos", color: "var(--brand-pink)" },
                { end: 100, prefix: "", suffix: "%", v: "Calidad", color: "var(--brand-yellow)" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="text-2xl font-black" style={{ color: s.color }}>
                    <AnimatedCounter end={s.end} prefix={s.prefix} suffix={s.suffix} />
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={`relative transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/5">
              <img
                src={heroImg}
                alt="Ambiente moderno con piso de madera natural"
                width={1600}
                height={1024}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className={`absolute -bottom-6 -left-6 hidden rounded-xl border border-border bg-background p-4 shadow-xl sm:block transition-all duration-1000 delay-[400ms] ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
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
          ].map(({ Icon, color, t, d }, i) => (
            <div 
              key={t} 
              className={`group relative overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-700 ease-out hover:border-border/80 hover:shadow-md ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: isLoaded ? `${400 + i * 150}ms` : '0ms' }}
            >
              <div className="relative z-10 max-w-[70%]">
                <h3 className="text-base font-bold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
              <div className="absolute right-4 top-1/2 z-0 -translate-y-1/2 opacity-30 transition-all duration-500 group-hover:scale-110 group-hover:opacity-50">
                <Icon size={72} style={{ color }} strokeWidth={1.5} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <FadeInSection className="flex flex-wrap items-end justify-between gap-4">
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-pink)] hover:underline"
          >
            Ver todo el catálogo <ArrowRight size={16} />
          </Link>
        </FadeInSection>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <FadeInSection key={p.id} delay={i * 200}>
              <ProductCard product={p} />
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <FadeInSection>
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
      </FadeInSection>
    </section>
    </>
  );
}
