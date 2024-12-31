import { useState } from 'react';
import { Cone, Html } from '@react-three/drei';
import { Vector3 } from 'three';

interface SpaceCornerMarkerProps {
  position: [number, number, number];
}

export function SpaceCornerMarker({ position }: SpaceCornerMarkerProps) {
  const [showCoordinates, setShowCoordinates] = useState(false);

  return (
    <group position={position}>
      <Cone 
        args={[0.3, 0.6, 3]} // radius, height, triangular pyramid
        rotation={[Math.PI, 0, 0]} // Point upward
        onClick={() => setShowCoordinates(!showCoordinates)}
      >
        <meshStandardMaterial 
          color="#00ff00" 
          opacity={0.8}
          transparent
          metalness={0.1}
          roughness={0.3}
        />
      </Cone>
      
      {showCoordinates && (
        <Html position={[0, 1, 0]} center>
          <div className="px-2 py-1 bg-black/75 text-white rounded text-sm whitespace-nowrap">
            ({position[0]}, {position[1]}, {position[2]})
          </div>
        </Html>
      )}
    </group>
  );
}