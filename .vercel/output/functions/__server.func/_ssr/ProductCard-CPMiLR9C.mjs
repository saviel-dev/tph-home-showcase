import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useCart } from "./router-D9tPwcSo.mjs";
import { q as Tag, r as Check, S as ShoppingBag } from "../_libs/lucide-react.mjs";
const floorOak = "/assets/floor-oak-RWdHVHcB.jpg";
const floorWalnut = "/assets/floor-walnut-BhnuQspW.jpg";
const floorPorcelain = "/assets/floor-porcelain-BHyRwB_C.jpg";
const floorMarble = "/assets/floor-marble-DpEVzT5p.jpg";
const floorVinyl = "/assets/floor-vinyl-BAJf97A4.jpg";
const floorSpc = "/assets/floor-spc-CIgH4X3K.jpg";
const ceramicHexagonal = "/assets/ceramic-hexagonal-Hcjcck2A.png";
const ceramicRustic = "/assets/ceramic-rustic-hDgLnNOy.png";
const laminatePineGrey = "/assets/laminate-pine-grey-D2Bxb0hQ.png";
const porcelainCarrara = "/assets/porcelain-carrara-CCNqclm6.png";
const porcelainWood = "/assets/porcelain-wood-DcU932yw.png";
const spcCherry = "/assets/spc-cherry-dnJUA2wa.png";
const vinylDarkCement = "/assets/vinyl-dark-cement-CCxNeOW8.png";
const products = [
  {
    id: "oak-natural",
    name: "Roble Natural",
    category: "Laminado",
    color: "Beige claro",
    size: "190 x 1380 mm",
    price: 12990,
    image: floorOak,
    description: "Laminado AC4 con apariencia de roble natural, ideal para ambientes luminosos."
  },
  {
    id: "walnut-premium",
    name: "Nogal Premium",
    category: "Laminado",
    color: "Marrón cálido",
    size: "195 x 1290 mm",
    price: 15490,
    image: floorWalnut,
    description: "Laminado de alta resistencia con veta profunda y tono nogal elegante."
  },
  {
    id: "porcelain-grey",
    name: "Porcelanato Concret",
    category: "Porcelanato",
    color: "Gris claro",
    size: "60 x 60 cm",
    price: 18990,
    image: floorPorcelain,
    description: "Porcelanato rectificado símil cemento, acabado mate antideslizante."
  },
  {
    id: "marble-calacatta",
    name: "Cerámico Calacatta",
    category: "Cerámico",
    color: "Blanco veteado",
    size: "45 x 45 cm",
    price: 9990,
    image: floorMarble,
    description: "Cerámico símil mármol, perfecto para baños y ambientes elegantes."
  },
  {
    id: "vinyl-sun",
    name: "Vinílico Sun Oak",
    category: "Vinílico",
    color: "Beige cálido",
    size: "180 x 1220 mm",
    price: 11490,
    image: floorVinyl,
    description: "Piso vinílico clic, 100% impermeable, instalación rápida y sin obra."
  },
  {
    id: "spc-stone",
    name: "SPC Stone Grey",
    category: "SPC",
    color: "Gris medio",
    size: "180 x 1220 mm",
    price: 16990,
    image: floorSpc,
    description: "Piso SPC con núcleo mineral, máxima estabilidad y resistencia al agua."
  },
  {
    id: "ceramic-hexagonal",
    name: "Cerámico Hexagonal Pastel",
    category: "Cerámico",
    color: "Tonos pastel",
    size: "20 x 20 cm",
    price: 13500,
    image: ceramicHexagonal,
    description: "Cerámico moderno de formato hexagonal en tonos pastel, ideal para cocinas y baños vanguardistas."
  },
  {
    id: "ceramic-rustic",
    name: "Cerámico Rústico Terracota",
    category: "Cerámico",
    color: "Terracota",
    size: "30 x 30 cm",
    price: 8900,
    image: ceramicRustic,
    description: "Cerámico rústico con acabado mate y textura natural, perfecto para galerías y exteriores techados."
  },
  {
    id: "laminate-pine-grey",
    name: "Laminado Pino Gris",
    category: "Laminado",
    color: "Gris pino",
    size: "190 x 1380 mm",
    price: 13490,
    image: laminatePineGrey,
    description: "Piso laminado AC4 con diseño de pino gris nórdico, resistente al desgaste y fácil de limpiar."
  },
  {
    id: "porcelain-carrara",
    name: "Porcelanato Carrara",
    category: "Porcelanato",
    color: "Blanco veteado",
    size: "60 x 120 cm",
    price: 24900,
    image: porcelainCarrara,
    description: "Porcelanato pulido gran formato símil mármol Carrara, otorga amplitud y sofisticación."
  },
  {
    id: "porcelain-wood",
    name: "Porcelanato Madera Roble",
    category: "Porcelanato",
    color: "Roble",
    size: "20 x 120 cm",
    price: 21500,
    image: porcelainWood,
    description: "Porcelanato listón símil madera natural, combina la calidez de la madera con la durabilidad del porcelanato."
  },
  {
    id: "spc-cherry",
    name: "SPC Cerezo Cálido",
    category: "SPC",
    color: "Cerezo rojizo",
    size: "180 x 1220 mm",
    price: 17500,
    image: spcCherry,
    description: "Piso vinílico rígido SPC tono cerezo, 100% resistente al agua y apto para losa radiante."
  },
  {
    id: "vinyl-dark-cement",
    name: "Vinílico Cemento Oscuro",
    category: "Vinílico",
    color: "Gris oscuro",
    size: "30 x 60 cm",
    price: 14900,
    image: vinylDarkCement,
    description: "Palmetas vinílicas encastrables con diseño de cemento alisado oscuro para un estilo industrial."
  }
];
function ProductCard({ product, onAddToCart, showAction = true }) {
  const { addItem } = useCart();
  const [added, setAdded] = reactExports.useState(false);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group flex flex-col rounded-[24px] bg-[#111315] p-3 text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[16px] bg-muted", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-2 top-2 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white backdrop-blur-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 12 }),
        product.category
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: product.image,
          alt: product.name,
          width: 600,
          height: 450,
          loading: "lazy",
          className: "aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-1 pb-1 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate text-base font-bold text-white", children: product.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-xs text-white/50", children: [
        product.category,
        " · ",
        product.size
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between px-1 pb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[22px] font-black tracking-tight text-white", children: [
        "$",
        product.price.toLocaleString("es-CL"),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-[11px] font-bold text-[#e5a975]", children: "/m²" })
      ] }),
      showAction && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handle,
          "aria-label": `Agregar ${product.name} al carrito`,
          disabled: added,
          className: `inline-flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md transition-all duration-300 ${added ? "bg-green-500 scale-110 cursor-default" : "bg-[var(--brand-teal)] cursor-pointer hover:scale-110 hover:brightness-110"}`,
          children: added ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 18, strokeWidth: 3, className: "animate-in zoom-in spin-in-90 duration-300" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 18, strokeWidth: 2.5 })
        }
      )
    ] })
  ] });
}
export {
  ProductCard as P,
  products as p
};
