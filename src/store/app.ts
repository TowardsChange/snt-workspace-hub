import { create } from "zustand";
import { mockCurrentUser } from "@/mocks/data";

type User = typeof mockCurrentUser;

interface AppState {
  user: User | null;
  attachedSources: string[];
  historiqueOpen: boolean;
  login: () => void;
  logout: () => void;
  attach: (id: string) => void;
  detach: (id: string) => void;
  clearAttached: () => void;
  setHistorique: (open: boolean) => void;
}

export const useApp = create<AppState>((set) => ({
  user: mockCurrentUser,
  attachedSources: [],
  historiqueOpen: false,
  login: () => set({ user: mockCurrentUser }),
  logout: () => set({ user: null }),
  attach: (id) => set((s) => ({ attachedSources: s.attachedSources.includes(id) ? s.attachedSources : [...s.attachedSources, id] })),
  detach: (id) => set((s) => ({ attachedSources: s.attachedSources.filter((x) => x !== id) })),
  clearAttached: () => set({ attachedSources: [] }),
  setHistorique: (open) => set({ historiqueOpen: open }),
}));
