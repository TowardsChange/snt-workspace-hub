import { createFileRoute } from "@tanstack/react-router";
import { mockUsers } from "@/mocks/data";

export const Route = createFileRoute("/teams")({
  component: () => (
    <div className="p-8 max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Equipes</h1>
        <button className="px-4 py-2 rounded-md bg-[var(--accent)] text-white text-sm font-medium">Inviter un utilisateur</button>
      </div>
      <div className="bg-[var(--surface)] border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs text-muted-foreground"><tr>
            <th className="text-left px-4 py-2">Nom</th><th className="text-left px-4 py-2">Email</th><th className="text-left px-4 py-2">Rôle</th><th className="text-left px-4 py-2">Dernière activité</th>
          </tr></thead>
          <tbody>{mockUsers.map((u) => {
            const cls = u.role === "Admin" ? "bg-rose-50 text-rose-700" : u.role === "Team manager" ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "bg-slate-100 text-slate-700";
            return (
              <tr key={u.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${cls}`}>{u.role}</span></td>
                <td className="px-4 py-3 text-muted-foreground">{u.lastActive}</td>
              </tr>
            );
          })}</tbody>
        </table>
      </div>
    </div>
  ),
});
