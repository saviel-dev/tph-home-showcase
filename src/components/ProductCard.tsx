import { useState } from "react";
import { ShoppingBag, Tag, Check } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/hooks/use-cart";

type Props = {
  product: Product;
  onAddToCart?: (product: Product) => void;
  showAction?: boolean;
};

export function ProductCard({ product, onAddToCart, showAction = true }: Props) {
  const { addItem } = useCart();

  const [added, setAdded] = useState(false);

  const handle = () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addItem(product);
    }
    
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <article className="group flex flex-col rounded-[24px] bg-[#111315] p-3 text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20">
      <div className="relative overflow-hidden rounded-[16px] bg-muted">
        <div className="absolute left-2 top-2 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white backdrop-blur-md">
          <Tag size={12} />
          {product.category}
        </div>
        <img
          src={product.image}
          alt={product.name}
          width={600}
          height={450}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      <div className="px-1 pb-1 pt-4">
        <h3 className="truncate text-base font-bold text-white">{product.name}</h3>
        <p className="mt-0.5 text-xs text-white/50">
          {product.category} · {product.size}
        </p>
      </div>

      <div className="mt-2 flex items-center justify-between px-1 pb-1">
        <p className="text-[22px] font-black tracking-tight text-white">
          ${product.price.toLocaleString("es-CL")}
          <span className="ml-1 text-[11px] font-bold text-[#e5a975]">/m²</span>
        </p>
        {showAction && (
          <button
            onClick={handle}
            aria-label={`Agregar ${product.name} al carrito`}
            disabled={added}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md transition-all duration-300 ${
              added
                ? "bg-green-500 scale-110 cursor-default"
                : "bg-[var(--brand-teal)] cursor-pointer hover:scale-110 hover:brightness-110"
            }`}
          >
            {added ? (
              <Check size={18} strokeWidth={3} className="animate-in zoom-in spin-in-90 duration-300" />
            ) : (
              <ShoppingBag size={18} strokeWidth={2.5} />
            )}
          </button>
        )}
      </div>
    </article>
  );
}
