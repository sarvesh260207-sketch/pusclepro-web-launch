import biriyani from "@/assets/box-biriyani.jpg";
import butter from "@/assets/box-butter.jpg";
import tomato from "@/assets/box-tomato.jpg";

export type Product = {
  slug: string;
  name: string;
  flavor: string;
  tagline: string;
  price: number;
  protein: string;
  calories: string;
  carbs: string;
  fat: string;
  fiber: string;
  image: string;
  accent: string;
  description: string;
};

export const products: Product[] = [
  {
    slug: "biriyani",
    name: "Biriyani",
    flavor: "Aromatic Saffron Spice",
    tagline: "The royal classic, in three minutes.",
    price: 49,
    protein: "20g",
    calories: "210 kcal",
    carbs: "22g",
    fat: "4g",
    fiber: "5g",
    image: biriyani,
    accent: "oklch(0.72 0.16 65)",
    description:
      "Long-grain inspired soya chunks slow-seasoned with saffron, cardamom, clove and a whisper of rose. A hand-blended biriyani masala built around plant protein.",
  },
  {
    slug: "butter-masala",
    name: "Butter Masala",
    flavor: "Velvet Tomato & Cream",
    tagline: "Comfort, elevated.",
    price: 55,
    protein: "20g",
    calories: "230 kcal",
    carbs: "20g",
    fat: "6g",
    fiber: "5g",
    image: butter,
    accent: "oklch(0.55 0.18 35)",
    description:
      "Slow-simmered tomato, kasuri methi and a touch of cultured butter. The dish you order out, reimagined as a 20g protein meal you make at your desk.",
  },
  {
    slug: "tangy-tomato",
    name: "Tangy Tomato",
    flavor: "Roasted Tomato & Chilli",
    tagline: "Bright, bold, alive.",
    price: 45,
    protein: "20g",
    calories: "200 kcal",
    carbs: "21g",
    fat: "3g",
    fiber: "6g",
    image: tomato,
    accent: "oklch(0.62 0.21 25)",
    description:
      "Fire-roasted tomatoes, a hit of byadgi chilli and a finish of curry leaf. Sharp, savoury and unapologetically protein-forward.",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
