import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--brand-teal)] font-black text-white">
              T
            </span>
            <span className="text-lg font-black">TPH</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Especialistas en pisos para el hogar. Calidad, variedad y asesoría profesional para
            transformar tus espacios.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Navegación</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Inicio</Link></li>
            <li><Link to="/catalogo" className="hover:text-foreground">Catálogo</Link></li>
            <li><Link to="/contacto" className="hover:text-foreground">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Contacto</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-[var(--brand-pink)]" />
              Av. Principal 1234, Ciudad
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-[var(--brand-teal)]" />
              +54 9 11 1234-5678
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-[var(--brand-yellow)]" />
              ventas@tph.com
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Horarios</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Clock size={16} className="text-[var(--brand-teal)]" />
              Lun a Vie: 9:00 – 18:00
            </li>
            <li className="pl-6">Sábados: 9:00 – 13:00</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} TPH — Todo para tu Hogar. Todos los derechos reservados.</p>
          <div className="flex gap-1">
            <span className="h-1.5 w-6 rounded-full bg-[var(--brand-teal)]" />
            <span className="h-1.5 w-6 rounded-full bg-[var(--brand-pink)]" />
            <span className="h-1.5 w-6 rounded-full bg-[var(--brand-yellow)]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
