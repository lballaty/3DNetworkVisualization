import { useMemo } from 'react';
import { MeshStandardMaterial, Color } from 'three';
import type { NetworkNode } from '../types/Node';

export function useNodeMaterial(node: NetworkNode, sourceNodeId: string | null) {
  return useMemo(() => {
    const material = new MeshStandardMaterial({
      metalness: 0.2,
      roughness: 0.3,
      transparent: true,
      color: new Color(sourceNodeId === node.id ? "#ff9800" : (node.color || "#2196f3")),
      opacity: node.opacity || 1
    });
    
    return material;
  }, [node.color, node.opacity, sourceNodeId, node.id]);
}