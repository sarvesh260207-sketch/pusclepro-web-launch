import { Link } from "@tanstack/react-router";
import logo from "@/assets/puscle-pro-logo.png.asset.json";

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo.url} alt="Puscle Pro" className="h-10 w-auto object-contain" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/products" className="text-muted-foreground hover:text-foreground transition" activeProps={{ className: "text-foreground" }}>Range</Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground transition" activeProps={{ className: "text-foreground" }}>Story</Link>
          <Link to="/early-access" className="text-muted-foreground hover:text-foreground transition" activeProps={{ className: "text-foreground" }}>Early Access</Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground transition" activeProps={{ className: "text-foreground" }}>Contact</Link>
        </nav>
        <Link
          to="/early-access"
          className="text-sm px-4 py-2 rounded-full bg-lavender-deep text-primary-foreground font-semibold hover:opacity-90 transition shadow-soft"
        >
          Reserve
        </Link>
      </div>
    </header>
  );
}
