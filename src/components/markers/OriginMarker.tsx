import { Cone } from '@react-three/drei';

export function OriginMarker() {
  return (
    <group position={[0, 0, 0]}>
      <Cone 
        args={[0.5, 1, 4]} // radius, height, segments
        position={[0, 0.5, 0]} // Move up by half height to sit on origin
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial 
          color="#ff0000" 
          opacity={0.8}
          transparent
          metalness={0.1}
          roughness={0.3}
        />
      </Cone>
    </group>
  );
}