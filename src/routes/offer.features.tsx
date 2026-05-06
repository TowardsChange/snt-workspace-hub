import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";

export const Route = createFileRoute("/offer/features")({
  component: FeaturesPage,
});

type Size = "S" | "M" | "L" | "XL";

type Row = {
  name: string;
  desc: string;
  size: Size;
  effort: number;
};

type Phase = {
  tag: string;
  title: string;
  days: number;
  weeks: string;
  desc: string;
  rows: Row[];
};

const summary = [
  { label: "Charge totale", value: "280", unit: "j-h", sub: "≈ 14 mois-personne" },
  { label: "Calendrier (équipe de 4)", value: "≈ 16", unit: "sem.", sub: "marge incluse pour revue et corrections" },
  { label: "Première démo", value: "≈ 6", unit: "sem.", sub: "Phase 0 + Phase 1" },
  { label: "Phases", value: "4", unit: "", sub: "Socle → RAG → Modules → Agents" },
];

const phases: Phase[] = [
  {
    tag: "PHASE 0",
    title: "Socle technique",
    days: 40,
    weeks: "≈ 2 semaines calendaires",
    desc: "Authentification, ossature applicative, infrastructure et socle de sécurité. Peu spectaculaire, mais bloquant pour toutes les phases suivantes. Vise une conformité de niveau entreprise dès le premier jour — la lacune que Batisia laisse ouverte.",
    rows: [
      { name: "Authentification Microsoft (MSAL)", desc: "Connexion Azure AD / Entra ID via MSAL, gestion de session, déconnexion, rafraîchissement de jeton. Indispensable pour SPIE ; comble la lacune MFA de Batisia.", size: "M", effort: 8 },
      { name: "Ossature applicative et navigation", desc: "Barre latérale à sections groupées (Application / Offre), barre supérieure, mise en page responsive, sélecteur de langue (FR / EN), cloche de notifications, fil d'Ariane.", size: "M", effort: 7 },
      { name: "Rôles et permissions", desc: "Trois rôles (Admin, Manager d'équipe, Utilisateur), ACL par projet et par document, drapeau « Tous » au niveau de l'espace de travail, fenêtre de partage.", size: "L", effort: 9 },
      { name: "Gestion des utilisateurs et des équipes", desc: "Flux d'invitation, objets équipe, liste des membres, accès documentaire par équipe, transfert de propriété.", size: "M", effort: 6 },
      { name: "Paramètres et profil", desc: "Profil utilisateur, paramètres de l'espace de travail, préférences de notifications, langue, thème.", size: "S", effort: 3 },
      { name: "Journal d'audit et observabilité", desc: "Qui a demandé quoi, quelle réponse a été produite, quelle source a été citée. Indispensable pour les usages sensibles côté achats. Lacune de Batisia.", size: "M", effort: 7 },
    ],
  },
  {
    tag: "PHASE 1",
    title: "Cœur RAG",
    days: 85,
    weeks: "≈ 4 semaines calendaires",
    desc: "Le cœur de Batisia, reproduit et amélioré. Ingestion documentaire, recherche, composeur de conversation unifié et visionneuse latérale avec surlignage des passages cités. Fin de phase 1 = une démo fonctionnelle que Pascal peut présenter au conseil.",
    rows: [
      { name: "Pipeline RAG", desc: "Ingestion documentaire, découpage adapté au BTP (gestion des structures CCTP, CCAP, DCE), embeddings, base vectorielle. Cible de latence d'indexation < 1 min/doc — contre ≈ 10 min chez Batisia.", size: "XL", effort: 25 },
      { name: "Orchestration des LLM", desc: "Abstraction multi-fournisseurs (Mistral, GPT, Claude, modèle interne), réponses en streaming, gestion des templates de prompt, suivi des coûts. Compatible BYO-LLM.", size: "L", effort: 10 },
      { name: "Base documentaire", desc: "Arborescence hiérarchique (Mémoires Technique → projets), liste de fichiers avec pastilles de statut (indexation / prêt / échec), zone de dépôt, import par lots, OCR de secours, actions par document.", size: "L", effort: 14 },
      { name: "Composeur de conversation unifié", desc: "Champ de saisie « Que cherchez-vous ? » avec trombone → modale de choix des sources, déclencheur @ → sélecteur d'agents, bouton d'envoi, streaming des tokens, pastilles de citations en ligne.", size: "XL", effort: 14 },
      { name: "Modale de choix des sources", desc: "Modale à 3 onglets (Depuis l'ordinateur / Base documentaire / Bibliothèques de prix), arborescence avec déploiement et +, sélection multiple, pastille de recherche globale.", size: "M", effort: 7 },
      { name: "Visionneuse documentaire et citations", desc: "Visionneuse PDF latérale, vignettes de pages avec cadre orange sur la page active, zoom, navigation par page, passage cité surligné en jaune, citations multi-passages avec score de confiance.", size: "L", effort: 10 },
      { name: "Historique", desc: "Panneau des conversations passées, recherche, reprise de n'importe quelle conversation, renommage, archivage, partage avec un collègue.", size: "S", effort: 5 },
    ],
  },
  {
    tag: "PHASE 2",
    title: "Modules métiers",
    days: 100,
    weeks: "≈ 5 semaines calendaires",
    desc: "Les quatre modules métiers de la barre latérale de Batisia, chacun ciblant un workflow précis chez SPIE Batignolles : achats, conformité, rédaction et bibliothèque de prix.",
    rows: [
      { name: "Bibliothèques de prix — Recherche guidée", desc: "Filtres structurés (nature de travaux, rubrique BPU, plage de dates, géographie), résultats tabulaires, export. Indexation du corpus historique de prix.", size: "L", effort: 12 },
      { name: "Bibliothèques de prix — Recherche IA", desc: "Recherche en langage naturel réutilisant le composeur de conversation, périmètre limité au corpus de prix, avec citations renvoyant à l'opération d'origine.", size: "S", effort: 5 },
      { name: "Comparer des devis", desc: "Import des propositions fournisseurs hétérogènes, normalisation des lignes, tableau comparatif côte à côte, recommandation IA, export Excel. Promesse marketing : 15 min contre 3 heures.", size: "XL", effort: 28 },
      { name: "Conformité", desc: "Vérification d'un document contre un référentiel contractuel ou réglementaire ; rapport d'écarts avec sévérité, citation et correction suggérée. Référentiels BTP préchargés + personnalisés.", size: "XL", effort: 25 },
      { name: "Rédaction assistée", desc: "Rédaction de mémoires techniques, synthèses et sections appuyées sur le corpus de l'entreprise. Plateau de citations en direct, édition / affinage, régénération par section, export DOCX/PDF.", size: "XL", effort: 22 },
      { name: "Réponses inter-corpus", desc: "Réponse unique combinant une clause de la Base documentaire et un prix des Bibliothèques de prix — une fonctionnalité que Batisia laisse entendre mais ne livre pas visiblement.", size: "M", effort: 8 },
    ],
  },
  {
    tag: "PHASE 3",
    title: "Agents, intégrations et finition",
    days: 55,
    weeks: "≈ 3 semaines calendaires",
    desc: "La couche agents (l'extension de workflow effectivement utilisée chez SPIE), les intégrations entreprise que toute direction des achats demandera, et la passe de finition qui fait passer le produit de « fonctionnel » à « crédible devant le conseil ».",
    rows: [
      { name: "Agents — exécution", desc: "Sélecteur déclenché par @, invocation d'agents sur les sources attachées, exécution séquencée de plusieurs prompts, rendu structuré des réponses. Livré avec les 10 agents d'analyse de risques SPIE préconfigurés.", size: "L", effort: 12 },
      { name: "Agents — éditeur", desc: "Éditeur visuel pour créer, versionner, partager et paramétrer des agents. Bac à sable de test, enregistrement en brouillon, publication dans l'espace de travail.", size: "L", effort: 12 },
      { name: "Intégrations natives", desc: "SharePoint, OneDrive, Teams, ainsi que des connecteurs vers la GED et l'ERP de SPIE. Aucune intégration nommée sur le site de Batisia — barrière concurrentielle.", size: "L", effort: 10 },
      { name: "Annotation documentaire", desc: "Annotations en ligne et commentaires partagés sur les pages de la visionneuse PDF. Transforme la visionneuse en lecture seule de Batisia en surface de travail.", size: "M", effort: 8 },
      { name: "Mobile et tablette", desc: "Passe responsive pour les ingénieurs sur chantier consultant les documents sur tablette. Batisia n'a aujourd'hui aucune présence mobile.", size: "S", effort: 6 },
      { name: "Finition, performance, supervision", desc: "Passe de performance sur la recherche et la visionneuse, gestion des erreurs, Sentry/Grafana, analytics, accessibilité (WCAG), recette finale.", size: "S", effort: 7 },
    ],
  },
];

const sizeStyles: Record<Size, string> = {
  S: "bg-emerald-50 border-emerald-200 text-emerald-800",
  M: "bg-amber-50 border-amber-200 text-amber-800",
  L: "bg-orange-100 border-orange-300 text-orange-900",
  XL: "bg-red-50 border-red-200 text-red-800",
};

function SizeBadge({ size }: { size: Size }) {
  return (
    <span
      className={`inline-flex items-center justify-center min-w-[28px] px-2 py-0.5 rounded-md border text-[11px] font-semibold ${sizeStyles[size]}`}
    >
      {size}
    </span>
  );
}

function PhaseSection({ phase }: { phase: Phase }) {
  return (
    <section className="space-y-4">
      <div
        className="flex items-end justify-between gap-4 pb-3"
        style={{ borderBottom: "2px solid var(--accent)" }}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-mono font-semibold tracking-wide text-white"
            style={{ background: "#1A2540" }}
          >
            {phase.tag}
          </span>
          <h2 className="text-[24px] font-bold tracking-tight text-foreground">
            {phase.title}
          </h2>
        </div>
        <div className="text-sm text-muted-foreground text-right tabular-nums whitespace-nowrap">
          <span className="font-semibold text-foreground">{phase.days} jours</span>{" "}
          · {phase.weeks}
        </div>
      </div>

      <p className="text-[14.5px] text-muted-foreground max-w-[760px] leading-relaxed">
        {phase.desc}
      </p>

      <div
        className="rounded-xl border shadow-sm overflow-hidden"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--soft)" }}>
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Fonctionnalité
              </th>
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Description
              </th>
              <th className="text-center px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-[80px]">
                Taille
              </th>
              <th className="text-right px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-[90px]">
                Charge
              </th>
            </tr>
          </thead>
          <tbody>
            {phase.rows.map((row, i) => (
              <tr
                key={i}
                style={{
                  borderTop: "1px solid var(--border)",
                }}
              >
                <td className="px-4 py-4 align-top font-semibold text-foreground w-[260px]">
                  {row.name}
                </td>
                <td className="px-4 py-4 align-top text-muted-foreground text-[13.5px] leading-relaxed">
                  {row.desc}
                </td>
                <td className="px-4 py-4 align-top text-center">
                  <SizeBadge size={row.size} />
                </td>
                <td className="px-4 py-4 align-top text-right tabular-nums font-semibold text-foreground">
                  {row.effort}
                </td>
              </tr>
            ))}
            <tr style={{ background: "var(--soft)", borderTop: "1px solid var(--border)" }}>
              <td
                colSpan={3}
                className="px-4 py-3 text-sm font-semibold uppercase tracking-wide"
                style={{ color: "#d97f12" }}
              >
                Sous-total {phase.tag}
              </td>
              <td
                className="px-4 py-3 text-right tabular-nums font-bold"
                style={{ color: "#d97f12" }}
              >
                {phase.days}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

const recapStats = [
  { label: "Phase 0", value: "40" },
  { label: "Phase 1", value: "85" },
  { label: "Phase 2", value: "100" },
  { label: "Phase 3", value: "55" },
];

const notes: React.ReactNode[] = [
  "Les charges sont exprimées en jours-homme. 1 j-h = 1 personne, 1 jour travaillé, 7 heures productives.",
  "Les semaines calendaires supposent une équipe de 4 (1 ingénieur full-stack · 1 ingénieur IA · 1 lead architecte IA · 1 chef de projet) avec un parallélisme réaliste — et non un simple 280 ÷ 4.",
  <>
    Échelle de taille : <SizeBadge size="S" /> ≤ 5 j · <SizeBadge size="M" /> 6–10 j ·{" "}
    <SizeBadge size="L" /> 11–15 j · <SizeBadge size="XL" /> 16 j et plus.
  </>,
  "Les limites de phase sont des points d'engagement. Chaque phase se termine par une revue et une validation avant le démarrage de la suivante.",
  "Phase 0 + Phase 1 = la première démo fonctionnelle présentée au conseil (≈ 6 semaines, 125 j-h). Les phases 2–3 ajoutent la parité concurrentielle et les extensions.",
  "Exclus de cette estimation : ateliers de cadrage, gestion de projet, customer-success / formation, coûts d'hébergement, coûts d'inférence LLM, contenu (les 10 agents d'analyse de risques SPIE sont ré-implémentés ; leur contenu de prompts est co-écrit avec SPIE pendant la phase 3).",
];

function FeaturesPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-10 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Hero */}
        <header className="space-y-4">
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--accent)" }}
          >
            Offre · Fonctionnalités et charges
          </div>
          <h1 className="text-[44px] font-bold tracking-tight leading-[1.05] text-foreground">
            Ce que nous construirions, et le temps qu'il faudrait.
          </h1>
          <p className="text-[17px] text-muted-foreground max-w-[720px] leading-relaxed">
            Une alternative à Batisia détenue par SPIE Batignolles, découpée en
            quatre phases de livraison. Les charges sont exprimées en jours-homme,
            calibrées pour une équipe mixte d'un ingénieur full-stack, d'un
            ingénieur IA, d'un lead architecte IA et d'un chef de projet. Première
            démo fonctionnelle dès la phase 1 ; parité fonctionnelle complète et
            extensions compétitives à la fin de la phase 3.
          </p>
        </header>

        {/* Summary card */}
        <div
          className="rounded-2xl border shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          {summary.map((s, i) => (
            <div
              key={i}
              className={`p-6 ${
                i > 0 ? "border-t md:border-t-0 lg:border-t-0 md:border-l lg:border-l" : ""
              } ${i === 2 ? "md:border-t lg:border-t-0" : ""}`}
              style={{ borderColor: "var(--border)" }}
            >
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {s.label}
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-[28px] font-bold tracking-tight text-foreground leading-none">
                  {s.value}
                </span>
                {s.unit && (
                  <span className="text-[14px] text-muted-foreground font-medium">
                    {s.unit}
                  </span>
                )}
              </div>
              <p className="mt-2 text-[12.5px] text-muted-foreground leading-snug">
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Phases */}
        {phases.map((phase) => (
          <PhaseSection key={phase.tag} phase={phase} />
        ))}

        {/* Recap */}
        <div
          className="rounded-2xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{ background: "#1A2540", color: "#fff" }}
        >
          <div className="space-y-4">
            <h3 className="text-[26px] font-bold tracking-tight text-white">
              Total — 280 jours-homme
            </h3>
            <p className="text-[14.5px] text-white/70 leading-relaxed max-w-[460px]">
              Réparti sur quatre phases, avec une démo fonctionnelle dès la fin
              de la phase 1. Construit sur Microsoft Azure (alignement avec le
              tenant existant de SPIE), avec MFA, journal d'audit et SSO dès le
              premier jour. Les estimations couvrent uniquement l'ingénierie —
              la phase de cadrage, la gestion de projet et la couche
              customer-success sont chiffrées séparément.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {recapStats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-white/[0.06] border border-white/10 p-5"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
                  {s.label}
                </div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-[32px] font-bold tracking-tight text-white leading-none tabular-nums">
                    {s.value}
                  </span>
                  <span className="text-[14px] text-white/60 font-medium">j</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology notes */}
        <div
          className="rounded-2xl border shadow-sm p-8"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <h3 className="text-[18px] font-bold tracking-tight text-foreground mb-4">
            Méthodologie et hypothèses
          </h3>
          <ul className="space-y-3">
            {notes.map((note, i) => (
              <li
                key={i}
                className="flex gap-3 text-[14px] text-muted-foreground leading-relaxed items-start"
              >
                <span
                  className="mt-2 inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--accent)" }}
                />
                <span className="flex-1 [&>span]:mx-0.5">{note}</span>
              </li>
            ))}
          </ul>
        </div>

        <footer className="text-[12px] text-muted-foreground text-center pt-4">
          SpieB.ai — document de travail interne · préparé par Anis Lachkar pour
          Pascal Bigard, SPIE Batignolles
        </footer>
      </div>
    </div>
  );
}
