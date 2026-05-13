import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, products } from "@/lib/products";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `PusclePRO ${loaderData.product.name} — 20g Protein in 3 Minutes` },
          { name: "description", content: `${loaderData.product.name}: ${loaderData.product.tagline} ${loaderData.product.protein} plant protein. ₹${loaderData.product.price}.` },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [{ title: "PusclePRO" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-3xl">Flavour not found</h1>
      <Link to="/products" className="mt-6 inline-block text-lavender-deep underline">Back to range</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <p className="text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const others = products.filter((p) => p.slug !== product.slug);

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid lg:grid-cols-2 gap-12 items-start">
        <div
          className="rounded-3xl overflow-hidden aspect-square"
          style={{ background: `linear-gradient(135deg, var(--lavender) 0%, color-mix(in oklab, ${product.accent} 35%, var(--lavender)) 100%)` }}
        >
          <img src={product.image} alt={`PusclePRO ${product.name}`} width={1024} height={1024} className="w-full h-full object-cover mix-blend-multiply" />
        </div>
        <div className="lg:pt-8">
          <Link to="/products" className="text-xs text-muted-foreground uppercase tracking-[0.2em]">← The Range</Link>
          <h1 className="mt-4 font-display text-5xl md:text-6xl">{product.name}</h1>
          <p className="mt-2 text-lavender-deep">{product.flavor}</p>
          <p className="mt-6 text-lg text-muted-foreground">{product.description}</p>

          <div className="mt-8 flex items-baseline gap-3">
            <span className="font-display text-4xl">₹{product.price}</span>
            <span className="text-sm text-muted-foreground">per pack · early-access price</span>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            {[
              ["Protein", product.protein],
              ["Calories", product.calories],
              ["Carbs", product.carbs],
              ["Fat", product.fat],
              ["Fibre", product.fiber],
              ["Cook", "3 min"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-border bg-card p-4">
                <div className="font-display text-xl">{v}</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">{k}</div>
              </div>
            ))}
          </div>

          <Link to="/early-access" className="mt-10 inline-flex rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm shadow-soft hover:opacity-90 transition">
            Reserve — one for one
          </Link>

          <div className="mt-10 border-t border-border/60 pt-6 text-sm text-muted-foreground space-y-2">
            <p><span className="text-foreground">Ingredients:</span> Defatted soya chunks, slow-blended spice base, sunflower oil, sea salt, dehydrated aromatics.</p>
            <p><span className="text-foreground">Allergen note:</span> Contains soya. May contain traces of mustard.</p>
            <p><span className="text-foreground">Shelf life:</span> 9 months from manufacture.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <h2 className="font-display text-3xl mb-8">Also in the range</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {others.map((p) => (
            <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="group flex items-center gap-6 rounded-2xl border border-border bg-card p-4 hover:shadow-card transition">
              <img src={p.image} alt={p.name} width={120} height={120} className="w-28 h-28 rounded-xl object-cover" />
              <div>
                <h3 className="font-display text-2xl">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.flavor}</p>
                <p className="mt-1 text-sm">₹{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
