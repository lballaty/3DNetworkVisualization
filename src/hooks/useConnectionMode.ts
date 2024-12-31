import { create } from 'zustand';

interface ConnectionModeState {
  isActive: boolean;
  sourceNodeId: string | null;
  toggleMode: () => void;
  setSourceNode: (id: string | null) => void;
  reset: () => void;
}

export const useConnectionMode = create<ConnectionModeState>((set) => ({
  isActive: false,
  sourceNodeId: null,
  toggleMode: () => set((state) => ({ isActive: !state.isActive, sourceNodeId: null })),
  setSourceNode: (id) => set({ sourceNodeId: id }),
  reset: () => set({ isActive: false, sourceNodeId: null }),
}));