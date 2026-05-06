import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { mockDocuments } from "@/mocks/data";

export const Route = createFileRoute("/compliance")({
  component: CompliancePage,
});

function CompliancePage() {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const run = () => {
    setRunning(true);
    setDone(false);
    setTimeout(() => { setRunning(false); setDone(true); }, 8000);
  };
  const results = [
    { clause: "Article 3 - Délais d'exécution", status: "Conforme" },
    { clause: "Article 7 - Garanties financières", status: "À vérifier" },
    { clause: "Article 12 - Sous-traitance", status: "Non conforme" },
    { clause: "Article 18 - Pénalités de retard", status: "Conforme" },
    { clause: "Article 22 - Assurances", status: "À vérifier" },
  ];
  return (
    <div className="p-8 max-w-[1100px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Vérification de conformité</h1>
      <div className="bg-[var(--surface)] border border-border rounded-xl p-5 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div><label className="text-xs text-muted-foreground">Document</label>
          <select className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm">{mockDocuments.map((d) => <option key={d.id}>{d.name}</option>)}</select>
        </div>
        <div><label className="text-xs text-muted-foreground">Référentiel</label>
          <select className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm"><option>Loi MOP</option><option>Code des marchés publics</option><option>Norme ISO 9001</option><option>PSSE interne SPIE</option></select>
        </div>
        <button onClick={run} disabled={running} className="px-4 py-2 rounded-md bg-[var(--accent)] text-white text-sm font-medium disabled:opacity-50">
          {running ? "Analyse en cours…" : "Lancer l'analyse"}
        </button>
      </div>
      {done && (
        <div className="bg-[var(--surface)] border border-border rounded-xl divide-y divide-border">
          {results.map((r) => {
            const cls = r.status === "Conforme" ? "bg-emerald-50 text-emerald-700" : r.status === "À vérifier" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700";
            return (
              <div key={r.clause} className="flex items-center justify-between px-4 py-3">
                <span className="text-sm">{r.clause}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${cls}`}>{r.status}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
