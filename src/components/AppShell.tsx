import { Outlet, useRouterState } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { HistoriqueDrawer } from "./HistoriqueDrawer";

export function AppShell() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  if (path === "/login" || path === "/") return <Outlet />;
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
      <HistoriqueDrawer />
    </div>
  );
}
