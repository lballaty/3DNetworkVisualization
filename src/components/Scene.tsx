import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { NetworkNode } from './Node';
import { Connection } from './Connection';
import { Grid3D } from './Grid3D';
import { GridControls } from './GridControls';
import { CameraControls } from './camera/CameraControls';
import { SpaceBoundaries } from './SpaceBoundaries';
import { OriginMarker } from './markers/OriginMarker';
import { useNetworkStore } from '../store/networkStore';
import { useRef } from 'react';
import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls';

export function Scene() {
  const { nodes, connections, backgroundColor, space } = useNetworkStore();
  const orbitControlsRef = useRef<OrbitControlsImpl>(null);

  // Calculate camera settings based on space size
  const maxDimension = Math.max(space.width, space.height, space.depth);
  const cameraDistance = maxDimension * 1.5;

  return (
    <>
      <Canvas
        camera={{ 
          position: [cameraDistance, cameraDistance, cameraDistance],
          fov: 50,
          near: 0.1,
          far: maxDimension * 10
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={[backgroundColor]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} />
        <pointLight position={[0, 0, 0]} intensity={0.8} />
        
        <Grid3D />
        <SpaceBoundaries />
        <OriginMarker />
        
        {nodes.map((node) => (
          <NetworkNode 
            key={node.id} 
            node={node} 
            orbitControls={orbitControlsRef}
          />
        ))}
        
        {connections.map((connection) => (
          <Connection key={connection.id} connection={connection} />
        ))}

        <OrbitControls 
          ref={orbitControlsRef}
          minDistance={1}
          maxDistance={maxDimension * 3}
          enableDamping={true}
          dampingFactor={0.05}
          target={[0, 0, 0]}
          makeDefault
        />
      </Canvas>
      
      <GridControls />
      <CameraControls orbitControls={orbitControlsRef} />
    </>
  );
}