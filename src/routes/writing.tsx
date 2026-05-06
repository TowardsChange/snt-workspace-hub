import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { mockFolders } from "@/mocks/data";

export const Route = createFileRoute("/writing")({
  component: WritingPage,
});

function WritingPage() {
  const [brief, setBrief] = useState("Rédiger une note de présentation du projet 7 PAIX pour la direction.");
  const [out, setOut] = useState("");
  const generate = () => {
    setOut("");
    const text = "Le projet 7 PAIX consiste en la valorisation d'un ensemble immobilier situé au 7 rue de la Paix à Paris. La consultation lancée en février 2026 vise à sélectionner les entreprises de gros œuvre, d'enveloppe et de second œuvre. Date limite de remise des offres : 06/04/2026 à 12h00.";
    let i = 0;
    const tick = () => { i += 4; setOut(text.slice(0, i)); if (i < text.length) setTimeout(tick, 30); };
    tick();
  };
  return (
    <div className="p-8 max-w-[1300px] mx-auto h-[calc(100vh-4rem)] flex flex-col">
      <h1 className="text-2xl font-semibold mb-6">Rédaction assistée</h1>
      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        <div className="col-span-5 bg-[var(--surface)] border border-border rounded-xl p-4 flex flex-col">
          <label className="text-xs font-medium text-muted-foreground mb-2">Brief</label>
          <textarea value={brief} onChange={(e) => setBrief(e.target.value)} className="flex-1 resize-none border border-border rounded-md p-3 text-sm" />
          <button onClick={generate} className="mt-3 px-4 py-2 rounded-md bg-[var(--accent)] text-white text-sm font-medium self-start">Générer</button>
        </div>
        <div className="col-span-5 bg-[var(--surface)] border border-border rounded-xl p-4 overflow-y-auto">
          <div className="text-xs font-medium text-muted-foreground mb-2">Résultat</div>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{out || "Le contenu généré apparaîtra ici."}</p>
        </div>
        <div className="col-span-2 bg-[var(--surface)] border border-border rounded-xl p-4">
          <div className="text-xs font-medium text-muted-foreground mb-2">Sources</div>
          <div className="space-y-1">{mockFolders.map((f) => (
            <label key={f.id} className="flex items-center gap-2 text-sm"><input type="checkbox" />{f.name}</label>
          ))}</div>
        </div>
      </div>
    </div>
  );
}
