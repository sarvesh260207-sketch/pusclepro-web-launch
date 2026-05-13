import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/lib/products";

export const Route = createFileRoute("/early-access")({
  head: () => ({
    meta: [
      { title: "Early Access — Reserve PusclePRO" },
      { name: "description", content: "Reserve PusclePRO before launch and receive a one-for-one allocation: pay for one pack today, two arrive on launch day." },
    ],
  }),
  component: EarlyAccessPage,
});

function EarlyAccessPage() {
  const [selected, setSelected] = useState(products[0].slug);
  const [submitted, setSubmitted] = useState(false);
  const product = products.find((p) => p.slug === selected)!;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-60" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-10 pt-20 pb-12 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-lavender-deep">Founding 1,000</span>
          <h1 className="mt-4 font-display text-5xl md:text-7xl text-balance">Reserve one. Receive two.</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            A one-for-one allocation for the first thousand reservations. Pay for a single pack today; two arrive on launch day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 lg:px-10 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-3xl">Pick your flavour</h2>
          <div className="mt-6 space-y-3">
            {products.map((p) => (
              <button
                key={p.slug}
                onClick={() => setSelected(p.slug)}
                className={`w-full text-left flex items-center gap-4 rounded-2xl border p-4 transition ${selected === p.slug ? "border-lavender-deep bg-card shadow-card" : "border-border hover:border-foreground/30"}`}
              >
                <img src={p.image} alt={p.name} width={80} height={80} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-xl">{p.name}</span>
                    <span className="text-sm">₹{p.price}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{p.flavor}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="rounded-3xl bg-card border border-border p-8 shadow-card">
            <h3 className="font-display text-2xl">Your reservation</h3>
            <div className="mt-6 flex justify-between text-sm">
              <span className="text-muted-foreground">Flavour</span>
              <span>{product.name}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">You pay today</span>
              <span>₹{product.price} × 1</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">You receive on launch</span>
              <span>2 packs</span>
            </div>
            <div className="my-6 border-t border-border" />

            {submitted ? (
              <div className="text-center py-6">
                <div className="font-display text-2xl">You're on the list.</div>
                <p className="mt-2 text-sm text-muted-foreground">We'll email you the moment your packs ship.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-3"
              >
                <input
                  required
                  type="text"
                  placeholder="Full name"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-lavender-deep"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-lavender-deep"
                />
                <input
                  required
                  type="tel"
                  placeholder="Phone"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-lavender-deep"
                />
                <button className="w-full rounded-full bg-primary text-primary-foreground py-3.5 text-sm shadow-soft hover:opacity-90 transition">
                  Reserve for ₹{product.price}
                </button>
                <p className="text-[11px] text-muted-foreground text-center">
                  No charge today. We confirm by email before launch.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 lg:px-10 pb-24">
        <h2 className="font-display text-3xl">How early access works</h2>
        <ol className="mt-6 space-y-5 text-muted-foreground">
          <li><span className="text-foreground font-medium">1. Reserve.</span> Pick a flavour and lock your spot in under a minute.</li>
          <li><span className="text-foreground font-medium">2. We notify you.</span> A few days before launch, we'll confirm your shipping window.</li>
          <li><span className="text-foreground font-medium">3. One for one.</span> Your single pack purchase ships as two packs.</li>
        </ol>
      </section>
    </>
  );
}
