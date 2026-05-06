import { createFileRoute, Link } from "@tanstack/react-router";
import { mockDocuments } from "@/mocks/data";
import { PdfViewer } from "@/components/PdfViewer";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/documents/files/$fileId")({
  component: FilePage,
});

function FilePage() {
  const { fileId } = Route.useParams();
  const doc = mockDocuments.find((d) => d.id === fileId);
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-[var(--surface)]">
        <div className="flex items-center gap-3">
          <Link to="/documents" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /></Link>
          <div className="text-sm font-medium">{doc?.name}</div>
        </div>
      </div>
      <PdfViewer page={2} />
    </div>
  );
}
