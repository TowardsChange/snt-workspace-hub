import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/offer/features")({
  component: () => (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center text-muted-foreground">
      Coming soon
    </div>
  ),
});
