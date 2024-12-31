import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import type { NetworkNode, Connection, Communication } from '../types/Node';

export function useConnectionPacket(
  source?: NetworkNode,
  target?: NetworkNode,
  communications?: Communication[],
  connection?: Connection
) {
  const packetRef = useRef<Mesh>();
  
  useFrame((state) => {
    if (!packetRef.current || !source || !target) return;
    
    const activeCommunications = communications?.filter(
      comm => 
        (comm.sourceId === connection?.sourceId && comm.targetId === connection?.targetId) ||
        (comm.sourceId === connection?.targetId && comm.targetId === connection?.sourceId)
    );

    if (activeCommunications?.length) {
      const time = state.clock.getElapsedTime();
      const sourcePos = new Vector3(...source.position);
      const targetPos = new Vector3(...target.position);
      
      const position = new Vector3().lerpVectors(
        sourcePos,
        targetPos,
        (Math.sin(time * 2) + 1) / 2
      );
      
      packetRef.current.position.copy(position);
    }
  });

  return packetRef;
}