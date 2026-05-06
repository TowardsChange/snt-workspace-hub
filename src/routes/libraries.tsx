import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Bot } from "lucide-react";

export const Route = createFileRoute("/libraries")({
  component: () => (
    <div className="p-8 max-w-[1000px] mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Bibliothèques de prix</h1>
      <p className="text-sm text-muted-foreground mb-6">Recherchez dans le référentiel SPIE par filtre guidé ou via l'IA.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/libraries/guided" className="bg-[var(--surface)] border border-border rounded-xl p-6 hover:shadow-sm">
          <Target className="size-6 text-[var(--accent)] mb-3" strokeWidth={1.5} />
          <h2 className="font-semibold mb-1">Recherche guidée</h2>
          <p className="text-sm text-muted-foreground">Filtres par lot, région et période.</p>
        </Link>
        <Link to="/libraries/ai" className="bg-[var(--surface)] border border-border rounded-xl p-6 hover:shadow-sm">
          <Bot className="size-6 text-[var(--accent)] mb-3" strokeWidth={1.5} />
          <h2 className="font-semibold mb-1">Recherche IA</h2>
          <p className="text-sm text-muted-foreground">Posez votre question en langage naturel.</p>
        </Link>
      </div>
    </div>
  ),
});
