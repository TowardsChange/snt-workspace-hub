import { useState } from "react";
import { X, ChevronRight, Folder, Plus, UploadCloud, Search } from "lucide-react";
import { mockFolders, mockPriceLibraryFolders } from "@/mocks/data";
import { useApp } from "@/store/app";

type Tab = "computer" | "documentaire" | "prix";

export function SourcePickerModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("documentaire");
  const { attachedSources, attach } = useApp();

  return (
    <div className="absolute left-0 right-0 mt-2 bg-[var(--soft)] border border-[var(--accent)]/30 rounded-2xl shadow-xl z-30 p-5">
      <div className="flex items-start justify-between gap-4 mb-4">
        <p className="text-sm text-muted-foreground">
          Sélectionnez les documents, ou les dossiers, à analyser par SNT.
        </p>
        <button onClick={onClose} className="p-1 rounded hover:bg-white/60"><X className="size-4" /></button>
      </div>

      <div className="flex items-center justify-center gap-2 mb-4">
        {(
          [
            ["computer", "Depuis l'ordinateur"],
            ["documentaire", "Base documentaire"],
            ["prix", "Bibliothèques de prix"],
          ] as [Tab, string][]
        ).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`px-4 py-1.5 rounded-full text-sm border ${
              tab === k
                ? "bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)]/30 font-medium"
                : "bg-[var(--surface)] border-border text-foreground hover:bg-slate-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "documentaire" && (
        <div>
          <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface)] border border-border text-sm mb-3">
            <span className="size-4 rounded-full bg-[var(--accent)] inline-block" />
            Rechercher dans toute la base documentaire
          </button>
          <div className="bg-[var(--surface)] rounded-xl border border-border divide-y divide-border">
            {mockFolders.map((f) => (
              <div key={f.id} className="flex items-center justify-between px-4 h-[52px]">
                <div className="flex items-center gap-3 min-w-0">
                  <ChevronRight className="size-4 text-muted-foreground" />
                  <Folder className="size-4 text-[var(--accent)]" strokeWidth={1.5} />
                  <span className="text-sm truncate">{f.name}</span>
                  {f.sharing === "all" && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">Tous</span>
                  )}
                </div>
                <button
                  onClick={() => attach(f.id)}
                  disabled={attachedSources.includes(f.id)}
                  className="size-7 rounded-md border border-border hover:bg-slate-50 flex items-center justify-center disabled:opacity-40"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "prix" && (
        <div className="bg-[var(--surface)] rounded-xl border border-border divide-y divide-border">
          {mockPriceLibraryFolders.map((f) => (
            <div key={f.id} className="flex items-center justify-between px-4 h-[52px]">
              <div className="flex items-center gap-3">
                <Folder className="size-4 text-[var(--accent)]" strokeWidth={1.5} />
                <span className="text-sm">{f.name}</span>
              </div>
              <button onClick={() => attach(f.id)} className="size-7 rounded-md border border-border hover:bg-slate-50 flex items-center justify-center">
                <Plus className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === "computer" && <ComputerTab />}
    </div>
  );
}

function ComputerTab() {
  const [files, setFiles] = useState<{ name: string; status: "indexing" | "ready" | "failed" }[]>([]);
  const addMock = () => {
    const name = `nouveau_document_${files.length + 1}.pdf`;
    setFiles((f) => [...f, { name, status: "indexing" }]);
    setTimeout(() => {
      setFiles((f) => f.map((x) => (x.name === name ? { ...x, status: Math.random() < 0.1 ? "failed" : "ready" } : x)));
    }, 6000 + Math.random() * 4000);
  };
  return (
    <div>
      <button
        onClick={addMock}
        className="w-full border-2 border-dashed border-border bg-[var(--surface)] rounded-xl p-8 flex flex-col items-center gap-2 hover:bg-slate-50"
      >
        <UploadCloud className="size-6 text-muted-foreground" />
        <span className="text-sm">Glissez-déposez ou cliquez pour téléverser</span>
      </button>
      {files.length > 0 && (
        <div className="mt-3 bg-[var(--surface)] rounded-xl border border-border divide-y divide-border">
          {files.map((f) => (
            <div key={f.name} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2 text-sm"><Search className="size-4 text-muted-foreground" />{f.name}</div>
              <StatusPill status={f.status} />
            </div>
          ))}
        </div>
      )}
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
  return <span className={`text-xs px-2 py-1 rounded-full ${m.cls}`}>{m.label}</span>;
}
