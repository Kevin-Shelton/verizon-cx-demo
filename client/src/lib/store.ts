import { create } from "zustand";
import type { Persona, Coverage, Pillar } from "@shared/types";

interface AppState {
  // Selected persona
  selectedPersona: Persona | null;
  setSelectedPersona: (persona: Persona | null) => void;

  // Journey filters
  filters: {
    pillar: Pillar | null;
    persona: string | null;
    dialect: string | null;
    coverage: Coverage[];
    onlyGaps: boolean;
  };
  setFilter: <K extends keyof AppState["filters"]>(
    key: K,
    value: AppState["filters"][K]
  ) => void;
  resetFilters: () => void;

  // Feedback drawer
  feedbackDrawerOpen: boolean;
  setFeedbackDrawerOpen: (open: boolean) => void;

  // Current context for feedback
  currentContext: {
    route: string;
    activityId?: string;
  };
  setCurrentContext: (context: Partial<AppState["currentContext"]>) => void;
}

const initialFilters: AppState["filters"] = {
  pillar: null,
  persona: null,
  dialect: null,
  coverage: [],
  onlyGaps: false,
};

export const useAppStore = create<AppState>((set) => ({
  // Persona state
  selectedPersona: null,
  setSelectedPersona: (persona) => set({ selectedPersona: persona }),

  // Filter state
  filters: initialFilters,
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  resetFilters: () => set({ filters: initialFilters }),

  // Feedback drawer state
  feedbackDrawerOpen: false,
  setFeedbackDrawerOpen: (open) => set({ feedbackDrawerOpen: open }),

  // Context state
  currentContext: {
    route: "/",
  },
  setCurrentContext: (context) =>
    set((state) => ({
      currentContext: { ...state.currentContext, ...context },
    })),
}));

