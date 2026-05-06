import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Search,
  Folder,
  LayoutGrid,
  AlignLeft,
  ClipboardList,
  PenTool,
  Bot,
  Users,
  Settings,
  HelpCircle,
  MessageSquare,
  Layers,
  Network,
  LogOut,
} from "lucide-react";
import { SpiebLogo } from "./SpiebLogo";
import { useApp } from "@/store/app";

type Item = {
  to: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  badge?: string | number;
};

export function Sidebar() {
  const { user } = useApp();
  const path = useRouterState({ select: (r) => r.location.pathname });

  const application: Item[] = [
    { to: "/home", icon: Search, label: "Spie Batignolles IA" },
    { to: "/conversations", icon: MessageSquare, label: "Conversations" },
    { to: "/documents", icon: Folder, label: "Base documentaire" },
    { to: "/libraries", icon: LayoutGrid, label: "Bibliothèques de prix" },
    { to: "/compare", icon: AlignLeft, label: "Comparer des devis" },
    { to: "/compliance", icon: ClipboardList, label: "Conformité" },
    { to: "/writing", icon: PenTool, label: "Rédaction assistée" },
    { to: "/agents", icon: Bot, label: "Mes agents" },
    { to: "/teams", icon: Users, label: "Equipes" },
    { to: "/settings", icon: Settings, label: "Paramètres" },
    { to: "/help", icon: HelpCircle, label: "Assistance" },
    { to: "/notifications", icon: Bell, label: "Notifications", badge: 0 },
  ];

  const offer: Item[] = [
    { to: "/offer/features", icon: Layers, label: "Fonctionnalités & tarifs" },
    { to: "/offer/architecture", icon: Network, label: "Architecture" },
  ];

  return (
    <aside className="w-[260px] shrink-0 h-screen sticky top-0 bg-[var(--surface)] border-r border-border flex flex-col">
      <div className="px-5 py-5">
        <SpiebLogo />
      </div>
      <div className="px-3 flex-1 overflow-y-auto">
        <Section label="APPLICATION" items={application} path={path} />
        <div className="my-3 border-t border-border" />
        <Section label="OFFRE" items={offer} path={path} />
      </div>

      {user && (
        <div className="m-3 p-3 rounded-xl border border-border bg-[var(--surface)] flex items-center gap-3">
          <div className="size-9 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-xs font-semibold">
            {user.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium truncate">{user.name}</div>
            <div className="text-xs text-muted-foreground truncate">{user.email}</div>
          </div>
          <Link to="/" aria-label="logout" className="text-muted-foreground hover:text-foreground">
            <LogOut className="size-4" strokeWidth={1.5} />
          </Link>
        </div>
      )}
    </aside>
  );
}

function Section({ label, items, path }: { label: string; items: Item[]; path: string }) {
  return (
    <nav className="flex flex-col gap-0.5">
      <div className="px-3 pt-2 pb-1 text-[11px] font-semibold tracking-[0.06em] text-muted-foreground">
        {label}
      </div>
      {items.map((it) => {
        const Icon = it.icon;
        const active = path === it.to;
        const cls = `group flex items-center justify-between px-3 py-2 rounded-md text-sm ${
          active
            ? "bg-[var(--accent-soft)] text-[var(--accent)] font-medium"
            : "text-foreground hover:bg-slate-50"
        }`;
        return (
          <Link key={it.label} to={it.to} className={cls}>
            <span className="flex items-center gap-3">
              <Icon className="size-[18px]" strokeWidth={1.5} />
              {it.label}
            </span>
            {it.badge !== undefined && <span className="text-xs text-muted-foreground">{it.badge}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
