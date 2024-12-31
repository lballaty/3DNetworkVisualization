import { useNetworkStore } from '../store/networkStore';
import { Line } from '@react-three/drei';
import { Vector3 } from 'three';
import { SpaceCornerMarker } from './markers/SpaceCornerMarker';

export function SpaceBoundaries() {
  const space = useNetworkStore((state) => state.space);
  
  // Define all corner points using full dimensions
  const corners: [number, number, number][] = [
    [0, 0, 0],                    // 0: front bottom left
    [space.width, 0, 0],          // 1: front bottom right
    [space.width, 0, space.depth], // 2: back bottom right
    [0, 0, space.depth],          // 3: back bottom left
    [0, space.height, 0],         // 4: front top left
    [space.width, space.height, 0], // 5: front top right
    [space.width, space.height, space.depth], // 6: back top right
    [0, space.height, space.depth] // 7: back top left
  ];

  console.log('[SpaceBoundaries]', {
    space,
    corners
  });

  // Define the 12 edges of the cube using corner indices
  const edges = [
    // Bottom square
    [corners[0], corners[1]],
    [corners[1], corners[2]],
    [corners[2], corners[3]],
    [corners[3], corners[0]],
    
    // Top square
    [corners[4], corners[5]],
    [corners[5], corners[6]],
    [corners[6], corners[7]],
    [corners[7], corners[4]],
    
    // Vertical edges
    [corners[0], corners[4]],
    [corners[1], corners[5]],
    [corners[2], corners[6]],
    [corners[3], corners[7]]
  ];

  return (
    <>
      {/* Space boundaries */}
      {edges.map((points, index) => (
        <Line
          key={index}
          points={points.map(p => new Vector3(...p))}
          color="#ffff00"
          lineWidth={2}
          dashed={true}
          dashSize={4}
          dashScale={2}
          opacity={0.8}
          transparent
        />
      ))}

      {/* Corner markers */}
      {corners.map((position, index) => (
        <SpaceCornerMarker key={index} position={position} />
      ))}
    </>
  );
}