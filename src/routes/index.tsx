import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PusclePRO — 20g Plant Protein in Three Minutes" },
      { name: "description", content: "Premium ready-to-eat soya chunk meals. 20g protein, three flavours, three minutes. Reserve early — one for one on launch." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-70" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-lavender-deep">
              <span className="h-px w-8 bg-lavender-deep" /> Launching Soon
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] text-balance">
              20g protein.<br/>
              <span className="italic text-lavender-deep">Three minutes.</span><br/>
              Real food.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              A ready-to-eat soya chunk meal made for people who refuse to choose between protein, flavour and time. Just add hot water.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/early-access" className="rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm shadow-soft hover:opacity-90 transition">
                Reserve your pack — ₹49
              </Link>
              <Link to="/products" className="rounded-full border border-foreground/20 px-6 py-3 text-sm hover:bg-foreground/5 transition">
                Explore the range
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-8 text-sm text-muted-foreground">
              <div><div className="font-display text-2xl text-foreground">20g</div>plant protein</div>
              <div><div className="font-display text-2xl text-foreground">3 min</div>just hot water</div>
              <div><div className="font-display text-2xl text-foreground">₹49</div>starting price</div>
            </div>
          </div>
          <div className="relative">
            <img
              src={hero}
              alt="The three PusclePRO cubical meal boxes on a lavender backdrop"
              width={1600}
              height={1200}
              className="rounded-3xl shadow-soft w-full object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* Hook strip */}
      <section className="border-y border-border/60 bg-cream/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-8 flex flex-wrap items-center justify-between gap-6 text-sm">
          <p className="font-display text-xl md:text-2xl">20g protein for ₹49 — without the powder, without the wait.</p>
          <Link to="/early-access" className="text-lavender-deep underline-offset-4 hover:underline">Reserve early access →</Link>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">The Range</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Three meals. Three moods.</h2>
          </div>
          <Link to="/products" className="text-sm text-lavender-deep hover:underline">View all →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">The Ritual</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">From box to bowl in 180 seconds.</h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              No stove. No mess. No compromise on what's actually inside. Soya chunks, slow-blended spices, and the kind of restraint a real chef respects.
            </p>
          </div>
          <ol className="space-y-6">
            {[
              ["01", "Open the cube", "Tear along the seam. Inside: chunks, spice base, a measured oil sachet."],
              ["02", "Pour 200ml hot water", "Stir once. Cover. Walk away for three minutes."],
              ["03", "Eat", "Hot, glossy, restaurant-grade. 20g protein. Done."],
            ].map(([n, t, d]) => (
              <li key={n} className="flex gap-6 border-b border-border/60 pb-6 last:border-0">
                <span className="font-display text-2xl text-lavender-deep w-12">{n}</span>
                <div>
                  <h3 className="font-display text-xl">{t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Early access CTA */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
        <div className="rounded-3xl gradient-deep text-primary-foreground p-12 md:p-16 grid md:grid-cols-2 gap-10 items-center shadow-soft">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] opacity-70">Early Access · One for One</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Reserve one. Receive two.</h2>
            <p className="mt-4 opacity-80 max-w-md">
              Our first 1,000 reservations get a one-for-one launch allocation — pay for one pack today, two arrive on launch day.
            </p>
          </div>
          <div className="md:justify-self-end">
            <Link to="/early-access" className="inline-flex rounded-full bg-cream text-ink px-8 py-4 text-sm font-medium hover:opacity-90 transition">
              Claim your reservation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
