import { Link } from "@tanstack/react-router";
import { PanelLeft, MessageSquarePlus, Bot, BookOpen } from "lucide-react";
import { useApp } from "@/store/app";

export function Topbar() {
  const setHistorique = useApp((s) => s.setHistorique);
  return (
    <header className="h-16 bg-[var(--surface)] border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setHistorique(true)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-[var(--surface)] px-4 py-2 text-sm hover:bg-slate-50"
        >
          <PanelLeft className="size-4" strokeWidth={1.5} />
          Historique
        </button>
        <Link
          to="/home"
          aria-label="Nouvelle conversation"
          className="inline-flex items-center justify-center size-9 rounded-full bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90"
        >
          <MessageSquarePlus className="size-4" strokeWidth={1.75} />
        </Link>
      </div>
      <div className="text-base font-semibold tracking-tight">SpieB AI</div>
      <div className="flex items-center gap-2">
        <Link
          to="/agents"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-[var(--surface)] px-4 py-2 text-sm hover:bg-slate-50"
        >
          <Bot className="size-4" strokeWidth={1.5} />
          Mes agents
        </Link>
        <Link
          to="/documents"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-[var(--surface)] px-4 py-2 text-sm hover:bg-slate-50"
        >
          <BookOpen className="size-4" strokeWidth={1.5} />
          Base documentaire
        </Link>
      </div>
    </header>
  );
}
