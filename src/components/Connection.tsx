import { useRef } from 'react';
import { Line } from '@react-three/drei';
import { useNetworkStore } from '../store/networkStore';
import type { Connection as IConnection } from '../types/Node';
import { useFrame } from '@react-three/fiber';
import { useConnectionPoints } from '../hooks/useConnectionPoints';
import { useConnectionPacket } from '../hooks/useConnectionPacket';

interface ConnectionProps {
  connection: IConnection;
}

export function Connection({ connection }: ConnectionProps) {
  const nodes = useNetworkStore((state) => state.nodes);
  const communications = useNetworkStore((state) => state.communications);
  const setSelectedConnection = useNetworkStore((state) => state.setSelectedConnection);
  
  const source = nodes.find((n) => n.id === connection.sourceId);
  const target = nodes.find((n) => n.id === connection.targetId);
  
  const points = useConnectionPoints(source, target);
  const packetRef = useConnectionPacket(source, target, communications, connection);

  if (!source || !target || !points) return null;

  return (
    <>
      <Line
        points={points}
        color={connection.color || "#4CAF50"}
        lineWidth={connection.lineWidth || 2}
        opacity={connection.opacity || 1}
        transparent
        onClick={() => setSelectedConnection(connection.id)}
      />
      {packetRef.current && (
        <mesh ref={packetRef}>
          <sphereGeometry args={[0.3]} />
          <meshBasicMaterial color="#ff0000" />
        </mesh>
      )}
    </>
  );
}