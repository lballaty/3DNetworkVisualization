import { useEffect } from 'react';
import { saveConfig } from '../config/storage';
import type { NetworkState } from '../store/networkStore';

const PERSISTED_KEYS = [
  'nodes',
  'connections',
  'space',
  'gridOpacity',
  'backgroundColor'
] as const;

type PersistedKeys = typeof PERSISTED_KEYS[number];
type PersistedState = Pick<NetworkState, PersistedKeys>;

export function useStatePersistence(state: NetworkState) {
  useEffect(() => {
    const persistedState = PERSISTED_KEYS.reduce<Partial<PersistedState>>((acc, key) => ({
      ...acc,
      [key]: state[key],
    }), {});
    
    saveConfig(persistedState);
  }, [
    state.nodes,
    state.connections,
    state.space,
    state.gridOpacity,
    state.backgroundColor
  ]);
}