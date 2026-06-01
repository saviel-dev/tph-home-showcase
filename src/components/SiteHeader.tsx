import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--brand-teal)] font-black text-white">
            T
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-black tracking-tight">TPH</span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Todo para tu Hogar
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
          <Link
            to="/contacto"
            className="rounded-md bg-[var(--brand-teal)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
          >
            Cotizar ahora
          </Link>
        </nav>

        <button
          className="rounded-md p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
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
              to="/contacto"
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
