export const mockWorkspace = { id: "w1", name: "Spie Batignolles IA" };

export const mockCurrentUser = {
  id: "u1",
  name: "Sarah Doucet",
  email: "sarah.doucet@spiebatignolles.com",
  role: "Team manager" as const,
  initials: "Sar",
};

export const mockUsers = [
  { id: "u1", name: "Sarah Doucet", email: "sarah.doucet@spiebatignolles.com", role: "Team manager", avatar: "Sar", lastActive: "Aujourd'hui" },
  { id: "u2", name: "Romaric Mathieu", email: "romaric.mathieu-ext@spiebatignolles.com", role: "User", avatar: "Rom", lastActive: "Hier" },
  { id: "u3", name: "Pascal Durand", email: "pascal.durand@spiebatignolles.com", role: "Admin", avatar: "Pas", lastActive: "Aujourd'hui" },
  { id: "u4", name: "Anne Lefèvre", email: "anne.lefevre@spiebatignolles.com", role: "Team manager", avatar: "Ann", lastActive: "Il y a 3 jours" },
  { id: "u5", name: "Thomas Rousseau", email: "thomas.rousseau@spiebatignolles.com", role: "User", avatar: "Tho", lastActive: "Cette semaine" },
];

export const mockFolders = [
  { id: "f0", name: "Mémoires Technique", isParent: true, sharing: "team" as const },
  { id: "f1", name: "VALHUBERT", isParent: false, sharing: "team" as const },
  { id: "f2", name: "MYSL", isParent: false, sharing: "team" as const },
  { id: "f3", name: "PENTIEVRE", isParent: false, sharing: "team" as const },
  { id: "f4", name: "SAFRAN MVL", isParent: false, sharing: "team" as const },
  { id: "f5", name: "7 PAIX", isParent: false, sharing: "team" as const },
  { id: "f6", name: "DCE SOURCE PLESSIS", isParent: false, sharing: "all" as const },
];

export type DocStatus = "ready" | "indexing" | "failed";
export const mockDocuments = [
  { id: "d1", folderId: "f5", name: "7PAIX_DCE_RC_EG-COQUE_260206.pdf", size: "3.4 MB", pages: 11, status: "ready" as DocStatus, uploadedAt: "2026-02-06", uploadedBy: "u3" },
  { id: "d2", folderId: "f5", name: "7PAIX_CCTP_LOT02_GO.pdf", size: "5.1 MB", pages: 38, status: "ready" as DocStatus, uploadedAt: "2026-02-08", uploadedBy: "u3" },
  { id: "d3", folderId: "f5", name: "7PAIX_PLANS_ARCHI_v3.pdf", size: "12.7 MB", pages: 64, status: "ready" as DocStatus, uploadedAt: "2026-02-10", uploadedBy: "u1" },
  { id: "d4", folderId: "f5", name: "7PAIX_DEVIS_LAFARGE.pdf", size: "0.9 MB", pages: 8, status: "indexing" as DocStatus, uploadedAt: "2026-05-06", uploadedBy: "u2" },
  { id: "d5", folderId: "f5", name: "7PAIX_NOTE_TECH_ETANCHEITE.docx", size: "0.4 MB", pages: 6, status: "failed" as DocStatus, uploadedAt: "2026-05-02", uploadedBy: "u1" },
];

export const mockAgents = [
  { id: "ag1", name: "Analyse DCE", description: "Synthèse exécutive du Dossier de Consultation des Entreprises." },
  { id: "ag2", name: "Check list PSSE", description: "Vérification du Plan Sécurité-Santé-Environnement contre la check-list interne." },
  { id: "ag3", name: "Synthèse administrative/financière", description: "Extrait les éléments administratifs et financiers clés." },
  { id: "ag4", name: "Analyse des Risques (1) - Les délais", description: "Identifie les risques liés aux délais contractuels et aux pénalités." },
  { id: "ag5", name: "Analyse des Risques (2) - Analyse Juridique et financière", description: "Risques juridiques, garanties, conditions financières." },
  { id: "ag6", name: "Analyse des Risques (3) - Le site", description: "Risques liés à l'environnement du chantier." },
  { id: "ag7", name: "Analyse des Risques (4) - Les autorisations", description: "Permis, déclarations, conformité réglementaire." },
  { id: "ag8", name: "Analyse des Risques (5) - Les performances : Labels - Certifications - Performances", description: "Engagements de performance et certifications attendues." },
  { id: "ag9", name: "Analyse des Risques (6) - Les études de conception et d'exécution", description: "Risques sur la conception, les EXE et les arbitrages techniques." },
  { id: "ag10", name: "Analyse des Risques (7) - Le chiffrage", description: "Risques sur l'estimation des coûts et l'aléas budgétaire." },
];

export const mockConversations = [
  { id: "c1", title: "quelle est la date de remise de l'offre", attachedSources: ["f5"], lastMessageAt: "2026-03-13T11:05:00Z", agent: "Analyse DCE" },
  { id: "c2", title: "synthèse administrative MYSL", attachedSources: ["f2"], lastMessageAt: "2026-03-12T14:22:00Z" },
  { id: "c3", title: "risques juridiques VALHUBERT", attachedSources: ["f1"], lastMessageAt: "2026-03-10T09:15:00Z", agent: "Analyse des Risques (2)" },
  { id: "c4", title: "comparatif lot CVC PENTIEVRE", attachedSources: ["f3"], lastMessageAt: "2026-03-02T16:40:00Z" },
];

export type Citation = { id: string; label: string; docId: string; page: number; snippet: string };
export type Message = {
  id: string;
  conversationId: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  sentAt: string;
};

export const mockMessages: Message[] = [
  { id: "m1", conversationId: "c1", role: "user", content: "quelle est la date de remise de l'offre", sentAt: "2026-03-13T11:03:00Z" },
  {
    id: "m2",
    conversationId: "c1",
    role: "assistant",
    content:
      "La **date limite de remise des offres** pour ce marché est fixée au **06/04/2026 à 12h00**. Cette échéance s'applique à l'ensemble des candidats souhaitant soumissionner dans le cadre de la consultation pour l'opération située 7 rue de la Paix à Paris.",
    citations: [
      { id: "1", label: "1-1", docId: "d1", page: 2, snippet: "DATE ET HEURE LIMITES DE REMISE DES OFFRES : Le 06/04/2026 à 12h00" },
      { id: "2", label: "1-2", docId: "d1", page: 2, snippet: "La consultation est lancée pour l'opération située 7 rue de la Paix à Paris." },
    ],
    sentAt: "2026-03-13T11:05:00Z",
  },
];

export const mockPriceLibraryFolders = [
  { id: "pl1", name: "Gros oeuvre" },
  { id: "pl2", name: "Charpente / Couverture" },
  { id: "pl3", name: "Cloisons & Doublages" },
  { id: "pl4", name: "CVC / Chauffage / Ventilation" },
  { id: "pl5", name: "Électricité / CFO-CFA" },
  { id: "pl6", name: "Plomberie sanitaire" },
  { id: "pl7", name: "Menuiseries intérieures" },
  { id: "pl8", name: "Façades / VEC" },
];

export const mockBidSets = [
  {
    id: "b1",
    title: "7 PAIX - Lot 02 - Gros oeuvre - 4 offres",
    bids: [
      { supplier: "Eiffage Construction", price: "€18.4M", leadTime: "17 mois", scope: 100, technical: 95, certs: ["ISO 9001", "MASE"] },
      { supplier: "Vinci Construction", price: "€19.1M", leadTime: "18 mois", scope: 100, technical: 98, certs: ["ISO 9001", "ISO 14001", "MASE"] },
      { supplier: "Bouygues Bâtiment", price: "€18.9M", leadTime: "20 mois", scope: 96, technical: 92, certs: ["ISO 9001"] },
      { supplier: "Demathieu Bard", price: "€17.6M", leadTime: "22 mois", scope: 88, technical: 84, certs: ["ISO 9001", "MASE"] },
    ],
    aiRecommendation:
      "Vinci Construction est l'offre recommandée: meilleure conformité technique (98%) et certifications complètes, prix dans la moyenne (+3.8% vs. moins-disant). Demathieu Bard est moins-disant mais présente une couverture de scope incomplète (88%) et un délai de 22 mois.",
  },
];

export const mockPriceRows = [
  { code: "GO.01.001", description: "Béton de propreté ép. 5cm", unite: "m²", prix: "12,40 €", source: "Bibliothèque interne 2025" },
  { code: "GO.02.014", description: "Voile béton armé ép. 18cm", unite: "m²", prix: "168,00 €", source: "Bibliothèque interne 2025" },
  { code: "GO.03.022", description: "Dalle pleine BA ép. 22cm", unite: "m²", prix: "142,30 €", source: "Marché VALHUBERT 2024" },
  { code: "CV.04.110", description: "CTA double flux 5000 m³/h", unite: "U", prix: "24 600,00 €", source: "Marché MYSL 2024" },
  { code: "EL.05.230", description: "Tableau divisionnaire 4R", unite: "U", prix: "1 850,00 €", source: "Bibliothèque interne 2025" },
];
