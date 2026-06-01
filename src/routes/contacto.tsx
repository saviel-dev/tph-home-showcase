import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — TPH" },
      { name: "description", content: "Contactá a TPH: dirección, horarios, teléfono, WhatsApp y formulario para cotizar tus pisos." },
      { property: "og:title", content: "Contacto — TPH" },
      { property: "og:description", content: "Estamos para ayudarte. Escribinos y cotizá tus pisos." },
    ],
  }),
  component: ContactPage,
});

const WA = "541112345678";

function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const text = `Hola TPH, soy ${fd.get("name")}.\nTel: ${fd.get("phone")}\nEmail: ${fd.get("email")}\n\n${fd.get("message")}`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
  }

  return (
    <>
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-pink)]">
            Contacto
          </span>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
            Estamos para ayudarte
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Contactanos por el medio que prefieras. Te asesoramos para que elijas el piso ideal
            para tu hogar.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
        {/* Info */}
        <div className="space-y-4">
          <InfoCard
            Icon={MapPin}
            color="var(--brand-pink)"
            title="Dirección"
            text="Av. Principal 1234, Ciudad — CP 1000"
          />
          <InfoCard
            Icon={Phone}
            color="var(--brand-teal)"
            title="Teléfono"
            text="+54 9 11 1234-5678"
            href="tel:+5491112345678"
          />
          <InfoCard
            Icon={Mail}
            color="var(--brand-yellow)"
            title="Email"
            text="ventas@tph.com"
            href="mailto:ventas@tph.com"
          />
          <InfoCard
            Icon={Clock}
            color="var(--brand-teal)"
            title="Horarios"
            text={"Lun a Vie: 9:00 – 18:00\nSábados: 9:00 – 13:00"}
          />

          <a
            href={`https://wa.me/${WA}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--whatsapp)] px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
          >
            <MessageCircle size={18} /> Escribinos por WhatsApp
          </a>

          <div className="overflow-hidden rounded-xl border border-border">
            <iframe
              title="Ubicación TPH"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-58.4173%2C-34.6118%2C-58.3673%2C-34.5818&layer=mapnik"
              className="h-64 w-full"
              loading="lazy"
            />
          </div>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
          <h2 className="text-2xl font-black tracking-tight">Cotizá tus pisos</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Completá el formulario y te contactamos a la brevedad.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nombre" name="name" required />
              <Field label="Teléfono" name="phone" type="tel" required />
            </div>
            <Field label="Email" name="email" type="email" required />
            <div>
              <label className="text-sm font-medium" htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Contanos sobre tu proyecto: m², ambientes, preferencias…"
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-[var(--brand-teal)] focus:ring-2 focus:ring-[var(--brand-teal)]/30"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--brand-teal)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 sm:w-auto"
            >
              <Send size={16} /> Enviar consulta
            </button>

            {sent && (
              <p className="text-sm text-[var(--brand-teal)]">
                ¡Listo! Se abrió WhatsApp con tu mensaje. Si no se abrió, escribinos al
                +54 9 11 1234-5678.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

function Field({
  label, name, type = "text", required,
}: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-[var(--brand-teal)] focus:ring-2 focus:ring-[var(--brand-teal)]/30"
      />
    </div>
  );
}

function InfoCard({
  Icon, color, title, text, href,
}: { Icon: typeof MapPin; color: string; title: string; text: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-background p-5 transition hover:border-foreground/20">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${color}1a` }}
      >
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="mt-0.5 whitespace-pre-line text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}
