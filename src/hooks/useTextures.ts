import { useMemo } from 'react';
import * as THREE from 'three';
import { NetworkNode } from '../types/Node';

export function useTextures(node: NetworkNode) {
  return useMemo(() => {
    if (node.shape !== 'cube' || !node.textures?.length) {
      return [];
    }

    const textureLoader = new THREE.TextureLoader();
    const faceOrder = ['right', 'left', 'top', 'bottom', 'front', 'back'] as const;
    
    return faceOrder.map(face => {
      const textureData = node.textures?.find(t => t.face === face);
      if (!textureData?.url) return null;

      const texture = textureLoader.load(textureData.url);
      return new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        opacity: node.opacity,
        metalness: 0.2,
        roughness: 0.3
      });
    });
  }, [node.shape, node.textures, node.opacity]);
}