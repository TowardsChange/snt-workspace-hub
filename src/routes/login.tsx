import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SntLogo } from "@/components/SntLogo";
import { useState } from "react";
import { useApp } from "@/store/app";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();
  const login = useApp((s) => s.login);
  const [email, setEmail] = useState("sarah.doucet@spiebatignolles.com");
  const [pwd, setPwd] = useState("•••••••••");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
          nav({ to: "/home" });
        }}
        className="w-full max-w-md bg-[var(--surface)] border border-border rounded-2xl p-8 shadow-sm"
      >
        <div className="flex justify-center mb-6"><SntLogo size={28} /></div>
        <h1 className="text-xl font-semibold text-center mb-6">Se connecter à votre espace</h1>
        <label className="text-sm font-medium">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 mb-4 w-full px-3 py-2 rounded-md border border-border bg-background" />
        <label className="text-sm font-medium">Mot de passe</label>
        <input value={pwd} onChange={(e) => setPwd(e.target.value)} type="password" className="mt-1 mb-4 w-full px-3 py-2 rounded-md border border-border bg-background" />
        <div className="flex items-center justify-between mb-6 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" defaultChecked />Rester connecté</label>
          <a className="text-[var(--accent)]">Mot de passe oublié ?</a>
        </div>
        <button className="w-full py-2.5 rounded-md bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent)]/90">
          Se connecter
        </button>
      </form>
    </div>
  );
}
