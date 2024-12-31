import { useMemo } from 'react';
import * as THREE from 'three';
import type { NetworkNode } from '../types/Node';

export function useNodePositions(source: NetworkNode | undefined, target: NetworkNode | undefined) {
  return useMemo(() => ({
    getSourcePosition: () => 
      source ? new THREE.Vector3(...source.position) : new THREE.Vector3(),
    getTargetPosition: () => 
      target ? new THREE.Vector3(...target.position) : new THREE.Vector3()
  }), [source?.position, target?.position]);
}