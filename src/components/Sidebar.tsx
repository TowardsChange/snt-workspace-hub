import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Search,
  LayoutGrid,
  Target,
  Bot,
  Folder,
  AlignLeft,
  ClipboardList,
  PenTool,
  Users,
  BookOpen,
  HelpCircle,
  Settings,
  Globe,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { SntLogo } from "./SntLogo";
import { useApp } from "@/store/app";
import { useState } from "react";

type Item = { to?: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; label: string; badge?: string | number; muted?: boolean; indent?: boolean };

export function Sidebar() {
  const { user } = useApp();
  const [libsOpen, setLibsOpen] = useState(true);
  const path = useRouterState({ select: (r) => r.location.pathname });

  const top: Item[] = [
    { to: "/notifications", icon: Bell, label: "Notifications", badge: 0 },
    { to: "/home", icon: Search, label: "Spie Batignolles IA" },
  ];

  const libsChildren: Item[] = [
    { to: "/libraries/guided", icon: Target, label: "Recherche guidée", indent: true },
    { to: "/libraries/ai", icon: Bot, label: "Recherche IA", indent: true },
  ];

  const middle: Item[] = [
    { to: "/documents", icon: Folder, label: "Base documentaire" },
    { to: "/compare", icon: AlignLeft, label: "Comparer des devis" },
    { to: "/compliance", icon: ClipboardList, label: "Conformité" },
    { to: "/writing", icon: PenTool, label: "Rédaction assistée" },
  ];

  const bottom: Item[] = [
    { to: "/teams", icon: Users, label: "Equipes" },
    { icon: BookOpen, label: "Guides", muted: true },
    { to: "/help", icon: HelpCircle, label: "Assistance" },
    { to: "/settings", icon: Settings, label: "Paramètres" },
  ];

  return (
    <aside className="w-[260px] shrink-0 h-screen sticky top-0 bg-[var(--surface)] border-r border-border flex flex-col">
      <div className="px-5 py-5">
        <SntLogo />
      </div>
      <div className="px-3 flex-1 overflow-y-auto">
        <nav className="flex flex-col gap-0.5">
          {top.map((it) => (
            <Row key={it.label} item={it} active={path === it.to} />
          ))}

          <button
            onClick={() => setLibsOpen((o) => !o)}
            className="mt-2 flex items-center justify-between px-3 py-2 rounded-md text-sm hover:bg-slate-50 text-foreground"
          >
            <span className="flex items-center gap-3">
              <LayoutGrid className="size-[18px] text-foreground/80" strokeWidth={1.5} />
              Bibliothèques de prix
            </span>
            {libsOpen ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
          </button>
          {libsOpen && libsChildren.map((it) => <Row key={it.label} item={it} active={path === it.to} />)}

          <div className="mt-1">
            {middle.map((it) => (
              <Row key={it.label} item={it} active={path === it.to} />
            ))}
          </div>

          <div className="mt-6">
            {bottom.map((it) => (
              <Row key={it.label} item={it} active={path === it.to} />
            ))}
          </div>

          <button className="mt-3 flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-slate-50 text-foreground">
            <Globe className="size-[18px]" strokeWidth={1.5} />
            FR
            <ChevronDown className="size-4 ml-1" />
          </button>
        </nav>
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
          <Link to="/login" aria-label="logout" className="text-muted-foreground hover:text-foreground">
            <LogOut className="size-4" strokeWidth={1.5} />
          </Link>
        </div>
      )}
    </aside>
  );
}

function Row({ item, active }: { item: Item; active?: boolean }) {
  const Icon = item.icon;
  const cls = `group flex items-center justify-between px-3 py-2 rounded-md text-sm ${
    item.muted
      ? "text-muted-foreground cursor-default"
      : active
      ? "bg-[var(--accent-soft)] text-[var(--accent)] font-medium"
      : "text-foreground hover:bg-slate-50"
  } ${item.indent ? "ml-6" : ""}`;
  const inner = (
    <>
      <span className="flex items-center gap-3">
        <Icon className="size-[18px]" strokeWidth={1.5} />
        {item.label}
      </span>
      {item.badge !== undefined && <span className="text-xs text-muted-foreground">{item.badge}</span>}
    </>
  );
  if (!item.to || item.muted) return <div className={cls}>{inner}</div>;
  return (
    <Link to={item.to} className={cls}>
      {inner}
    </Link>
  );
}
