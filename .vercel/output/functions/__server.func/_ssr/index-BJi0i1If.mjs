import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { p as products, P as ProductCard } from "./ProductCard-CPMiLR9C.mjs";
import { A as ArrowRight, m as Award, n as ShieldCheck, o as Truck, p as Sparkles } from "../_libs/lucide-react.mjs";
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
import "./router-D9tPwcSo.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
const heroImg = "/assets/hero-floor-7Zng1kJe.jpg";
function AnimatedCounter({
  end,
  prefix = "",
  suffix = ""
}) {
  const [count, setCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    let startTime;
    const duration = 2e3;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    prefix,
    count,
    suffix
  ] });
}
function FadeInSection({
  children,
  delay = 0,
  className = ""
}) {
  const [isVisible, setIsVisible] = reactExports.useState(false);
  const domRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setIsVisible(true);
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: domRef, className: `transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`, style: {
    transitionDelay: `${delay}ms`
  }, children });
}
function HomePage() {
  const featured = products.slice(0, 3);
  const [titlePhase, setTitlePhase] = reactExports.useState(0);
  const [text1, setText1] = reactExports.useState("");
  const [text2, setText2] = reactExports.useState("");
  const [showDesc, setShowDesc] = reactExports.useState(false);
  const fullText1 = "Transformá tu hogar con ";
  const fullText2 = "pisos de calidad";
  const [isLoaded, setIsLoaded] = reactExports.useState(false);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[var(--brand-teal)]" }),
          "Pisos para tu hogar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-5 min-h-[90px] text-4xl font-black leading-[1.05] tracking-tight sm:min-h-[100px] sm:text-5xl lg:min-h-0 lg:text-6xl", children: [
          text1,
          titlePhase >= 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10 text-[var(--brand-teal)]", children: text2 }),
            titlePhase === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-x-0 bottom-1 -z-0 h-3 animate-in fade-in duration-500 bg-[var(--brand-yellow)]/40" })
          ] }),
          titlePhase < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 animate-pulse border-r-4 border-[var(--brand-teal)]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg transition-all duration-1000 ${showDesc ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`, children: "En TPH encontrás laminados, vinílicos, porcelanatos y más. Productos seleccionados, asesoramiento profesional y la mejor relación calidad-precio." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/catalogo", className: "inline-flex items-center gap-2 rounded-md bg-[var(--brand-teal)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110", children: [
            "Ver catálogo ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contacto", className: "inline-flex items-center gap-2 rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted", children: "Contactanos" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "mt-12 grid max-w-md grid-cols-3 gap-6", children: [{
          end: 15,
          prefix: "+",
          suffix: "",
          v: "Años",
          color: "var(--brand-teal)"
        }, {
          end: 500,
          prefix: "+",
          suffix: "",
          v: "Modelos",
          color: "var(--brand-pink)"
        }, {
          end: 100,
          prefix: "",
          suffix: "%",
          v: "Calidad",
          color: "var(--brand-yellow)"
        }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-2xl font-black", style: {
            color: s.color
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCounter, { end: s.end, prefix: s.prefix, suffix: s.suffix }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 text-xs uppercase tracking-wider text-muted-foreground", children: s.v })
        ] }, s.v)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Ambiente moderno con piso de madera natural", width: 1600, height: 1024, className: "aspect-[4/3] w-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute -bottom-6 -left-6 hidden rounded-xl border border-border bg-background p-4 shadow-xl sm:block transition-all duration-1000 delay-[400ms] ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-pink)]/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { size: 20, className: "text-[var(--brand-pink)]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Garantía oficial" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "En todos nuestros productos" })
          ] })
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-border bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8", children: [{
      Icon: ShieldCheck,
      color: "var(--brand-teal)",
      t: "Calidad certificada",
      d: "Productos de primeras marcas con garantía."
    }, {
      Icon: Truck,
      color: "var(--brand-pink)",
      t: "Envíos a todo el país",
      d: "Logística rápida y segura."
    }, {
      Icon: Sparkles,
      color: "var(--brand-yellow)",
      t: "Asesoramiento",
      d: "Te ayudamos a elegir el piso ideal."
    }, {
      Icon: Award,
      color: "var(--brand-teal)",
      t: "Experiencia",
      d: "Más de 15 años renovando hogares."
    }].map(({
      Icon,
      color,
      t,
      d
    }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `group relative overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-700 ease-out hover:border-border/80 hover:shadow-md ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`, style: {
      transitionDelay: isLoaded ? `${400 + i * 150}ms` : "0ms"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-[70%]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold", children: t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: d })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-4 top-1/2 z-0 -translate-y-1/2 opacity-30 transition-all duration-500 group-hover:scale-110 group-hover:opacity-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 72, style: {
        color
      }, strokeWidth: 1.5 }) })
    ] }, t)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FadeInSection, { className: "flex flex-wrap items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-[var(--brand-pink)]", children: "Destacados" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-3xl font-black tracking-tight sm:text-4xl", children: "Productos seleccionados" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-xl text-muted-foreground", children: "Conocé algunos de nuestros pisos más elegidos por nuestros clientes." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/catalogo", className: "inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-pink)] hover:underline", children: [
          "Ver todo el catálogo ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: featured.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FadeInSection, { delay: i * 200, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }) }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-4 pb-20 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FadeInSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl overflow-hidden rounded-2xl border border-border bg-foreground px-8 py-14 text-background sm:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black tracking-tight sm:text-4xl", children: "¿Listo para renovar tu hogar?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-background/70", children: "Escribinos y recibí asesoramiento personalizado sobre el piso ideal para tu espacio." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 lg:justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contacto", className: "inline-flex items-center gap-2 rounded-md bg-[var(--brand-teal)] px-6 py-3 text-sm font-semibold text-white hover:brightness-110", children: [
          "Contactanos ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/catalogo", className: "inline-flex items-center gap-2 rounded-md border border-background/20 bg-transparent px-6 py-3 text-sm font-semibold text-background hover:bg-background/10", children: "Ver catálogo" })
      ] })
    ] }) }) }) })
  ] });
}
export {
  HomePage as component
};
