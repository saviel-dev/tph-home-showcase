import floorOak from "@/assets/floor-oak.jpg";
import floorWalnut from "@/assets/floor-walnut.jpg";
import floorPorcelain from "@/assets/floor-porcelain.jpg";
import floorMarble from "@/assets/floor-marble.jpg";
import floorVinyl from "@/assets/floor-vinyl.jpg";
import floorSpc from "@/assets/floor-spc.jpg";

import ceramicHexagonal from "@/assets/ceramic-hexagonal.png";
import ceramicRustic from "@/assets/ceramic-rustic.png";
import laminatePineGrey from "@/assets/laminate-pine-grey.png";
import porcelainCarrara from "@/assets/porcelain-carrara.png";
import porcelainWood from "@/assets/porcelain-wood.png";
import spcCherry from "@/assets/spc-cherry.png";
import vinylDarkCement from "@/assets/vinyl-dark-cement.png";

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
  {
    id: "ceramic-hexagonal",
    name: "Cerámico Hexagonal Pastel",
    category: "Cerámico",
    color: "Tonos pastel",
    size: "20 x 20 cm",
    price: 13500,
    image: ceramicHexagonal,
    description: "Cerámico moderno de formato hexagonal en tonos pastel, ideal para cocinas y baños vanguardistas.",
  },
  {
    id: "ceramic-rustic",
    name: "Cerámico Rústico Terracota",
    category: "Cerámico",
    color: "Terracota",
    size: "30 x 30 cm",
    price: 8900,
    image: ceramicRustic,
    description: "Cerámico rústico con acabado mate y textura natural, perfecto para galerías y exteriores techados.",
  },
  {
    id: "laminate-pine-grey",
    name: "Laminado Pino Gris",
    category: "Laminado",
    color: "Gris pino",
    size: "190 x 1380 mm",
    price: 13490,
    image: laminatePineGrey,
    description: "Piso laminado AC4 con diseño de pino gris nórdico, resistente al desgaste y fácil de limpiar.",
  },
  {
    id: "porcelain-carrara",
    name: "Porcelanato Carrara",
    category: "Porcelanato",
    color: "Blanco veteado",
    size: "60 x 120 cm",
    price: 24900,
    image: porcelainCarrara,
    description: "Porcelanato pulido gran formato símil mármol Carrara, otorga amplitud y sofisticación.",
  },
  {
    id: "porcelain-wood",
    name: "Porcelanato Madera Roble",
    category: "Porcelanato",
    color: "Roble",
    size: "20 x 120 cm",
    price: 21500,
    image: porcelainWood,
    description: "Porcelanato listón símil madera natural, combina la calidez de la madera con la durabilidad del porcelanato.",
  },
  {
    id: "spc-cherry",
    name: "SPC Cerezo Cálido",
    category: "SPC",
    color: "Cerezo rojizo",
    size: "180 x 1220 mm",
    price: 17500,
    image: spcCherry,
    description: "Piso vinílico rígido SPC tono cerezo, 100% resistente al agua y apto para losa radiante.",
  },
  {
    id: "vinyl-dark-cement",
    name: "Vinílico Cemento Oscuro",
    category: "Vinílico",
    color: "Gris oscuro",
    size: "30 x 60 cm",
    price: 14900,
    image: vinylDarkCement,
    description: "Palmetas vinílicas encastrables con diseño de cemento alisado oscuro para un estilo industrial.",
  },
];
