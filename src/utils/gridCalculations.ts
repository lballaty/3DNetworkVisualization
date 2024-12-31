import { Vector3 } from 'three';
import type { Space } from '../types/Node';

export function calculateGridSize(space: Space, axis: 'xy' | 'xz' | 'yz'): number {
  const size = (() => {
    switch (axis) {
      case 'xy':
        return Math.max(space.width, space.height);
      case 'xz':
        return Math.max(space.width, space.depth);
      case 'yz':
        return Math.max(space.height, space.depth);
    }
  })();

  console.log(`[calculateGridSize] ${axis}:`, { space, size });
  return size;
}

export function calculateGridPosition(space: Space, axis: 'xy' | 'xz' | 'yz'): Vector3 {
  // Start at origin (0,0,0) and offset based on axis
  const position = new Vector3(
    space.width/2,   // Center X
    0,               // Start at bottom
    0                // Start at front
  );

  switch (axis) {
    case 'xy': // Wall
      position.y = space.height/2;
      break;
    case 'xz': // Floor
      position.z = space.depth/2;
      break;
    case 'yz': // Side
      position.x = 0;
      position.y = space.height/2;
      position.z = space.depth/2;
      break;
  }

  console.log(`[calculateGridPosition] ${axis}:`, {
    space,
    position: position.toArray()
  });

  return position;
}