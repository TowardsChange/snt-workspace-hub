import { createFileRoute, Link } from "@tanstack/react-router";
import { mockAgents } from "@/mocks/data";
import { Bot, Plus } from "lucide-react";

export const Route = createFileRoute("/agents")({
  component: () => (
    <div className="p-8 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Mes agents</h1>
        <Link to="/agents/new" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--accent)] text-white text-sm font-medium"><Plus className="size-4" />Nouvel agent</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockAgents.map((a) => (
          <div key={a.id} className="bg-[var(--surface)] border border-border rounded-xl p-5 flex flex-col">
            <Bot className="size-5 text-[var(--accent)] mb-3" strokeWidth={1.5} />
            <h2 className="font-semibold text-sm mb-1 line-clamp-2">{a.name}</h2>
            <p className="text-xs text-muted-foreground mb-4 flex-1">{a.description}</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-md bg-[var(--accent)] text-white text-xs font-medium">Exécuter</button>
              <Link to="/agents/$agentId" params={{ agentId: a.id }} className="text-xs text-muted-foreground hover:text-foreground">Modifier</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});
