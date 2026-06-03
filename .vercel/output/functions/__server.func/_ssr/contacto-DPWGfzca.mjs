import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as ArrowRight, a as MapPin, P as Phone, b as Mail, C as Clock, e as Send, f as CircleCheck, g as CircleAlert } from "../_libs/lucide-react.mjs";
const WA = "56912345678";
function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}
function validatePhone(v) {
  return /^[\d\s\+\-\(\)]{7,20}$/.test(v.trim());
}
function validateForm(fd) {
  const errors = {};
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
function ContactPage() {
  const [errors, setErrors] = reactExports.useState({});
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [sent, setSent] = reactExports.useState(false);
  const [serverError, setServerError] = reactExports.useState(false);
  async function handleSubmit(e) {
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
        headers: {
          Accept: "application/json"
        },
        body: fd
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative border-b border-border bg-[#0d0f11] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--brand-teal)/12%,transparent_60%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[var(--brand-pink)] shadow-sm", children: "Contacto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl", children: "Hablemos de tu proyecto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-white/50 max-w-md", children: "Respondemos en el día. Elegí el canal que prefieras." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/${WA}`, target: "_blank", rel: "noopener noreferrer", className: "group flex shrink-0 items-center gap-2 rounded-xl bg-[#25d366] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("ion-icon", { name: "logo-whatsapp", style: {
            fontSize: "18px"
          } }),
          "WhatsApp directo",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 15, className: "transition-transform group-hover:translate-x-1" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[380px_1fr] lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { Icon: MapPin, color: "var(--brand-pink)", label: "Dirección", value: "Av. Principal 1234, Ciudad — CP 1000" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { Icon: Phone, color: "var(--whatsapp)", label: "Teléfono", value: "+54 9 11 1234-5678", href: "tel:+5491112345678" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { Icon: Mail, color: "var(--brand-yellow)", label: "Email", value: "ventas@tph.com", href: "mailto:ventas@tph.com" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { Icon: Clock, color: "var(--brand-teal)", label: "Horarios", value: "Lun–Vie 9:00–18:00 · Sáb 9:00–13:00" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { title: "Ubicación TPH", src: "https://www.openstreetmap.org/export/embed.html?bbox=-58.4173%2C-34.6118%2C-58.3673%2C-34.5818&layer=mapnik&marker=-34.5968%2C-58.3923", className: "h-52 w-full", loading: "lazy" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/10 bg-[#111315] p-6 sm:p-8 text-white shadow-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black tracking-tight text-white", children: "Cotizá sin compromiso" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/60", children: "El formulario llega directamente a nuestro equipo." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 20, className: "mt-1 shrink-0 text-[var(--brand-teal)]" })
        ] }),
        sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/10 py-14 text-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-teal)]/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 26, className: "text-[var(--brand-teal)]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-white", children: "¡Consulta enviada con éxito!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/60 max-w-xs", children: "Recibimos tu mensaje y te responderemos pronto a tu email." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSent(false), className: "mt-2 text-xs font-semibold text-[var(--brand-teal)] underline underline-offset-2 hover:opacity-70 transition", children: "Enviar otro mensaje" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", name: "_subject", value: "Nueva consulta desde TPH Web" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", name: "_template", value: "table" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", name: "_captcha", value: "false" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nombre completo", name: "name", placeholder: "Ej: Juan García", error: errors.name, onChange: () => setErrors((p) => ({
              ...p,
              name: void 0
            })) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Teléfono", name: "phone", type: "tel", placeholder: "Ej: +54 9 11 1234-5678", error: errors.phone, onChange: () => setErrors((p) => ({
              ...p,
              phone: void 0
            })) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", name: "email", type: "email", placeholder: "Ej: nombre@dominio.com", error: errors.email, onChange: () => setErrors((p) => ({
            ...p,
            email: void 0
          })) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-white/60", htmlFor: "message", children: "Mensaje" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "message", name: "message", rows: 4, placeholder: "Contanos sobre tu proyecto: m², ambientes, tipo de piso que buscás…", onChange: () => setErrors((p) => ({
              ...p,
              message: void 0
            })), className: `mt-1.5 w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-white/30 resize-none focus:ring-2 ${errors.message ? "border-red-500/50 bg-red-500/10 focus:border-red-500 focus:ring-red-500/20 text-white" : "border-white/10 bg-white/5 text-white focus:border-[var(--brand-teal)] focus:bg-white/10 focus:ring-[var(--brand-teal)]/20"}` }),
            errors.message && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1 text-xs text-red-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 11 }),
              " ",
              errors.message
            ] })
          ] }),
          serverError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 15 }),
            "Ocurrió un error al enviar. Intentá de nuevo o escribinos por WhatsApp."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: submitting, className: "group flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand-teal)] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:brightness-110 hover:shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed", children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" }),
            "Enviando…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 15 }),
            "Enviar consulta",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14, className: "ml-auto transition-transform group-hover:translate-x-1" })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: name, className: "text-xs font-semibold uppercase tracking-wider text-white/60", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: name, name, type, placeholder, onChange, className: `mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition placeholder:text-white/30 focus:ring-2 ${error ? "border-red-500/50 bg-red-500/10 focus:border-red-500 focus:ring-red-500/20 text-white" : "border-white/10 bg-white/5 text-white focus:border-[var(--brand-teal)] focus:bg-white/10 focus:ring-[var(--brand-teal)]/20"}` }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1 text-xs text-red-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 11 }),
      " ",
      error
    ] })
  ] });
}
function InfoRow({
  Icon,
  label,
  value,
  href,
  color = "var(--brand-teal)"
}) {
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3.5 transition hover:bg-muted/40 group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", style: {
      backgroundColor: `${color}15`
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 15, style: {
      color
    } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium text-foreground", children: value })
    ] }),
    href && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 13, className: "ml-auto shrink-0 text-muted-foreground/50 transition group-hover:translate-x-0.5 group-hover:text-foreground/60" })
  ] });
  return href ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href, children: content }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: content });
}
export {
  ContactPage as component
};
