import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

export const Route = createFileRoute("/help")({
  component: () => (
    <div className="p-8 max-w-[900px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Assistance</h1>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input placeholder="Rechercher dans l'aide" className="w-full pl-9 pr-3 py-2.5 rounded-md border border-border bg-[var(--surface)]" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {["Premiers pas", "Agents", "Base documentaire", "Comparer des devis", "Conformité", "Facturation"].map((c) => (
          <div key={c} className="bg-[var(--surface)] border border-border rounded-xl p-5 hover:shadow-sm cursor-pointer">{c}</div>
        ))}
      </div>
    </div>
  ),
});
