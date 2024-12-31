import { useMemo } from 'react';
import * as THREE from 'three';
import { NetworkNode } from '../../types/Node';
import { useCubeTextures } from '../../hooks/useCubeTextures';

interface NodeGeometryProps {
  node: NetworkNode;
}

export function NodeGeometry({ node }: NodeGeometryProps) {
  const textures = useCubeTextures(node);

  const geometry = useMemo(() => {
    if (node.shape === 'cube') {
      const width = node.width || 2;
      const height = node.height || 2;
      const depth = node.depth || 2;
      return new THREE.BoxGeometry(width, height, depth);
    } else if (node.shape === 'cone') {
      return new THREE.ConeGeometry(
        (node.size || 2) / 2,
        node.size || 2
      );
    }
    return new THREE.SphereGeometry((node.size || 2) / 2);
  }, [node.shape, node.size, node.width, node.height, node.depth]);

  const materials = useMemo(() => {
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: node.color,
      opacity: node.opacity,
      transparent: true,
      metalness: 0.2,
      roughness: 0.3
    });

    if (node.shape === 'cube' && textures.length > 0) {
      return [
        textures[0] || baseMaterial, // right
        textures[1] || baseMaterial, // left
        textures[2] || baseMaterial, // top
        textures[3] || baseMaterial, // bottom
        textures[4] || baseMaterial, // front
        textures[5] || baseMaterial  // back
      ];
    }

    return baseMaterial;
  }, [node.color, node.opacity, node.shape, textures]);

  return <mesh geometry={geometry} material={materials} />;
}