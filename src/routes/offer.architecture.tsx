import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/offer/architecture")({
  component: () => (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center text-muted-foreground">
      Bientôt disponible
    </div>
  ),
});
