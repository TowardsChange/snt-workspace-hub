import { createFileRoute, Link } from "@tanstack/react-router";
import { Folder, Plus, Search, Upload } from "lucide-react";
import { mockFolders, mockDocuments } from "@/mocks/data";

export const Route = createFileRoute("/documents")({
  component: DocumentsPage,
});

function DocumentsPage() {
  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Base documentaire</h1>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent)]/90">
          <Upload className="size-4" /> Importer
        </button>
      </div>
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input placeholder="Rechercher dans la base documentaire" className="w-full pl-9 pr-3 py-2 rounded-md border border-border bg-[var(--surface)] text-sm" />
      </div>

      <h2 className="text-sm font-medium text-muted-foreground mb-3">Dossiers</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {mockFolders.map((f) => (
          <Link
            key={f.id}
            to="/documents/folders/$folderId"
            params={{ folderId: f.id }}
            className="bg-[var(--surface)] border border-border rounded-xl p-4 flex items-center justify-between hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Folder className="size-5 text-[var(--accent)]" />
              <div>
                <div className="text-sm font-medium">{f.name}</div>
                {f.isParent && <div className="text-xs text-muted-foreground">Dossier parent</div>}
              </div>
            </div>
            {f.sharing === "all" ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">Tous</span>
            ) : (
              <button className="size-7 rounded-md border border-border flex items-center justify-center"><Plus className="size-3.5" /></button>
            )}
          </Link>
        ))}
      </div>

      <h2 className="text-sm font-medium text-muted-foreground mb-3">Documents récents</h2>
      <div className="bg-[var(--surface)] border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Nom</th>
              <th className="text-left px-4 py-2 font-medium">Taille</th>
              <th className="text-left px-4 py-2 font-medium">Pages</th>
              <th className="text-left px-4 py-2 font-medium">Statut</th>
              <th className="text-left px-4 py-2 font-medium">Importé le</th>
            </tr>
          </thead>
          <tbody>
            {mockDocuments.map((d) => (
              <tr key={d.id} className="border-t border-border">
                <td className="px-4 py-3"><Link to="/documents/files/$fileId" params={{ fileId: d.id }} className="text-foreground hover:text-[var(--accent)]">{d.name}</Link></td>
                <td className="px-4 py-3 text-muted-foreground">{d.size}</td>
                <td className="px-4 py-3 text-muted-foreground">{d.pages}</td>
                <td className="px-4 py-3"><StatusPill status={d.status} /></td>
                <td className="px-4 py-3 text-muted-foreground">{d.uploadedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: "indexing" | "ready" | "failed" }) {
  const map = {
    indexing: { label: "Indexing", cls: "bg-[var(--accent-soft)] text-[var(--accent)]" },
    ready: { label: "Ready", cls: "bg-emerald-50 text-emerald-700" },
    failed: { label: "Échec", cls: "bg-rose-50 text-rose-700" },
  };
  const m = map[status];
  return <span className={`text-xs px-2 py-0.5 rounded-full ${m.cls}`}>{m.label}</span>;
}
