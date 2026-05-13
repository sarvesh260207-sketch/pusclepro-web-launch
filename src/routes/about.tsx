import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — PusclePRO" },
      { name: "description", content: "PusclePRO was built for the people who refuse to pick between protein, flavour and time. This is our story." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 lg:px-10 pt-24 pb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Our Story</span>
        <h1 className="mt-4 font-display text-5xl md:text-6xl text-balance">
          Built by people who eat at their desk and refuse to apologise for it.
        </h1>
      </section>
      <section className="mx-auto max-w-3xl px-6 lg:px-10 pb-24 space-y-6 text-lg text-muted-foreground">
        <p>
          PusclePRO began with a frustration most of us share: there is no shortage of protein on shop shelves, but almost none of it tastes like food you'd actually choose. Powders, bars, beige imitations of meals.
        </p>
        <p>
          We wanted something different. Something that respected the way real Indian food tastes. Something a chef would happily serve, that a nutritionist would happily recommend, and that a busy person could make in less time than it takes to scroll a feed.
        </p>
        <p>
          The result is a small, opinionated range — three flavours, one promise. 20g of plant protein per pack. Three minutes to cook. No artificial colours, no shortcuts, no compromise on the spice.
        </p>
        <p>
          We're a young company preparing to launch. Reserve early to receive the first batch — and a one-for-one allocation as a thank-you for trusting us before everyone else.
        </p>
      </section>

      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid md:grid-cols-3 gap-10">
          {[
            ["Real ingredients", "Defatted soya chunks, hand-blended masalas, sea salt. Read the back of the box — there's nothing to hide."],
            ["Made in India", "Sourced and blended in small batches with partners we visit and trust."],
            ["A small range", "Three flavours done right, instead of fifteen done loosely. We'd rather be exceptional than everywhere."],
          ].map(([t, d]) => (
            <div key={t}>
              <h3 className="font-display text-2xl">{t}</h3>
              <p className="mt-3 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
