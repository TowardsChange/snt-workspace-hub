import { createFileRoute } from "@tanstack/react-router";
import { ChatComposer } from "@/components/ChatComposer";

export const Route = createFileRoute("/libraries/ai")({
  component: () => (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-[960px]">
        <h1 className="text-center text-[28px] font-normal tracking-tight mb-8">Recherche IA — Bibliothèques de prix</h1>
        <ChatComposer placeholder="Ex: prix moyen d'une dalle pleine BA en 2025 en Île-de-France" />
      </div>
    </div>
  ),
});
