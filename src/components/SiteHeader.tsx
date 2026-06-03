import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CartSheet } from "./CartSheet";
import logo from "@/assets/logo.png";

const navItems = [
  { to: "/" as const, label: "Inicio" },
  { to: "/catalogo" as const, label: "Catálogo" },
  { to: "/contacto" as const, label: "Contacto" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02]" onClick={() => setOpen(false)}>
          <img src={logo} alt="TPH Logo" className="h-10 w-auto object-contain drop-shadow-sm" />
          <div className="flex flex-col">
            <span className="text-base font-black uppercase tracking-wider text-foreground sm:text-lg">
              Todo para tu hogar
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground data-[status=active]:text-foreground"
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[var(--brand-teal)] transition-all ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </>
              )}
            </Link>
          ))}
          <div className="flex items-center gap-4">
            <CartSheet />
            <Link
              to="/cotizacion"
              className="rounded-lg bg-[var(--brand-teal)] px-5 py-2 text-sm font-bold text-white shadow-md transition-all hover:brightness-110 active:scale-95"
            >
              Cotizar ahora
            </Link>
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <CartSheet />
          <button
            className="rounded-md p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium hover:bg-muted data-[status=active]:text-[var(--brand-teal)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/cotizacion"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-[var(--brand-teal)] px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Cotizar ahora
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
