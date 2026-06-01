import { ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
  onAddToCart?: (product: Product) => void;
  showAction?: boolean;
};

export function ProductCard({ product, onAddToCart, showAction = true }: Props) {
  const handle = () => {
    if (onAddToCart) onAddToCart(product);
    else alert(`"${product.name}" agregado al carrito`);
  };

  return (
    <article className="group flex flex-col rounded-3xl bg-foreground p-3 text-background shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="overflow-hidden rounded-2xl bg-muted">
        <img
          src={product.image}
          alt={product.name}
          width={600}
          height={450}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="px-2 pb-1 pt-4">
        <h3 className="truncate text-base font-bold">{product.name}</h3>
        <p className="mt-0.5 text-xs text-background/60">
          {product.category} · {product.size}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between px-2 pb-2">
        <p className="text-xl font-black">
          ${product.price.toLocaleString("es-AR")}
          <span className="ml-1 text-[10px] font-medium text-background/60">/m²</span>
        </p>
        {showAction && (
          <button
            onClick={handle}
            aria-label={`Agregar ${product.name} al carrito`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground transition hover:bg-[var(--brand-teal)] hover:text-white"
          >
            <ShoppingBag size={18} />
          </button>
        )}
      </div>
    </article>
  );
}
