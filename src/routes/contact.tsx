import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — PusclePRO" },
      { name: "description", content: "Talk to the PusclePRO team — partnerships, press and customer enquiries." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <section className="mx-auto max-w-5xl px-6 lg:px-10 py-24 grid md:grid-cols-2 gap-16">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contact</span>
        <h1 className="mt-4 font-display text-5xl">Say hello.</h1>
        <p className="mt-5 text-muted-foreground">
          Press, partnership, distribution or just thoughts on how the food tastes — we read everything.
        </p>
        <div className="mt-10 space-y-4 text-sm">
          <div>
            <div className="text-muted-foreground text-xs uppercase tracking-wider">Email</div>
            <div className="mt-1">hello@pusclepro.in</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs uppercase tracking-wider">Studio</div>
            <div className="mt-1">Bengaluru, India</div>
          </div>
        </div>
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        className="rounded-3xl bg-card border border-border p-8 shadow-card space-y-3"
      >
        {sent ? (
          <div className="text-center py-10">
            <div className="font-display text-2xl">Message received.</div>
            <p className="mt-2 text-sm text-muted-foreground">We'll get back to you within two business days.</p>
          </div>
        ) : (
          <>
            <input required placeholder="Name" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-lavender-deep" />
            <input required type="email" placeholder="Email" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-lavender-deep" />
            <textarea required rows={5} placeholder="Your message" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-lavender-deep" />
            <button className="w-full rounded-full bg-primary text-primary-foreground py-3.5 text-sm shadow-soft hover:opacity-90 transition">Send</button>
          </>
        )}
      </form>
    </section>
  );
}
