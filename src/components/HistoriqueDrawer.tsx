import { Link } from "@tanstack/react-router";
import { X, Search } from "lucide-react";
import { useApp } from "@/store/app";
import { mockConversations } from "@/mocks/data";

export function HistoriqueDrawer() {
  const { historiqueOpen, setHistorique } = useApp();
  if (!historiqueOpen) return null;

  const groups: Record<string, typeof mockConversations> = {
    "Aujourd'hui": [],
    Hier: [],
    "Cette semaine": [],
    "Plus ancien": [],
  };
  mockConversations.forEach((c) => {
    const days = (Date.now() - new Date(c.lastMessageAt).getTime()) / 86400000;
    if (days < 1) groups["Aujourd'hui"].push(c);
    else if (days < 2) groups["Hier"].push(c);
    else if (days < 7) groups["Cette semaine"].push(c);
    else groups["Plus ancien"].push(c);
  });

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setHistorique(false)} />
      <aside className="fixed left-0 top-0 h-screen w-[360px] bg-[var(--surface)] border-r border-border z-50 flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-border">
          <h2 className="font-semibold">Historique</h2>
          <button onClick={() => setHistorique(false)} className="p-1 rounded hover:bg-slate-100">
            <X className="size-4" />
          </button>
        </div>
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" strokeWidth={1.5} />
            <input
              placeholder="Rechercher"
              className="w-full pl-9 pr-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {Object.entries(groups).map(
            ([k, items]) =>
              items.length > 0 && (
                <div key={k} className="mb-3">
                  <div className="text-xs font-medium text-muted-foreground px-2 py-1">{k}</div>
                  {items.map((c) => (
                    <Link
                      key={c.id}
                      to="/conversations/$id"
                      params={{ id: c.id }}
                      onClick={() => setHistorique(false)}
                      className="block px-3 py-2 rounded-md hover:bg-slate-50 text-sm"
                    >
                      <div className="truncate">{c.title}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">{new Date(c.lastMessageAt).toLocaleDateString("fr-FR")}</span>
                        {c.agent && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">@{c.agent}</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ),
          )}
        </div>
      </aside>
    </>
  );
}
