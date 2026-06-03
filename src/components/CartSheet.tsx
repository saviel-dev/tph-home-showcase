import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

type FloatingNumber = {
  id: number;
  diff: number;
};

function AnimatedTotal({ total }: { total: number }) {
  const prevTotalRef = useRef(total);
  const [floatingNumbers, setFloatingNumbers] = useState<FloatingNumber[]>([]);

  useEffect(() => {
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

  return (
    <div className="relative flex items-center">
      <style>{`
        @keyframes cartFloatUp {
          0% { opacity: 0; transform: translateY(0) scale(0.8); }
          15% { opacity: 0.7; transform: translateY(-15px) scale(1.2); }
          100% { opacity: 0; transform: translateY(-45px) scale(1); }
        }
      `}</style>
      <span className="text-2xl font-black text-foreground drop-shadow-sm transition-all">
        ${total.toLocaleString("es-CL")}
      </span>
      {floatingNumbers.map((num) => (
        <span
          key={num.id}
          className={`absolute right-0 top-0 text-xl font-black drop-shadow-md pointer-events-none ${
            num.diff > 0 ? "text-green-500/80" : "text-red-500/80"
          }`}
          style={{ animation: "cartFloatUp 1.2s ease-out forwards" }}
        >
          {num.diff > 0 ? "+" : "-"}${Math.abs(num.diff).toLocaleString("es-CL")}
        </span>
      ))}
    </div>
  );
}

export function CartSheet() {
  const { items, removeItem, updateQuantity, cartTotal, itemCount } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    let message = "Hola TPH, quiero realizar el siguiente pedido:\n\n";
    items.forEach((item) => {
      message += `- ${item.quantity}x ${item.name} ($${item.price.toLocaleString("es-CL")})\n`;
    });
    message += `\nTotal estimado: $${cartTotal.toLocaleString("es-CL")}`;

    const url = `https://wa.me/584122865550?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-muted transition-colors">
          <ShoppingBag size={22} className="text-foreground" />
          {itemCount > 0 && (
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--brand-teal)] text-[10px] font-bold text-white">
              {itemCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md p-0 bg-slate-50/80 [&>button]:text-white [&>button]:hover:bg-white/10 [&>button]:hover:opacity-100">
        <SheetHeader className="bg-[#111315] p-6 pt-5 text-white sm:p-8 shadow-md relative z-10">
          <SheetTitle className="flex items-center gap-2 text-2xl font-black tracking-tight text-white">
            <ShoppingBag size={24} className="text-[var(--brand-teal)]" />
            Tu Carrito
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-muted p-4">
                <ShoppingBag size={48} className="text-muted-foreground opacity-50" />
              </div>
              <p className="text-lg font-medium text-muted-foreground">Tu carrito está vacío</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="group relative flex gap-4 rounded-2xl border border-border/50 bg-card p-3 shadow-sm transition-all hover:shadow-md">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="pr-6">
                      <h4 className="font-bold text-sm leading-tight text-foreground line-clamp-2">{item.name}</h4>
                      <p className="mt-1 text-sm font-semibold text-[var(--brand-teal)]">
                        ${item.price.toLocaleString("es-CL")} <span className="text-[10px] font-normal text-muted-foreground">/m²</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3 rounded-full bg-muted/50 px-3 py-1.5 shadow-sm border border-border/50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-transform hover:scale-110"
                        >
                          <Minus size={12} strokeWidth={3} />
                        </button>
                        <span className="w-5 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-transform hover:scale-110"
                        >
                          <Plus size={12} strokeWidth={3} />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1.5 cursor-pointer rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-200 hover:text-red-700"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 size={14} />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="flex flex-col gap-5 sm:flex-col border-t border-border/50 bg-background p-4 sm:p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-10">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Estimado</span>
              <AnimatedTotal total={cartTotal} />
            </div>
            <button
              onClick={handleCheckout}
              className="group relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--brand-teal)] to-teal-500 py-4 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
              <ShoppingBag size={18} className="relative z-10" />
              <span className="relative z-10">Concretar pedido por whatsApp</span>
            </button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
