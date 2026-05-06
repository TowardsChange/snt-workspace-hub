import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { mockMessages, mockDocuments, type Citation } from "@/mocks/data";
import { ChatComposer } from "@/components/ChatComposer";
import { PdfViewer } from "@/components/PdfViewer";
import { Copy, X } from "lucide-react";
import { SntLogo } from "@/components/SntLogo";
import { toast } from "sonner";

export const Route = createFileRoute("/conversations/$id")({
  component: ConversationPage,
});

function ConversationPage() {
  const { id } = Route.useParams();
  const messages = useMemo(() => mockMessages.filter((m) => m.conversationId === id), [id]);
  const userMsg = messages.find((m) => m.role === "user");
  const assistant = messages.find((m) => m.role === "assistant");
  const [streamed, setStreamed] = useState("");
  const [showCitations, setShowCitations] = useState(false);
  const [openCitation, setOpenCitation] = useState<Citation | null>(null);

  useEffect(() => {
    if (!assistant) return;
    setStreamed("");
    setShowCitations(false);
    const full = assistant.content;
    let i = 0;
    const tick = () => {
      i += Math.max(1, Math.round(full.length / 80));
      setStreamed(full.slice(0, i));
      if (i < full.length) setTimeout(tick, 25);
      else setTimeout(() => setShowCitations(true), 600);
    };
    setTimeout(tick, 200);
  }, [assistant]);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className={`flex flex-col flex-1 min-w-0 border-r border-border ${openCitation ? "" : ""}`}>
        <div className="px-8 py-5 border-b border-border">
          <h1 className="text-lg font-medium">{userMsg?.content}</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {userMsg && (
            <div className="flex justify-end items-start gap-3">
              <div className="max-w-[70%] bg-[var(--soft)] border border-border rounded-2xl px-4 py-3 text-sm">{userMsg.content}</div>
              <div className="size-8 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-xs font-semibold">Sar</div>
            </div>
          )}
          {assistant && (
            <div>
              <div className="flex items-center gap-2 mb-2"><SntLogo size={18} /></div>
              <div
                className="prose prose-sm max-w-none text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: streamed.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }}
              />
              {showCitations && assistant.citations && (
                <div className="mt-4 space-y-2 animate-in fade-in zoom-in-95 duration-300">
                  {assistant.citations.map((c, i) => {
                    const doc = mockDocuments.find((d) => d.id === c.docId);
                    return (
                      <button
                        key={c.id}
                        onClick={() => setOpenCitation(c)}
                        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <span>{c.label}</span>
                        <span className="truncate max-w-[280px]">{doc?.name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-medium">[{i + 1}]</span>
                      </button>
                    );
                  })}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(assistant.content);
                      toast.success("Copié");
                    }}
                    className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Copy className="size-3.5" /> Copier
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="px-8 py-4 border-t border-border bg-[var(--surface)]">
          <ChatComposer small />
        </div>
      </div>
      {openCitation && (
        <div className="w-1/2 min-w-[480px] flex flex-col bg-[var(--surface)]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="text-sm font-medium truncate">{mockDocuments.find((d) => d.id === openCitation.docId)?.name}</div>
            <button onClick={() => setOpenCitation(null)} className="p-1 rounded hover:bg-slate-100"><X className="size-4" /></button>
          </div>
          <PdfViewer page={openCitation.page} highlight={openCitation.snippet} />
        </div>
      )}
    </div>
  );
}
