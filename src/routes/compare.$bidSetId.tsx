import { createFileRoute, Link } from "@tanstack/react-router";
import { mockBidSets } from "@/mocks/data";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/compare/$bidSetId")({
  component: BidSetPage,
});

function BidSetPage() {
  const { bidSetId } = Route.useParams();
  const set = mockBidSets.find((b) => b.id === bidSetId);
  if (!set) return <div className="p-8">Introuvable</div>;
  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      <Link to="/compare" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:text-foreground"><ArrowLeft className="size-4" /> Comparatifs</Link>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">{set.title}</h1>
        <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">Comparé en 12 minutes</span>
      </div>
      <div className="bg-[var(--surface)] border border-border rounded-xl overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-2">Fournisseur</th><th className="px-4 py-2">Prix</th><th className="px-4 py-2">Délai</th><th className="px-4 py-2">Périmètre</th><th className="px-4 py-2">Conformité tech.</th><th className="text-left px-4 py-2">Certifications</th>
            </tr>
          </thead>
          <tbody>
            {set.bids.map((b) => (
              <tr key={b.supplier} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{b.supplier}</td>
                <td className="px-4 py-3 text-center">{b.price}</td>
                <td className="px-4 py-3 text-center">{b.leadTime}</td>
                <td className="px-4 py-3 text-center"><Pill v={b.scope} /></td>
                <td className="px-4 py-3 text-center"><Pill v={b.technical} /></td>
                <td className="px-4 py-3"><div className="flex flex-wrap gap-1">{b.certs.map((c) => <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100">{c}</span>)}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-[var(--soft)] border border-[var(--accent)]/20 rounded-xl p-5">
        <h3 className="text-sm font-semibold mb-2 text-[var(--accent)]">Recommandation IA</h3>
        <p className="text-sm leading-relaxed">{set.aiRecommendation}</p>
      </div>
    </div>
  );
}

function Pill({ v }: { v: number }) {
  const cls = v >= 95 ? "bg-emerald-50 text-emerald-700" : v >= 90 ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700";
  const label = v >= 95 ? "Match" : v >= 90 ? "Partiel" : "Manquant";
  return <span className={`text-xs px-2 py-0.5 rounded-full ${cls}`}>{label} · {v}%</span>;
}
