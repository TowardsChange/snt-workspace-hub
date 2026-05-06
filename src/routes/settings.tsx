import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const [tab, setTab] = useState<"profil" | "securite" | "integrations">("profil");
  return (
    <div className="p-8 max-w-[1000px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Paramètres</h1>
      <div className="flex gap-2 mb-6 border-b border-border">
        {([["profil", "Profil"], ["securite", "Sécurité"], ["integrations", "Intégrations"]] as const).map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={`px-4 py-2 text-sm border-b-2 -mb-px ${tab === k ? "border-[var(--accent)] text-[var(--accent)] font-medium" : "border-transparent text-muted-foreground"}`}>{l}</button>
        ))}
      </div>
      {tab === "profil" && (
        <div className="bg-[var(--surface)] border border-border rounded-xl p-6 space-y-4 max-w-xl">
          <Field label="Nom"><input className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm" defaultValue="Sarah Doucet" /></Field>
          <Field label="Email"><input className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm" defaultValue="sarah.doucet@spiebatignolles.com" /></Field>
        </div>
      )}
      {tab === "securite" && (
        <div className="bg-[var(--surface)] border border-border rounded-xl p-6 max-w-2xl">
          <h2 className="font-semibold mb-2">Authentification à deux facteurs</h2>
          <p className="text-sm text-muted-foreground mb-4">Renforcez la sécurité de votre compte en activant la 2FA.</p>
          <button className="px-4 py-2 rounded-md bg-[var(--accent)] text-white text-sm font-medium">Configurer</button>
        </div>
      )}
      {tab === "integrations" && (
        <div className="grid grid-cols-2 gap-4">
          {["SharePoint", "OneDrive", "Microsoft Teams", "NetSuite", "Aconex", "Procore"].map((i) => (
            <div key={i} className="bg-[var(--surface)] border border-border rounded-xl p-5 flex items-center justify-between">
              <span className="font-medium">{i}</span>
              <button className="px-3 py-1.5 rounded-md border border-border text-sm hover:bg-slate-50">Connecter</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>{children}</div>;
}
