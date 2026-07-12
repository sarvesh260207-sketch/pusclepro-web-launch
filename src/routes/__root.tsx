import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WelcomePopup } from "@/components/site/WelcomePopup";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl">404</h1>
        <p className="mt-3 text-muted-foreground">This page slipped past the kitchen.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm">Back home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">Something went off the boil</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try refreshing the page.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PusclePRO — 20g Plant Protein. Three Minutes. Real Food." },
      { name: "description", content: "PusclePRO is a premium ready-to-eat soya chunk meal with 20g of plant protein, prepared in just three minutes with hot water. Biriyani, Butter Masala, Tangy Tomato." },
      { property: "og:title", content: "PusclePRO — 20g Plant Protein. Three Minutes. Real Food." },
      { property: "og:description", content: "PusclePRO is a premium ready-to-eat soya chunk meal with 20g of plant protein, prepared in just three minutes with hot water. Biriyani, Butter Masala, Tangy Tomato." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "PusclePRO — 20g Plant Protein. Three Minutes. Real Food." },
      { name: "twitter:description", content: "PusclePRO is a premium ready-to-eat soya chunk meal with 20g of plant protein, prepared in just three minutes with hot water. Biriyani, Butter Masala, Tangy Tomato." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/61c14a32-83ef-4def-8fca-374589a7ed2a/id-preview-51543ffb--594b24be-d277-45b5-bd82-31c9af775d5f.lovable.app-1778683197823.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/61c14a32-83ef-4def-8fca-374589a7ed2a/id-preview-51543ffb--594b24be-d277-45b5-bd82-31c9af775d5f.lovable.app-1778683197823.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WelcomePopup />
    </QueryClientProvider>
  );
}
