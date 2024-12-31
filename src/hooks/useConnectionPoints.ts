import { useMemo } from 'react';
import { Vector3 } from 'three';
import type { NetworkNode } from '../types/Node';

export function useConnectionPoints(source?: NetworkNode, target?: NetworkNode) {
  return useMemo(() => {
    if (!source || !target) return null;
    
    return [
      new Vector3(...source.position),
      new Vector3(...target.position)
    ];
  }, [source?.position, target?.position]);
}