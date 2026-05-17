export type Category = "apparel" | "home" | "accessories";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  images: string[];
  featured?: boolean;
}

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  {
    id: "linen-overshirt",
    name: "Linen Overshirt",
    price: 148,
    category: "apparel",
    description:
      "A relaxed, unstructured overshirt cut from heavyweight European linen. Garment-dyed for a soft, lived-in hand.",
    images: [u("1591047139829-d91aecb6caea"), u("1521572163474-6864f9cf17ab")],
    featured: true,
  },
  {
    id: "merino-crew",
    name: "Merino Crew Sweater",
    price: 124,
    category: "apparel",
    description: "Fine-gauge 100% merino wool, knitted in Portugal. Refined enough for the office, soft enough for Sunday.",
    images: [u("1620799140408-edc6dcb6d633"), u("1434389677669-e08b4cac3105")],
    featured: true,
  },
  {
    id: "oxford-shirt",
    name: "Heritage Oxford",
    price: 89,
    category: "apparel",
    description: "Classic oxford button-down in mid-weight cotton. The shirt every wardrobe quietly relies on.",
    images: [u("1602810318383-e386cc2a3ccf"), u("1596755094514-f87e34085b2c")],
  },
  {
    id: "wide-trousers",
    name: "Pleated Wide Trousers",
    price: 168,
    category: "apparel",
    description: "Double-pleated, high-rise trousers in dry-finish cotton twill. Tailored without being stiff.",
    images: [u("1594633312681-425c7b97ccd1"), u("1594633312681-425c7b97ccd1")],
  },
  {
    id: "ceramic-vase",
    name: "Hand-thrown Ceramic Vase",
    price: 76,
    category: "home",
    description: "Thrown and finished by hand in a small studio in Setúbal. Each piece varies slightly — that's the point.",
    images: [u("1578500494198-246f612d3b3d"), u("1493663284031-b7e3aefcae8e")],
    featured: true,
  },
  {
    id: "linen-throw",
    name: "Stonewashed Linen Throw",
    price: 112,
    category: "home",
    description: "Oversized throw in stonewashed Belgian linen. Drapes beautifully across a sofa or the foot of a bed.",
    images: [u("1522771739844-6a9f6d5f14af"), u("1505693416388-ac5ce068fe85")],
  },
  {
    id: "brass-lamp",
    name: "Brushed Brass Task Lamp",
    price: 245,
    category: "home",
    description: "An articulating desk lamp in solid brushed brass. Weighted base, fabric-wrapped cord, lifetime warranty.",
    images: [u("1507473885765-e6ed057f782c"), u("1513506003901-1e6a229e2d15")],
  },
  {
    id: "wool-rug",
    name: "Handwoven Wool Rug",
    price: 420,
    category: "home",
    description: "A 5×7 flatweave rug, hand-loomed in undyed wool. Naturally stain-resistant; gets better with age.",
    images: [u("1555041469-a586c61ea9bc"), u("1493663284031-b7e3aefcae8e")],
  },
  {
    id: "leather-wallet",
    name: "Bifold Leather Wallet",
    price: 95,
    category: "accessories",
    description: "Vegetable-tanned full-grain leather, edge-burnished by hand. Develops a patina that's entirely yours.",
    images: [u("1627123424574-724758594e93"), u("1547949003-9792a18a2601")],
    featured: true,
  },
  {
    id: "canvas-tote",
    name: "Heavyweight Canvas Tote",
    price: 58,
    category: "accessories",
    description: "16oz natural canvas, reinforced base, leather-tabbed handles. Engineered to outlive a season.",
    images: [u("1544816155-12df9643f363"), u("1591561954557-26941169b49e")],
  },
  {
    id: "field-watch",
    name: "Field Watch",
    price: 320,
    category: "accessories",
    description: "Stainless steel field watch with sapphire crystal and Swiss automatic movement. 100m water resistance.",
    images: [u("1524592094714-0f0654e20314"), u("1547996160-81dfa63595aa")],
  },
  {
    id: "linen-cap",
    name: "Washed Linen Cap",
    price: 42,
    category: "accessories",
    description: "Five-panel cap in washed natural linen with an unstructured crown and antique-brass adjuster.",
    images: [u("1588850561407-ed78c282e89b"), u("1521369909029-2afed882baee")],
  },
];

export const productById = (id: string) => products.find((p) => p.id === id);

export const categories: { id: Category; label: string }[] = [
  { id: "apparel", label: "Apparel" },
  { id: "home", label: "Home" },
  { id: "accessories", label: "Accessories" },
];
