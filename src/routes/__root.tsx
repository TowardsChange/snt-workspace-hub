import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AppShell } from "@/components/AppShell";
import appCss from "../styles.css?url";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SpieB AI" },
      { name: "description", content: "Workspace IA interne SPIE Batignolles." },
      { property: "og:title", content: "SpieB AI" },
      { name: "twitter:title", content: "SpieB AI" },
      { property: "og:description", content: "Workspace IA interne SPIE Batignolles." },
      { name: "twitter:description", content: "Workspace IA interne SPIE Batignolles." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d76854ca-8c9b-4119-9a00-ae82c503f8c0/id-preview-964d839e--0a1c43e0-fdb8-43fd-bf19-f87318ad1a8c.lovable.app-1778076891725.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d76854ca-8c9b-4119-9a00-ae82c503f8c0/id-preview-964d839e--0a1c43e0-fdb8-43fd-bf19-f87318ad1a8c.lovable.app-1778076891725.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-2 text-muted-foreground">Page introuvable</p>
        <Link to="/home" className="mt-4 inline-block text-[var(--accent)]">Retour à l'accueil</Link>
      </div>
    </div>
  ),
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell />
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}
