import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Table2, BookOpen, Bot, BarChart3, BadgeCheck, ArrowUpRight } from "lucide-react";
import { ChatComposer } from "@/components/ChatComposer";

export const Route = createFileRoute("/home")({
  component: HomePage,
});

function HomePage() {
  const nav = useNavigate();
  const tiles = [
    { label: "Rechercher la bibliothèque de prix", icon: Table2, onClick: () => nav({ to: "/libraries/ai" }) },
    { label: "Interroger la base documentaire", icon: BookOpen, onClick: () => nav({ to: "/documents" }) },
    { label: "Utiliser un agent", icon: Bot, arrow: true, onClick: () => nav({ to: "/agents" }) },
    { label: "Comparer des devis", icon: BarChart3, arrow: true, onClick: () => nav({ to: "/compare" }) },
    { label: "Vérification de conformité", icon: BadgeCheck, arrow: true, onClick: () => nav({ to: "/compliance" }) },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-[960px]">
        <h1 className="text-center text-[32px] font-normal tracking-tight mb-8">Que cherchez-vous ?</h1>
        <ChatComposer
          onSend={(text, agent) => {
            if (text || agent) nav({ to: "/conversations/$id", params: { id: "c1" } });
          }}
        />
        <div className="mt-6 bg-[var(--soft)] border border-[var(--accent)]/20 rounded-2xl p-5">
          <p className="text-sm text-muted-foreground mb-4">Que souhaitez-vous faire ? L'assistant est là pour vous aider.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {tiles.map((t) => {
              const I = t.icon;
              return (
                <button
                  key={t.label}
                  onClick={t.onClick}
                  className="relative bg-[var(--surface)] border border-border rounded-xl p-4 text-left hover:shadow-sm hover:border-foreground/20 transition min-h-[104px] flex flex-col justify-between"
                >
                  <I className="size-5 text-[var(--accent)]" strokeWidth={1.5} />
                  {t.arrow && <ArrowUpRight className="size-4 absolute top-3 right-3 text-muted-foreground" />}
                  <span className="text-sm font-medium leading-snug">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
