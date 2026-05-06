import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/agents/new")({
  component: () => <AgentBuilder title="Nouvel agent" />,
});

export function AgentBuilder({ title }: { title: string }) {
  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      <Link to="/agents" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:text-foreground"><ArrowLeft className="size-4" />Mes agents</Link>
      <h1 className="text-2xl font-semibold mb-6">{title}</h1>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-7 bg-[var(--surface)] border border-border rounded-xl p-5 space-y-4">
          <Field label="Nom"><input className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm" defaultValue="Mon agent" /></Field>
          <Field label="Description"><textarea rows={3} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm" /></Field>
          <Field label="Prompts (ordonnés)"><textarea rows={6} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm font-mono text-xs" defaultValue="1. Identifier les éléments clés du document\n2. Synthétiser en 5 points" /></Field>
          <div className="flex items-center gap-3"><label className="text-sm">Format de sortie</label>
            <select className="px-3 py-1.5 rounded-md border border-border bg-background text-sm"><option>Markdown</option><option>JSON</option><option>Texte</option></select>
          </div>
          <button className="px-4 py-2 rounded-md bg-[var(--accent)] text-white text-sm font-medium">Enregistrer</button>
        </div>
        <div className="col-span-5 bg-[var(--surface)] border border-border rounded-xl p-5">
          <div className="text-xs font-medium text-muted-foreground mb-2">Test run</div>
          <p className="text-sm text-muted-foreground">Lancez un test pour visualiser le rendu de l'agent ici.</p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>{children}</div>;
}
