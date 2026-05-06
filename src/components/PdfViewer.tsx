import { useState } from "react";
import { ChevronLeft, ChevronRight, Download, FileText } from "lucide-react";

export function PdfViewer({ page = 2, highlight }: { page?: number; highlight?: string }) {
  const [zoom, setZoom] = useState(100);
  const [current, setCurrent] = useState(page);
  const totalPages = 11;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-[var(--surface)]">
        <div className="flex items-center gap-2">
          <button onClick={() => setZoom((z) => Math.max(50, z - 25))} className="size-7 rounded border border-border">−</button>
          <span className="text-xs">{zoom}%</span>
          <button onClick={() => setZoom((z) => Math.min(200, z + 25))} className="size-7 rounded border border-border">+</button>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button onClick={() => setCurrent((p) => Math.max(1, p - 1))}><ChevronLeft className="size-4" /></button>
          {current} / {totalPages}
          <button onClick={() => setCurrent((p) => Math.min(totalPages, p + 1))}><ChevronRight className="size-4" /></button>
        </div>
        <button className="p-1.5 rounded hover:bg-slate-100" aria-label="Télécharger"><Download className="size-4" /></button>
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="w-[100px] overflow-y-auto border-r border-border bg-slate-50 p-2 space-y-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                onClick={() => setCurrent(p)}
                className={`w-full aspect-[3/4] rounded bg-white text-[10px] flex items-center justify-center border ${
                  current === p ? "border-[var(--accent)] border-2" : "border-border"
                }`}
              >
                <FileText className="size-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>
        <div className="flex-1 overflow-y-auto bg-slate-100 p-6 flex justify-center">
          <div className="bg-white shadow-md p-10 text-[11px] leading-relaxed" style={{ width: `${(zoom / 100) * 595}px`, minHeight: `${(zoom / 100) * 842}px` }}>
            {current === 2 ? <Page2Content highlight={highlight} /> : <GenericPage page={current} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function Page2Content({ highlight }: { highlight?: string }) {
  const dateLine = "DATE ET HEURE LIMITES DE REMISE DES OFFRES : Le 06/04/2026 à 12h00";
  return (
    <div className="space-y-3">
      <h2 className="font-bold uppercase">Valorisation d'un ensemble immobilier</h2>
      <p>7 rue de la Paix - 75002 PARIS</p>
      <p>DCE FÉVRIER 2026 — RC</p>
      <p className="font-semibold">REGLEMENT DE LA CONSULTATION - Marché privé</p>
      <p className={highlight === dateLine ? "bg-[var(--highlight)] px-1" : ""}>
        {highlight === dateLine ? <mark className="bg-[var(--highlight)]">{dateLine}</mark> : dateLine}
      </p>
      <p className="font-semibold mt-4">MAITRISE D'OUVRAGE</p>
      <p>DAVES RUE DE LA PAIX<br />24-32 rue Jean Goujon, 75008 Paris</p>
      <p className="font-semibold mt-3">MAITRISE D'ŒUVRE</p>
      <p>BARTHÉLÉMY GRIÑO – ARCHITECTE MANDATAIRE<br />68 rue de la Folie Méricourt, 75011 Paris — Tél +33 (0)1 43 38 35 92</p>
      <p>HDA – ARCHITECTE VERRIÈRE<br />7 rue Préguidicy, 75004 Paris — Tél +33 (0)1 42 78 07 07</p>
      <p>BMF – ECONOMISTE DE LA CONSTRUCTION<br />173 rue Charenton, 75012 Paris — Tél +33 (0)1 43 07 08 57</p>
      <p>SOMETE – BET STRUCTURE<br />61 passage Jouffroy, 75009 Paris — Tél +33 (0)1 60 86 45 25</p>
      <p>SERAU – BET FLUIDES<br />208 rue Saint-Maur, 75010 Paris — Tél +33 (0)1 42 78 12 33</p>
      <p>LE SOMMER – BET ENVIRONNEMENT<br />23 rue de Cronstadt, 75015 Paris — Tél +33 (0)1 44 79 37 10</p>
      <p>CAT INGÉNIERIE – BET SÛRETÉ<br />36 rue Galilée, 92600 Asnières-sur-Seine — Tél +33 (0)9 67 87 33 80</p>
      <p>CAP HORN – BET ACOUSTIQUE<br />14 rue de Mantes, 92700 Colombes — Tél +33 (0)1 47 60 22 58</p>
      <p>CONCEPTION CUISINE – CUISINISTE<br />444 Bd de Mercantour, 06200 Nice — Tél +33 (0)4 93 44 80 44</p>
    </div>
  );
}

function GenericPage({ page }: { page: number }) {
  return (
    <div className="space-y-3">
      <h2 className="font-bold">Page {page}</h2>
      <p>Contenu du document — règlement de consultation, articles {page}.1 à {page}.6.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor velit nec lectus tincidunt, sit amet posuere nibh imperdiet.</p>
      <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
    </div>
  );
}
