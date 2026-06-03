import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto y Presupuestos — TPH" },
      { name: "description", content: "Contactá a TPH: te asesoramos y cotizamos los pisos para tu proyecto. Conocé nuestra dirección, horarios, teléfono y WhatsApp directo." },
      { name: "keywords", content: "contacto tph, cotizar pisos, presupuesto pisos laminados, direccion tph, atencion al cliente" },
      { property: "og:title", content: "Contacto y Presupuestos — TPH" },
      { property: "og:description", content: "Estamos para ayudarte. Escribinos y cotizá tus pisos hoy mismo." },
    ],
  }),
  component: ContactPage,
});

const WA = "584122865550";

/* ─── Types ─── */
type FieldErrors = Partial<Record<"name" | "phone" | "email" | "message", string>>;

/* ─── Validation helpers ─── */
function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}
function validatePhone(v: string) {
  return /^[\d\s\+\-\(\)]{7,20}$/.test(v.trim());
}

function validateForm(fd: FormData): FieldErrors {
  const errors: FieldErrors = {};

  const name = String(fd.get("name") ?? "").trim();
  const phone = String(fd.get("phone") ?? "").trim();
  const email = String(fd.get("email") ?? "").trim();
  const message = String(fd.get("message") ?? "").trim();

  if (!name || name.length < 2) errors.name = "Ingresá tu nombre completo (mín. 2 caracteres).";
  if (!phone || !validatePhone(phone)) errors.phone = "Ingresá un número de teléfono válido.";
  if (!email || !validateEmail(email)) errors.email = "Ingresá un email válido (ej: nombre@dominio.com).";
  if (!message || message.length < 10) errors.message = "El mensaje debe tener al menos 10 caracteres.";

  return errors;
}

/* ─── Page ─── */
function ContactPage() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const validationErrors = validateForm(fd);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    setServerError(false);

    try {
      const res = await fetch("https://formsubmit.co/ajax/saviel.dev@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      if (res.ok) {
        setSent(true);
        form.reset();
      } else {
        setServerError(true);
      }
    } catch {
      setServerError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* HERO COMPACTO */}
      <section className="relative border-b border-border bg-[#0d0f11] overflow-hidden">
        {/* Animated orbs */}
        <div className="hero-orb hero-orb-1" style={{ width: 420, height: 420, background: "#01c3cd", opacity: 0.13, top: "-80px", right: "10%" }} />
        <div className="hero-orb hero-orb-2" style={{ width: 300, height: 300, background: "#ff0084", opacity: 0.10, bottom: "-60px", left: "5%" }} />
        <div className="hero-orb hero-orb-3" style={{ width: 240, height: 240, background: "#ffbe00", opacity: 0.08, top: "20px", left: "40%" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="inline-block rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[var(--brand-pink)] shadow-sm">
                Contacto
              </span>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Hablemos de tu proyecto
              </h1>
              <p className="mt-2 text-sm text-white/50 max-w-md">
                Respondemos en el día. Elegí el canal que prefieras.
              </p>
            </div>
            <a
              href={`https://wa.me/${WA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex shrink-0 items-center gap-2 rounded-xl bg-[#25d366] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
            >
              <ion-icon name="logo-whatsapp" style={{ fontSize: "18px" }}></ion-icon>
              WhatsApp directo
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[380px_1fr] lg:px-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">

        {/* INFO */}
        <div className="space-y-3">
          <div className="rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border">
            <InfoRow Icon={MapPin} color="var(--brand-pink)" label="Dirección" value="Av. Principal 1234, Ciudad — CP 1000" />
            <InfoRow Icon={Phone} color="var(--whatsapp)" label="Teléfono" value="+54 9 11 1234-5678" href="tel:+5491112345678" />
            <InfoRow Icon={Mail} color="var(--brand-yellow)" label="Email" value="ventas@tph.com" href="mailto:ventas@tph.com" />
            <InfoRow Icon={Clock} color="var(--brand-teal)" label="Horarios" value="Lun–Vie 9:00–18:00 · Sáb 9:00–13:00" />
          </div>
          <div className="overflow-hidden rounded-2xl border border-border" style={{ height: "208px" }}>
            <div className="relative w-full" style={{ height: "calc(208px + 40px)", marginBottom: "-40px" }}>
              <iframe
                title="Ubicación TPH"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-58.4173%2C-34.6118%2C-58.3673%2C-34.5818&layer=mapnik&marker=-34.5968%2C-58.3923"
                className="absolute inset-0 h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="rounded-2xl border border-white/10 bg-[#111315] p-6 sm:p-8 text-white shadow-xl">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-black tracking-tight text-white">Cotizá sin compromiso</h2>
              <p className="mt-1 text-sm text-white/60">El formulario llega directamente a nuestro equipo.</p>
            </div>
            <Send size={20} className="mt-1 shrink-0 text-[var(--brand-teal)]" />
          </div>

          {sent ? (
            <div className="flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/10 py-14 text-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-teal)]/20">
                <CheckCircle2 size={26} className="text-[var(--brand-teal)]" />
              </div>
              <p className="text-base font-bold text-white">¡Consulta enviada con éxito!</p>
              <p className="text-sm text-white/60 max-w-xs">
                Recibimos tu mensaje y te responderemos pronto a tu email.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-2 text-xs font-semibold text-[var(--brand-teal)] underline underline-offset-2 hover:opacity-70 transition"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* FormSubmit config (hidden) */}
              <input type="hidden" name="_subject" value="Nueva consulta desde TPH Web" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Nombre completo"
                  name="name"
                  placeholder="Ej: Juan García"
                  error={errors.name}
                  onChange={() => setErrors(p => ({ ...p, name: undefined }))}
                />
                <Field
                  label="Teléfono"
                  name="phone"
                  type="tel"
                  placeholder="Ej: +54 9 11 1234-5678"
                  error={errors.phone}
                  onChange={() => setErrors(p => ({ ...p, phone: undefined }))}
                />
              </div>

              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="Ej: nombre@dominio.com"
                error={errors.email}
                onChange={() => setErrors(p => ({ ...p, email: undefined }))}
              />

              {/* Textarea */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-white/60" htmlFor="message">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Contanos sobre tu proyecto: m², ambientes, tipo de piso que buscás…"
                  onChange={() => setErrors(p => ({ ...p, message: undefined }))}
                  className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-white/30 resize-none focus:ring-2 ${
                    errors.message
                      ? "border-red-500/50 bg-red-500/10 focus:border-red-500 focus:ring-red-500/20 text-white"
                      : "border-white/10 bg-white/5 text-white focus:border-[var(--brand-teal)] focus:bg-white/10 focus:ring-[var(--brand-teal)]/20"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle size={11} /> {errors.message}
                  </p>
                )}
              </div>

              {serverError && (
                <div className="flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  <AlertCircle size={15} />
                  Ocurrió un error al enviar. Intentá de nuevo o escribinos por WhatsApp.
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand-teal)] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:brightness-110 hover:shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Enviando…
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Enviar consulta
                    <ArrowRight size={14} className="ml-auto transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

/* ─── Field component ─── */
function Field({
  label, name, type = "text", placeholder, error, onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  onChange?: () => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-semibold uppercase tracking-wider text-white/60">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className={`mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition placeholder:text-white/30 focus:ring-2 ${
          error
            ? "border-red-500/50 bg-red-500/10 focus:border-red-500 focus:ring-red-500/20 text-white"
            : "border-white/10 bg-white/5 text-white focus:border-[var(--brand-teal)] focus:bg-white/10 focus:ring-[var(--brand-teal)]/20"
        }`}
      />
      {error && (
        <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

/* ─── InfoRow component ─── */
function InfoRow({
  Icon, label, value, href, color = "var(--brand-teal)"
}: { Icon: typeof MapPin; label: string; value: string; href?: string; color?: string }) {
  const content = (
    <div className="flex items-center gap-3 px-4 py-3.5 transition hover:bg-muted/40 group">
      <div 
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon size={15} style={{ color }} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium text-foreground">{value}</p>
      </div>
      {href && <ArrowRight size={13} className="ml-auto shrink-0 text-muted-foreground/50 transition group-hover:translate-x-0.5 group-hover:text-foreground/60" />}
    </div>
  );
  return href ? <a href={href}>{content}</a> : <div>{content}</div>;
}
