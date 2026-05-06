import { createFileRoute } from "@tanstack/react-router";
import architectureDiagram from "@/assets/architecture.png";

export const Route = createFileRoute("/offer/architecture")({
  component: ArchitecturePage,
});

const summary = [
  { label: "Région", value: "France Central", sub: "100 % souveraineté FR" },
  { label: "Réseau", value: "Privé", sub: "Private Endpoints sur tous les services" },
  { label: "Identité", value: "Entra ID", sub: "MSAL côté SPA + API" },
  { label: "Tenancy", value: "Mono-tenant", sub: "VNet dédié par client" },
];

const legend: { color: string; label: string }[] = [
  { color: "#0078D4", label: "Service Azure" },
  { color: "#F59A23", label: "Service IA Azure" },
  { color: "#21A366", label: "Microsoft 365" },
  { color: "#1A2540", label: "Frontend" },
  { color: "#6B7280", label: "Observabilité & CI/CD" },
];

function ArchitecturePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full" style={{ background: "var(--soft)" }}>
      <div className="mx-auto max-w-[1100px] px-6 py-10 space-y-8">
        {/* Diagram image */}
        <div
          className="rounded-2xl overflow-hidden border"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            boxShadow: "0 1px 2px rgba(16,24,40,0.04), 0 8px 24px rgba(16,24,40,0.04)",
          }}
        >
          <img
            src={architectureDiagram}
            alt="Architecture SpieB.ai sur Azure France Central"
            className="w-full h-auto block"
          />
        </div>

        {/* Hero */}
        <div className="space-y-4">
          <div
            className="text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ color: "var(--accent)" }}
          >
            Offre · Architecture
          </div>
          <h1 className="text-foreground font-bold tracking-tight" style={{ fontSize: 44, lineHeight: 1.1 }}>
            Comment c'est construit, et où vit chaque chose.
          </h1>
          <p
            className="text-muted-foreground"
            style={{ fontSize: 17, lineHeight: 1.55, maxWidth: 760 }}
          >
            Construit entièrement sur Microsoft Azure et Microsoft 365, déployé dans la
            région France Central, avec liaisons privées de bout en bout. Authentification
            Entra ID, fichiers dans SharePoint, conversations dans PostgreSQL, IA via
            Azure OpenAI.
          </p>
        </div>

        {/* Summary card */}
        <div
          className="rounded-2xl border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          {summary.map((s) => (
            <div key={s.label} className="p-6 space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {s.label}
              </div>
              <div className="text-foreground font-bold" style={{ fontSize: 24, lineHeight: 1.2 }}>
                {s.value}
              </div>
              <div className="text-muted-foreground" style={{ fontSize: 12.5, lineHeight: 1.45 }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div
          className="rounded-2xl border p-4 flex flex-wrap items-center gap-x-6 gap-y-3"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          {legend.map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <span
                className="inline-block rounded-full"
                style={{ width: 8, height: 8, background: l.color }}
              />
              <span className="text-sm text-foreground">{l.label}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 text-xs text-muted-foreground">
          SpieB.ai — document de travail interne · préparé par Anis Lachkar pour Pascal
          Bigard, SPIE Batignolles
        </div>
      </div>
    </div>
  );
}
