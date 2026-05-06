import { createFileRoute } from "@tanstack/react-router";
import { mockPriceRows } from "@/mocks/data";

export const Route = createFileRoute("/libraries/guided")({
  component: () => (
    <div className="p-8 max-w-[1100px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Recherche guidée</h1>
      <div className="bg-[var(--surface)] border border-border rounded-xl p-5 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Type de travaux"><select className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm"><option>Gros oeuvre</option><option>CVC</option><option>Électricité</option></select></Field>
        <Field label="Région"><select className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm"><option>Île-de-France</option><option>PACA</option></select></Field>
        <Field label="Période"><input type="month" className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm" /></Field>
      </div>
      <div className="bg-[var(--surface)] border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs text-muted-foreground"><tr>
            <th className="text-left px-4 py-2">Code BPU</th><th className="text-left px-4 py-2">Description</th><th className="text-left px-4 py-2">Unité</th><th className="text-left px-4 py-2">Prix unitaire</th><th className="text-left px-4 py-2">Source</th>
          </tr></thead>
          <tbody>{mockPriceRows.map((r) => (
            <tr key={r.code} className="border-t border-border">
              <td className="px-4 py-2 font-mono text-xs">{r.code}</td><td className="px-4 py-2">{r.description}</td><td className="px-4 py-2">{r.unite}</td><td className="px-4 py-2 font-medium">{r.prix}</td><td className="px-4 py-2 text-muted-foreground">{r.source}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  ),
});

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>{children}</div>;
}
