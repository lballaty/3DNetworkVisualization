import { useNetworkStore } from '../store/networkStore';
import type { NetworkNode, Connection, Space, Communication } from '../types/Node';

export const networkApi = {
  // Node operations
  getNodes: () => useNetworkStore.getState().nodes,
  getNode: (id: string) => useNetworkStore.getState().nodes.find(n => n.id === id),
  addNode: (node: NetworkNode) => useNetworkStore.getState().addNode(node),
  updateNode: (id: string, updates: Partial<NetworkNode>) => useNetworkStore.getState().updateNode(id, updates),
  removeNode: (id: string) => useNetworkStore.getState().removeNode(id),

  // Connection operations
  getConnections: () => useNetworkStore.getState().connections,
  getConnection: (id: string) => useNetworkStore.getState().connections.find(c => c.id === id),
  addConnection: (connection: Connection) => useNetworkStore.getState().addConnection(connection),
  updateConnection: (id: string, updates: Partial<Connection>) => useNetworkStore.getState().updateConnection(id, updates),
  removeConnection: (id: string) => useNetworkStore.getState().removeConnection(id),

  // Communication operations
  getCommunications: () => useNetworkStore.getState().communications,
  addCommunication: (comm: Communication) => useNetworkStore.getState().addCommunication(comm),
  updateCommunication: (id: string, updates: Partial<Communication>) => useNetworkStore.getState().updateCommunication(id, updates),

  // Space operations
  getSpace: () => useNetworkStore.getState().space,
  setSpace: (space: Space) => useNetworkStore.getState().setSpace(space),

  // Visual settings
  getBackgroundColor: () => useNetworkStore.getState().backgroundColor,
  setBackgroundColor: (color: string) => useNetworkStore.getState().setBackgroundColor(color),
  getGridOpacity: () => useNetworkStore.getState().gridOpacity,
  setGridOpacity: (opacity: number) => useNetworkStore.getState().setGridOpacity(opacity),

  // State management
  resetConfig: () => useNetworkStore.getState().resetConfig(),
  
  // Subscribe to changes
  subscribe: (
    selector: (state: ReturnType<typeof useNetworkStore.getState>) => any,
    callback: (selectedValue: any) => void
  ) => useNetworkStore.subscribe(selector, callback)
};