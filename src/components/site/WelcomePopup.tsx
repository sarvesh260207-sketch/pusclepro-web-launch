import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";

const STORAGE_KEY = "pusclepro_welcome_seen_v1";
const RESERVATION_KEY = "pusclepro_reservation_v1";
const COUNTER_KEY = "pusclepro_visitor_no_v1";
const BASE_COUNT = 217; // starting seed so the number feels lived-in

function getVisitorNumber() {
  const existing = localStorage.getItem(COUNTER_KEY);
  if (existing) return parseInt(existing, 10);
  // pseudo-increment: base + small drift by day
  const drift = Math.floor((Date.now() / (1000 * 60 * 60)) % 400);
  const n = BASE_COUNT + drift + Math.floor(Math.random() * 4);
  localStorage.setItem(COUNTER_KEY, String(n));
  return n;
}

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [visitorNo, setVisitorNo] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    flavor: products[0].slug,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    const n = getVisitorNumber();
    setVisitorNo(n);
    const t = setTimeout(() => setOpen(true), 900);
    return () => clearTimeout(t);
  }, []);

  const handleClose = (v: boolean) => {
    setOpen(v);
    if (!v) localStorage.setItem(STORAGE_KEY, "1");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reservations = JSON.parse(localStorage.getItem(RESERVATION_KEY) || "[]");
    reservations.push({ ...form, visitorNo, createdAt: new Date().toISOString() });
    localStorage.setItem(RESERVATION_KEY, JSON.stringify(reservations));
    localStorage.setItem(STORAGE_KEY, "1");
    setSubmitted(true);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden">
        {!submitted ? (
          <div>
            <div className="gradient-deep text-primary-foreground px-7 pt-7 pb-6">
              <p className="text-[11px] uppercase tracking-[0.22em] opacity-80">Founding Taster Programme</p>
              <h2 className="mt-3 font-display text-3xl leading-tight">
                You're our <span className="italic">{visitorNo ? ordinal(visitorNo) : "next"}</span> future taster.
              </h2>
              <p className="mt-3 text-sm opacity-85">
                The first 500 people to reserve get a pack at{" "}
                <span className="font-semibold text-cream">₹19</span>{" "}
                <span className="line-through opacity-60">₹49</span> on launch day. No payment now — we'll email you a secure link before dispatch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="px-7 py-6 space-y-4">
              <DialogHeader className="sr-only">
                <DialogTitle>Reserve your founding pack</DialogTitle>
                <DialogDescription>Five quick details. We'll email you before launch to confirm payment.</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <Label htmlFor="wp-name" className="text-xs">Full name</Label>
                  <Input id="wp-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="wp-email" className="text-xs">Email</Label>
                  <Input id="wp-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="wp-phone" className="text-xs">Phone</Label>
                  <Input id="wp-phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="wp-city" className="text-xs">City</Label>
                  <Input id="wp-city" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="mt-1" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="wp-flavor" className="text-xs">Preferred flavour</Label>
                  <select
                    id="wp-flavor"
                    value={form.flavor}
                    onChange={(e) => setForm({ ...form, flavor: e.target.value })}
                    className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {products.map((p) => (
                      <option key={p.slug} value={p.slug}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Button type="submit" className="w-full rounded-full h-11">
                Lock in my ₹19 founding pack
              </Button>
              <p className="text-[11px] text-muted-foreground text-center">
                No payment collected today. A secure payment link arrives via email before launch dispatch.
              </p>
            </form>
          </div>
        ) : (
          <div className="px-7 py-10 text-center">
            <div className="mx-auto h-14 w-14 rounded-full gradient-deep text-primary-foreground flex items-center justify-center font-display text-2xl">✓</div>
            <h2 className="mt-5 font-display text-2xl">Reservation secured, {form.name.split(" ")[0] || "friend"}.</h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm mx-auto">
              You're on the founding taster list at <span className="text-foreground font-medium">₹19 per pack</span>. We'll email <span className="text-foreground">{form.email}</span> a secure payment link a few days before launch — no charges until then.
            </p>
            <Button onClick={() => handleClose(false)} className="mt-6 rounded-full">Start exploring</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
