import { createFileRoute, Link } from "@tanstack/react-router";
import { mockDocuments, mockFolders } from "@/mocks/data";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/documents/folders/$folderId")({
  component: FolderPage,
});

function FolderPage() {
  const { folderId } = Route.useParams();
  const folder = mockFolders.find((f) => f.id === folderId);
  const docs = mockDocuments.filter((d) => d.folderId === folderId);
  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      <Link to="/documents" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:text-foreground"><ArrowLeft className="size-4" /> Base documentaire</Link>
      <h1 className="text-2xl font-semibold mb-6">{folder?.name ?? "Dossier"}</h1>
      {docs.length === 0 ? (
        <div className="text-sm text-muted-foreground">Aucun document dans ce dossier.</div>
      ) : (
        <div className="bg-[var(--surface)] border border-border rounded-xl divide-y divide-border">
          {docs.map((d) => (
            <Link key={d.id} to="/documents/files/$fileId" params={{ fileId: d.id }} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50">
              <span className="text-sm">{d.name}</span>
              <span className="text-xs text-muted-foreground">{d.size} · {d.pages} pages</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
