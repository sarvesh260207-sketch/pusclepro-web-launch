import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { submitBooking, getBookingCount } from "@/lib/bookings.functions";

const STORAGE_KEY = "pusclepro_welcome_seen_v1";
const RESERVATION_KEY = "pusclepro_reservation_v1";
const TOTAL_SLOTS = 500;
const PRICE = 30;
const REGULAR = 49;

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function useCountdown(hours: number) {
  const [target, setTarget] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  useEffect(() => {
    const stored = localStorage.getItem("pusclepro_deadline_v1");
    let t = stored ? parseInt(stored, 10) : NaN;
    if (!t || Number.isNaN(t) || t < Date.now()) {
      t = Date.now() + hours * 3600 * 1000;
      localStorage.setItem("pusclepro_deadline_v1", String(t));
    }
    setTarget(t);
    setNow(Date.now());
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, [hours]);
  const diff = target ? Math.max(0, target - now) : 0;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { h, m, s };
}

export function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [reserved, setReserved] = useState<number | null>(null);
  const [myPosition, setMyPosition] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    flavor: products[0].slug,
  });
  const { h, m, s } = useCountdown(23);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    getBookingCount()
      .then((r) => {
        if (!cancelled) setReserved(r.count ?? 0);
      })
      .catch(() => {
        if (!cancelled) setReserved(0);
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  const spotsLeft = reserved === null ? null : Math.max(0, TOTAL_SLOTS - reserved);
  const filledPct = reserved === null ? 0 : Math.min(100, Math.round((reserved / TOTAL_SLOTS) * 100));
  const savings = REGULAR - PRICE;
  const savingsPct = Math.round((savings / REGULAR) * 100);

  const handleClose = (v: boolean) => {
    setOpen(v);
    if (!v) localStorage.setItem(STORAGE_KEY, "1");
  };

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const nextPosition = (reserved ?? 0) + 1;
      const result = await submitBooking({ data: { ...form, position: nextPosition } });
      const newCount = result.count ?? nextPosition;
      setReserved(newCount);
      setMyPosition(newCount);
      const reservations = JSON.parse(localStorage.getItem(RESERVATION_KEY) || "[]");
      reservations.push({ ...form, position: newCount, createdAt: new Date().toISOString() });
      localStorage.setItem(RESERVATION_KEY, JSON.stringify(reservations));
      localStorage.setItem(STORAGE_KEY, "1");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden max-h-[92vh] overflow-y-auto">
        {!submitted ? (
          <div>
            <div className="gradient-deep text-primary-foreground px-7 pt-6 pb-6">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] opacity-90">
                <span>Founding 500 · Live</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                  Closes in {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
                </span>
              </div>

              <h2 className="mt-4 font-display text-3xl leading-tight">
                {reserved === null
                  ? "Reserve your founding pack."
                  : reserved === 0
                    ? "Be the first of 500 founding tasters."
                    : `${reserved} of ${TOTAL_SLOTS} founding packs claimed.`}
              </h2>

              <div className="mt-4">
                <div className="h-1.5 w-full rounded-full bg-white/15 overflow-hidden">
                  <div className="h-full bg-cream transition-all" style={{ width: `${filledPct}%` }} />
                </div>
                <div className="mt-2 flex justify-between text-[11px] opacity-85">
                  <span>{reserved ?? 0} reserved</span>
                  <span className="font-semibold">
                    {spotsLeft === null ? "" : `${spotsLeft} left`}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-display text-4xl">₹{PRICE}</span>
                <span className="line-through opacity-60 text-lg">₹{REGULAR}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cream text-primary font-semibold">
                  Save {savingsPct}%
                </span>
              </div>
              <p className="mt-2 text-sm opacity-90">
                20g plant protein · 3-min meal · no payment today.
              </p>
            </div>

            <div className="px-7 py-4 bg-muted/40 border-b border-border">
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2">What you get</p>
              <ul className="space-y-1.5 text-sm">
                <li className="flex gap-2"><span className="text-lavender-deep">✓</span> Founding pack at <b>₹{PRICE}</b> (locked forever, never at launch price)</li>
                <li className="flex gap-2"><span className="text-lavender-deep">✓</span> <b>Free shipping</b> on your first order</li>
                <li className="flex gap-2"><span className="text-lavender-deep">✓</span> Bonus <b>2nd pack free</b> if you refer one friend before launch</li>
                <li className="flex gap-2"><span className="text-lavender-deep">✓</span> Founding-taster name on the inside of the launch batch</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="px-7 py-5 space-y-3">
              <DialogHeader className="sr-only">
                <DialogTitle>Reserve your founding pack</DialogTitle>
                <DialogDescription>Five quick details. We'll email a secure payment link before launch.</DialogDescription>
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

              <Button type="submit" disabled={submitting} className="w-full rounded-full h-12 text-base font-semibold">
                {submitting ? "Locking your spot…" : `Lock my founding spot for ₹${PRICE} →`}
              </Button>
              {error && <p className="text-xs text-destructive text-center">{error}</p>}
              <button
                type="button"
                onClick={() => handleClose(false)}
                className="w-full text-[11px] text-muted-foreground hover:text-foreground transition"
              >
                No thanks, I'll pay full ₹{REGULAR} at launch
              </button>
            </form>
          </div>
        ) : (
          <div className="px-7 py-10 text-center">
            <div className="mx-auto h-14 w-14 rounded-full gradient-deep text-primary-foreground flex items-center justify-center font-display text-2xl">✓</div>
            <h2 className="mt-5 font-display text-2xl">
              Spot {myPosition ? ordinal(myPosition) : ""} secured, {form.name.split(" ")[0] || "friend"}.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm mx-auto">
              You're locked in at <span className="text-foreground font-medium">₹{PRICE} per pack</span>. We'll email <span className="text-foreground">{form.email}</span> a secure payment link a few days before launch — no charges until then.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">Tip: refer one friend and your 2nd pack ships free.</p>
            <Button onClick={() => handleClose(false)} className="mt-6 rounded-full">Start exploring</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
