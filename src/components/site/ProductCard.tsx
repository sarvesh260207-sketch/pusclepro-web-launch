import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group block rounded-2xl bg-card shadow-card overflow-hidden border border-border/50 hover:-translate-y-1 transition-all duration-500"
    >
      <div
        className="aspect-square overflow-hidden"
        style={{ background: `linear-gradient(135deg, var(--lavender) 0%, color-mix(in oklab, ${product.accent} 30%, var(--lavender)) 100%)` }}
      >
        <img
          src={product.image}
          alt={`PusclePRO ${product.name} pack`}
          loading="lazy"
          width={1024}
          height={1024}
          className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-6">
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-2xl">{product.name}</h3>
          <span className="text-sm font-medium">₹{product.price}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{product.flavor}</p>
        <div className="mt-4 flex items-center gap-2 text-xs">
          <span className="px-2 py-1 rounded-full bg-secondary">{product.protein} protein</span>
          <span className="px-2 py-1 rounded-full bg-secondary">3 min</span>
        </div>
      </div>
    </Link>
  );
}
