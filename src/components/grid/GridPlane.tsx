import { useRef, useMemo } from 'react';
import { Vector3 } from 'three';
import * as THREE from 'three';

interface GridPlaneProps {
  size: number;
  position: Vector3;
  rotation: [number, number, number];
  color: string;
  opacity: number;
  divisions: number;
  axis: 'xy' | 'xz' | 'yz';
}

export function GridPlane({ 
  size, 
  position, 
  rotation, 
  color, 
  opacity, 
  divisions,
  axis 
}: GridPlaneProps) {
  const gridRef = useRef<THREE.GridHelper>(null);

  const grid = useMemo(() => {
    console.log(`[GridPlane ${axis}] Creating grid:`, {
      size,
      position: position.toArray(),
      rotation,
      divisions,
      color,
      opacity
    });

    const gridHelper = new THREE.GridHelper(
      size,
      divisions,
      color,
      color
    );

    // Make grid lines more visible
    const material = gridHelper.material as THREE.Material;
    if (material instanceof THREE.LineBasicMaterial) {
      material.opacity = opacity;
      material.transparent = true;
      material.depthWrite = false;
    }

    // Apply position and rotation
    gridHelper.position.copy(position);
    const rotationVector = new Vector3(...rotation);
    gridHelper.rotation.setFromVector3(rotationVector);

    console.log(`[GridPlane ${axis}] Final configuration:`, {
      position: gridHelper.position.toArray(),
      rotation: gridHelper.rotation.toArray(),
      worldPosition: gridHelper.getWorldPosition(new Vector3()).toArray()
    });

    return gridHelper;
  }, [size, divisions, color, opacity, position, rotation, axis]);

  return (
    <primitive 
      ref={gridRef}
      object={grid}
    />
  );
}