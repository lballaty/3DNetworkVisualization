import { useRef } from 'react';
import { Html } from '@react-three/drei';
import { Mesh, Group } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useNetworkStore } from '../store/networkStore';
import { useConnectionMode } from '../hooks/useConnectionMode';
import { useDragNode } from '../hooks/useDragNode';
import { NodeGeometry } from './node/NodeGeometry';
import type { NetworkNode as INetworkNode } from '../types/Node';

interface NodeProps {
  node: INetworkNode;
  orbitControls: React.RefObject<OrbitControls>;
}

export function NetworkNode({ node, orbitControls }: NodeProps) {
  const setSelectedNode = useNetworkStore((state) => state.setSelectedNode);
  const addConnection = useNetworkStore((state) => state.addConnection);
  const { isActive, sourceNodeId, setSourceNode, reset } = useConnectionMode();
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  
  useDragNode(node.id, meshRef, orbitControls);

  const handleClick = () => {
    if (isActive) {
      if (!sourceNodeId) {
        setSourceNode(node.id);
      } else if (sourceNodeId !== node.id) {
        addConnection({
          id: crypto.randomUUID(),
          sourceId: sourceNodeId,
          targetId: node.id,
          color: "#4CAF50",
          opacity: 1,
          lineWidth: 2
        });
        reset();
      }
    } else {
      setSelectedNode(node.id);
    }
  };

  const nodeColor = sourceNodeId === node.id ? "#ff9800" : (node.color || "#2196f3");

  return (
    <group ref={groupRef} position={node.position}>
      <mesh ref={meshRef} onClick={handleClick}>
        <NodeGeometry node={{ ...node, color: nodeColor }} />
      </mesh>
      <Html
        position={[0, (node.size || 2) + 0.5, 0]}
        center
        distanceFactor={8}
        occlude={[meshRef]}
        transform
      >
        <div className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded shadow text-sm whitespace-nowrap pointer-events-none">
          {node.name}
        </div>
      </Html>
    </group>
  );
}