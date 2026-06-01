import floorOak from "@/assets/floor-oak.jpg";
import floorWalnut from "@/assets/floor-walnut.jpg";
import floorPorcelain from "@/assets/floor-porcelain.jpg";
import floorMarble from "@/assets/floor-marble.jpg";
import floorVinyl from "@/assets/floor-vinyl.jpg";
import floorSpc from "@/assets/floor-spc.jpg";

export type Product = {
  id: string;
  name: string;
  category: "Laminado" | "Vinílico" | "Porcelanato" | "Cerámico" | "SPC";
  color: string;
  size: string;
  price: number;
  image: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "oak-natural",
    name: "Roble Natural",
    category: "Laminado",
    color: "Beige claro",
    size: "190 x 1380 mm",
    price: 12990,
    image: floorOak,
    description: "Laminado AC4 con apariencia de roble natural, ideal para ambientes luminosos.",
  },
  {
    id: "walnut-premium",
    name: "Nogal Premium",
    category: "Laminado",
    color: "Marrón cálido",
    size: "195 x 1290 mm",
    price: 15490,
    image: floorWalnut,
    description: "Laminado de alta resistencia con veta profunda y tono nogal elegante.",
  },
  {
    id: "porcelain-grey",
    name: "Porcelanato Concret",
    category: "Porcelanato",
    color: "Gris claro",
    size: "60 x 60 cm",
    price: 18990,
    image: floorPorcelain,
    description: "Porcelanato rectificado símil cemento, acabado mate antideslizante.",
  },
  {
    id: "marble-calacatta",
    name: "Cerámico Calacatta",
    category: "Cerámico",
    color: "Blanco veteado",
    size: "45 x 45 cm",
    price: 9990,
    image: floorMarble,
    description: "Cerámico símil mármol, perfecto para baños y ambientes elegantes.",
  },
  {
    id: "vinyl-sun",
    name: "Vinílico Sun Oak",
    category: "Vinílico",
    color: "Beige cálido",
    size: "180 x 1220 mm",
    price: 11490,
    image: floorVinyl,
    description: "Piso vinílico clic, 100% impermeable, instalación rápida y sin obra.",
  },
  {
    id: "spc-stone",
    name: "SPC Stone Grey",
    category: "SPC",
    color: "Gris medio",
    size: "180 x 1220 mm",
    price: 16990,
    image: floorSpc,
    description: "Piso SPC con núcleo mineral, máxima estabilidad y resistencia al agua.",
  },
];
