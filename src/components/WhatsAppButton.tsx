import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "584122865550";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola TPH, me interesa conocer más sobre sus pisos."
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--whatsapp)] text-white shadow-lg shadow-black/20 transition hover:scale-105 hover:shadow-xl"
    >
      <MessageCircle size={26} strokeWidth={2.2} />
      <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-[var(--whatsapp)] opacity-40" />
    </a>
  );
}
