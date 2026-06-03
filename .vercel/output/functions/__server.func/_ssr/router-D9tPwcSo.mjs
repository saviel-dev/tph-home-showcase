import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, L as Link } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { R as Root, T as Trigger, P as Portal, C as Content, a as Close, b as Title, O as Overlay, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { X, M as Menu, F as Facebook, a as MapPin, P as Phone, b as Mail, C as Clock, S as ShoppingBag, c as Minus, d as Plus, T as Trash2 } from "../_libs/lucide-react.mjs";
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
const appCss = "/assets/styles-DEEpwqVB.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const CartContext = reactExports.createContext(void 0);
function CartProvider({ children }) {
  const [items, setItems] = reactExports.useState([]);
  const [isMounted, setIsMounted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("tph-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);
  reactExports.useEffect(() => {
    if (isMounted) {
      localStorage.setItem("tph-cart", JSON.stringify(items));
    }
  }, [items, isMounted]);
  const addItem = (product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        return currentItems.map(
          (item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentItems, { ...product, quantity: 1 }];
    });
  };
  const removeItem = (productId) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  };
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(
      (currentItems) => currentItems.map((item) => item.id === productId ? { ...item, quantity } : item)
    );
  };
  const clearCart = () => {
    setItems([]);
  };
  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CartContext.Provider,
    {
      value: { items, addItem, removeItem, updateQuantity, clearCart, cartTotal, itemCount },
      children
    }
  );
}
function useCart() {
  const context = reactExports.useContext(CartContext);
  if (context === void 0) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Sheet = Root;
const SheetTrigger = Trigger;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 p-2 sm:p-0 sm:right-4 sm:top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary z-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-6 w-6 sm:h-4 sm:w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
SheetFooter.displayName = "SheetFooter";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
function AnimatedTotal({ total }) {
  const prevTotalRef = reactExports.useRef(total);
  const [floatingNumbers, setFloatingNumbers] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (total !== prevTotalRef.current) {
      const diff = total - prevTotalRef.current;
      if (diff !== 0) {
        const id = Date.now() + Math.random();
        setFloatingNumbers((prev) => [...prev, { id, diff }]);
        setTimeout(() => {
          setFloatingNumbers((prev) => prev.filter((n) => n.id !== id));
        }, 1200);
      }
      prevTotalRef.current = total;
    }
  }, [total]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes cartFloatUp {
          0% { opacity: 0; transform: translateY(0) scale(0.8); }
          15% { opacity: 0.7; transform: translateY(-15px) scale(1.2); }
          100% { opacity: 0; transform: translateY(-45px) scale(1); }
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-black text-foreground drop-shadow-sm transition-all", children: [
      "$",
      total.toLocaleString("es-CL")
    ] }),
    floatingNumbers.map((num) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: `absolute right-0 top-0 text-xl font-black drop-shadow-md pointer-events-none ${num.diff > 0 ? "text-green-500/80" : "text-red-500/80"}`,
        style: { animation: "cartFloatUp 1.2s ease-out forwards" },
        children: [
          num.diff > 0 ? "+" : "-",
          "$",
          Math.abs(num.diff).toLocaleString("es-CL")
        ]
      },
      num.id
    ))
  ] });
}
function CartSheet() {
  const { items, removeItem, updateQuantity, cartTotal, itemCount } = useCart();
  const handleCheckout = () => {
    if (items.length === 0) return;
    let message = "Hola TPH, quiero realizar el siguiente pedido:\n\n";
    items.forEach((item) => {
      message += `- ${item.quantity}x ${item.name} ($${item.price.toLocaleString("es-CL")})
`;
    });
    message += `
Total estimado: $${cartTotal.toLocaleString("es-CL")}`;
    const url = `https://wa.me/56912345678?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-muted transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 22, className: "text-foreground" }),
      itemCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--brand-teal)] text-[10px] font-bold text-white", children: itemCount })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { className: "flex w-full flex-col sm:max-w-md p-0 bg-slate-50/80 [&>button]:text-white [&>button]:hover:bg-white/10 [&>button]:hover:opacity-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "bg-[#111315] p-6 pt-5 text-white sm:p-8 shadow-md relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "flex items-center gap-2 text-2xl font-black tracking-tight text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 24, className: "text-[var(--brand-teal)]" }),
        "Tu Carrito"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto px-4 py-6 sm:px-6", children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col items-center justify-center space-y-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-muted p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 48, className: "text-muted-foreground opacity-50" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium text-muted-foreground", children: "Tu carrito está vacío" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "group relative flex gap-4 rounded-2xl border border-border/50 bg-card p-3 shadow-sm transition-all hover:shadow-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: item.image,
            alt: item.name,
            className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col justify-between py-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pr-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-sm leading-tight text-foreground line-clamp-2", children: item.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm font-semibold text-[var(--brand-teal)]", children: [
              "$",
              item.price.toLocaleString("es-CL"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-normal text-muted-foreground", children: "/m²" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-full bg-muted/50 px-3 py-1.5 shadow-sm border border-border/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => updateQuantity(item.id, item.quantity - 1),
                  className: "flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-transform hover:scale-110",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 12, strokeWidth: 3 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 text-center text-sm font-bold", children: item.quantity }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => updateQuantity(item.id, item.quantity + 1),
                  className: "flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-transform hover:scale-110",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12, strokeWidth: 3 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => removeItem(item.id),
                className: "flex items-center gap-1.5 cursor-pointer rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-200 hover:text-red-700",
                "aria-label": "Eliminar producto",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 }),
                  "Eliminar"
                ]
              }
            )
          ] })
        ] })
      ] }, item.id)) }) }),
      items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetFooter, { className: "flex flex-col gap-5 sm:flex-col border-t border-border/50 bg-background p-4 sm:p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider", children: "Total Estimado" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedTotal, { total: cartTotal })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleCheckout,
            className: "group relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--brand-teal)] to-teal-500 py-4 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 18, className: "relative z-10" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10", children: "Concretar pedido por whatsApp" })
            ]
          }
        )
      ] })
    ] })
  ] });
}
const logo = "/assets/logo-C8JfDsgF.png";
const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/contacto", label: "Contacto" }
];
function SiteHeader() {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3 transition-transform hover:scale-[1.02]", onClick: () => setOpen(false), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "TPH Logo", className: "h-10 w-auto object-contain drop-shadow-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-black uppercase tracking-wider text-foreground sm:text-lg", children: "Todo para tu hogar" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden items-center gap-8 md:flex", children: [
        navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: item.to,
            activeOptions: { exact: item.to === "/" },
            className: "relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground data-[status=active]:text-foreground",
            children: ({ isActive }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              item.label,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `absolute -bottom-1 left-0 h-0.5 bg-[var(--brand-teal)] transition-all ${isActive ? "w-full" : "w-0"}`
                }
              )
            ] })
          },
          item.to
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartSheet, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/contacto",
              className: "rounded-md bg-[var(--brand-teal)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110",
              children: "Cotizar ahora"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 md:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartSheet, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "rounded-md p-2",
            onClick: () => setOpen((v) => !v),
            "aria-label": "Menú",
            children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 22 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 22 })
          }
        )
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6", children: [
      navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: item.to,
          activeOptions: { exact: item.to === "/" },
          onClick: () => setOpen(false),
          className: "rounded-md px-3 py-3 text-sm font-medium hover:bg-muted data-[status=active]:text-[var(--brand-teal)]",
          children: item.label
        },
        item.to
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/contacto",
          onClick: () => setOpen(false),
          className: "mt-2 rounded-md bg-[var(--brand-teal)] px-4 py-3 text-center text-sm font-semibold text-white",
          children: "Cotizar ahora"
        }
      )
    ] }) })
  ] });
}
function SiteFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-border bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "TPH Logo", className: "h-10 w-auto object-contain drop-shadow-sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-black uppercase tracking-wider text-foreground sm:text-lg", children: "Todo para tu hogar" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm leading-relaxed text-muted-foreground", children: "Especialistas en pisos para el hogar. Calidad, variedad y asesoría profesional para transformar tus espacios." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex items-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "https://www.facebook.com/tbhogarimperial",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-[#1877F2] hover:text-[#1877F2] hover:shadow-sm",
            "aria-label": "Facebook TPH",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { size: 20 })
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold uppercase tracking-wider", children: "Navegación" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground", children: "Inicio" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/catalogo", className: "hover:text-foreground", children: "Catálogo" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contacto", className: "hover:text-foreground", children: "Contacto" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold uppercase tracking-wider", children: "Contacto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-3 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16, className: "mt-0.5 text-[var(--brand-pink)]" }),
            "Av. Principal 1234, Ciudad"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 16, className: "text-[var(--brand-teal)]" }),
            "+56 9 1234 5678"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 16, className: "text-[var(--brand-yellow)]" }),
            "ventas@tph.com"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold uppercase tracking-wider", children: "Horarios" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 16, className: "text-[var(--brand-teal)]" }),
            "Lun a Vie: 9:00 – 18:00"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "pl-6", children: "Sábados: 9:00 – 13:00" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " TPH — Todo para tu Hogar. Todos los derechos reservados."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-6 rounded-full bg-[var(--brand-teal)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-6 rounded-full bg-[var(--brand-pink)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-6 rounded-full bg-[var(--brand-yellow)]" })
      ] })
    ] }) })
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Página no encontrada" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "La página que buscas no existe o fue movida." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: "/",
        className: "mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
        children: "Volver al inicio"
      }
    )
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Esta página no cargó" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Algo salió mal. Intenta recargar o vuelve al inicio." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
          children: "Reintentar"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent",
          children: "Ir al inicio"
        }
      )
    ] })
  ] }) });
}
const Route$3 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TPH — Todo para tu Hogar | Pisos y Revestimientos" },
      { name: "description", content: "Descubrí la mejor calidad en pisos laminados, vinílicos, porcelanatos, cerámicos y SPC. Transformamos tus espacios con estilo y durabilidad." },
      { name: "keywords", content: "pisos, porcelanatos, laminados, vinílicos, spc, revestimientos, decoración, hogar" },
      { name: "author", content: "TPH" },
      { property: "og:title", content: "TPH — Todo para tu Hogar" },
      { property: "og:description", content: "Pisos y revestimientos de primera calidad para tu hogar." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "TPH" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "TPH — Todo para tu Hogar" },
      { name: "twitter:description", content: "Pisos y revestimientos de primera calidad para tu hogar." }
    ],
    links: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "es", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { type: "module", src: "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { noModule: true, src: "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$3.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CartProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] }) }) });
}
const $$splitComponentImporter$2 = () => import("./contacto-DPWGfzca.mjs");
const Route$2 = createFileRoute("/contacto")({
  head: () => ({
    meta: [{
      title: "Contacto y Presupuestos — TPH"
    }, {
      name: "description",
      content: "Contactá a TPH: te asesoramos y cotizamos los pisos para tu proyecto. Conocé nuestra dirección, horarios, teléfono y WhatsApp directo."
    }, {
      name: "keywords",
      content: "contacto tph, cotizar pisos, presupuesto pisos laminados, direccion tph, atencion al cliente"
    }, {
      property: "og:title",
      content: "Contacto y Presupuestos — TPH"
    }, {
      property: "og:description",
      content: "Estamos para ayudarte. Escribinos y cotizá tus pisos hoy mismo."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./catalogo-pFN5TqY1.mjs");
const Route$1 = createFileRoute("/catalogo")({
  head: () => ({
    meta: [{
      title: "Catálogo de Pisos y Revestimientos — TPH"
    }, {
      name: "description",
      content: "Explorá el catálogo TPH: pisos laminados, vinílicos, porcelanatos, SPC y cerámicos con precios, características y medidas."
    }, {
      name: "keywords",
      content: "catalogo pisos, precios pisos laminados, porcelanatos medidas, pisos spc, revestimientos"
    }, {
      property: "og:title",
      content: "Catálogo de Pisos y Revestimientos — TPH"
    }, {
      property: "og:description",
      content: "Explorá nuestro catálogo completo con precios y medidas."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-BJi0i1If.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "TPH — Todo para tu Hogar | Especialistas en Pisos y Revestimientos"
    }, {
      name: "description",
      content: "En TPH somos especialistas en pisos para tu hogar: laminados, vinílicos, porcelanatos, cerámicos y SPC. Renovamos tus espacios con la mejor calidad."
    }, {
      name: "keywords",
      content: "pisos laminados, pisos vinilicos, porcelanatos, ceramicos, pisos spc, tph pisos, inicio"
    }, {
      property: "og:title",
      content: "TPH — Especialistas en Pisos y Revestimientos"
    }, {
      property: "og:description",
      content: "En TPH somos especialistas en pisos para tu hogar. Renovamos tus espacios con la mejor calidad."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ContactoRoute = Route$2.update({
  id: "/contacto",
  path: "/contacto",
  getParentRoute: () => Route$3
});
const CatalogoRoute = Route$1.update({
  id: "/catalogo",
  path: "/catalogo",
  getParentRoute: () => Route$3
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$3
});
const rootRouteChildren = {
  IndexRoute,
  CatalogoRoute,
  ContactoRoute
};
const routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  router as r,
  useCart as u
};
