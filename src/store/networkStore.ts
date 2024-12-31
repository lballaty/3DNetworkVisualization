import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { loadConfig, clearConfig } from '../config/storage';
import type { NetworkNode, Connection, Space, Communication } from '../types/Node';

interface GridConfig {
  showFloor: boolean;
  showWall: boolean;
  showSide: boolean;
}

interface GridPosition {
  x: number;
  y: number;
  z: number;
}

export interface NetworkState {
  nodes: NetworkNode[];
  connections: Connection[];
  communications: Communication[];
  space: Space;
  selectedNode: string | null;
  selectedConnection: string | null;
  gridOpacity: number;
  backgroundColor: string;
  gridConfig: GridConfig;
  gridPosition: GridPosition;
  addNode: (node: NetworkNode) => void;
  updateNode: (id: string, updates: Partial<NetworkNode>) => void;
  removeNode: (id: string) => void;
  addConnection: (connection: Connection) => void;
  updateConnection: (id: string, updates: Partial<Connection>) => void;
  removeConnection: (id: string) => void;
  addCommunication: (comm: Communication) => void;
  updateCommunication: (id: string, updates: Partial<Communication>) => void;
  setSpace: (space: Space) => void;
  setSelectedNode: (id: string | null) => void;
  setSelectedConnection: (id: string | null) => void;
  setGridOpacity: (opacity: number) => void;
  setBackgroundColor: (color: string) => void;
  setGridConfig: (config: GridConfig) => void;
  setGridPosition: (position: GridPosition) => void;
  resetConfig: () => void;
}

const initialState = {
  nodes: [],
  connections: [],
  communications: [],
  space: { width: 100, height: 100, depth: 100 },
  selectedNode: null,
  selectedConnection: null,
  gridOpacity: 0.2,
  backgroundColor: '#1a1a1a',
  gridConfig: {
    showFloor: true,
    showWall: true,
    showSide: true
  },
  gridPosition: { x: 0, y: 0, z: 0 }
};

// Load saved state or use initial state
const savedState = loadConfig();
const defaultState = savedState ? { ...initialState, ...savedState } : initialState;

export const useNetworkStore = create<NetworkState>()(
  subscribeWithSelector((set) => ({
    ...defaultState,

    addNode: (node) =>
      set((state) => ({ nodes: [...state.nodes, node] })),

    updateNode: (id, updates) =>
      set((state) => ({
        nodes: state.nodes.map((node) =>
          node.id === id ? { ...node, ...updates } : node
        ),
      })),

    removeNode: (id) =>
      set((state) => ({
        nodes: state.nodes.filter((node) => node.id !== id),
        connections: state.connections.filter(
          (conn) => conn.sourceId !== id && conn.targetId !== id
        ),
      })),

    addConnection: (connection) =>
      set((state) => ({ connections: [...state.connections, connection] })),

    updateConnection: (id, updates) =>
      set((state) => ({
        connections: state.connections.map((conn) =>
          conn.id === id ? { ...conn, ...updates } : conn
        ),
      })),

    removeConnection: (id) =>
      set((state) => ({
        connections: state.connections.filter((conn) => conn.id !== id),
      })),

    addCommunication: (comm) =>
      set((state) => ({ communications: [...state.communications, comm] })),

    updateCommunication: (id, updates) =>
      set((state) => ({
        communications: state.communications.map((comm) =>
          comm.id === id ? { ...comm, ...updates } : comm
        ),
      })),

    setSpace: (space) => set({ space }),
    setSelectedNode: (id) => set({ selectedNode: id }),
    setSelectedConnection: (id) => set({ selectedConnection: id }),
    setGridOpacity: (opacity) => set({ gridOpacity: opacity }),
    setBackgroundColor: (color) => set({ backgroundColor: color }),
    setGridConfig: (config) => set({ gridConfig: config }),
    setGridPosition: (position) => set({ gridPosition: position }),
    
    resetConfig: () => {
      clearConfig();
      set(initialState);
    },
  }))
);