import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La página que buscás no existe o fue movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground uppercase tracking-wider hover:bg-primary/90 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
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
        <h1 className="text-xl font-semibold text-foreground">Algo salió mal</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Intentá refrescar o volvé al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground uppercase tracking-wider hover:bg-primary/90"
          >
            Reintentar
          </button>
          <a href="/" className="border border-input bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent/10">
            Inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Faztred Soluciones | Automatización Industrial en Argentina" },
      { name: "description", content: "Empresa argentina de automatización industrial: PLC, SCADA, tableros eléctricos, revamping e Industria 4.0. Soluciones llave en mano con experiencia real en planta." },
      { name: "author", content: "Faztred Soluciones" },
      { property: "og:site_name", content: "Faztred Soluciones" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Faztred Soluciones | Automatización Industrial" },
      { property: "og:description", content: "Automatización industrial, tableros eléctricos, PLC, SCADA y revamping. Experiencia real en planta." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        children: "window.dataLayer = window.dataLayer || [];",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Faztred Soluciones",
          url: "https://faztred.com.ar",
          email: "info@faztred.com.ar",
          telephone: "+5491162083230",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Merlo",
            addressRegion: "Buenos Aires",
            postalCode: "1761",
            addressCountry: "AR",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isChrome = !pathname.startsWith("/auth") && !pathname.startsWith("/admin");
  return (
    <QueryClientProvider client={queryClient}>
      {isChrome && <Navbar />}
      <main className="min-h-screen">
        <Outlet />
      </main>
      {isChrome && <Footer />}
      {isChrome && <WhatsAppFloat />}
      <Toaster position="bottom-left" />
    </QueryClientProvider>
  );
}
