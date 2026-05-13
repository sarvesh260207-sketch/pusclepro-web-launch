import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "The Range — PusclePRO Plant Protein Meals" },
      { name: "description", content: "Three premium ready-to-eat soya chunk meals: Biriyani, Butter Masala, Tangy Tomato. 20g plant protein each, three minutes to cook." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
      <div className="max-w-2xl">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">The Range</span>
        <h1 className="mt-4 font-display text-5xl md:text-6xl">A small range, made carefully.</h1>
        <p className="mt-5 text-muted-foreground">
          Three meals built around one belief: real food beats supplements. Each one delivers 20g of plant protein and is ready in three minutes.
        </p>
      </div>
      <div className="mt-14 grid md:grid-cols-3 gap-6">
        {products.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </section>
  );
}
