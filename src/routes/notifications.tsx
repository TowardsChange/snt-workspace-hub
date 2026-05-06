import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notifications")({
  component: () => (
    <div className="p-8 max-w-[900px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>
      <div className="bg-[var(--surface)] border border-border rounded-xl p-12 text-center text-sm text-muted-foreground">
        Aucune notification pour le moment.
      </div>
    </div>
  ),
});
