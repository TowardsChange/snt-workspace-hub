import { createFileRoute, Link } from "@tanstack/react-router";
import { mockBidSets } from "@/mocks/data";

export const Route = createFileRoute("/compare")({
  component: () => (
    <div className="p-8 max-w-[1100px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Comparer des devis</h1>
      <div className="bg-[var(--surface)] border border-border rounded-xl p-8 text-center">
        <p className="text-sm text-muted-foreground mb-4">Téléchargez un cahier des charges et 2 à 5 offres pour démarrer une comparaison.</p>
        <button className="px-4 py-2 rounded-md bg-[var(--accent)] text-white text-sm font-medium">Nouveau comparatif</button>
      </div>
      <h2 className="text-sm font-medium text-muted-foreground mt-8 mb-3">Comparatifs récents</h2>
      <div className="bg-[var(--surface)] border border-border rounded-xl divide-y divide-border">
        {mockBidSets.map((b) => (
          <Link key={b.id} to="/compare/$bidSetId" params={{ bidSetId: b.id }} className="block px-4 py-3 hover:bg-slate-50 text-sm">
            {b.title}
          </Link>
        ))}
      </div>
    </div>
  ),
});
