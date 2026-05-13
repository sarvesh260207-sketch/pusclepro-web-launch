import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-lavender-deep" />
            <span className="font-display text-2xl">PusclePRO</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            Plant protein that respects your time and your tastebuds. Three minutes, hot water, a meal you'd actually choose.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products">The Range</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/early-access">Early Access</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-4">Promise</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>20g plant protein per pack</li>
            <li>3-minute preparation</li>
            <li>No artificial colours</li>
            <li>Made in India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} PusclePRO Foods. All rights reserved.
      </div>
    </footer>
  );
}
