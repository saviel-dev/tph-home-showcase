import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, Facebook } from "lucide-react";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="TPH Logo" className="h-10 w-auto object-contain drop-shadow-sm" />
            <div className="flex flex-col">
              <span className="text-base font-black uppercase tracking-wider text-foreground sm:text-lg">
                Todo para tu hogar
              </span>
            </div>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Especialistas en pisos para el hogar. Calidad, variedad y asesoría profesional para
            transformar tus espacios.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a
              href="https://www.facebook.com/tbhogarimperial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-[#1877F2] hover:text-[#1877F2] hover:shadow-sm"
              aria-label="Facebook TPH"
            >
              <Facebook size={20} />
            </a>
          </div>
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
              +56 9 1234 5678
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
