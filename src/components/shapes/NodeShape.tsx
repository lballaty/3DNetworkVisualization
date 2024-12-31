import { Sphere, Box, Cone } from '@react-three/drei';
import type { NetworkNode } from '../../types/Node';

interface NodeShapeProps {
  shape: NetworkNode['shape'];
  size: number;
}

export function NodeShape({ shape, size }: NodeShapeProps) {
  switch (shape) {
    case 'cube':
      return <Box args={[size, size, size]} />;
    case 'cone':
      return <Cone args={[size/2, size]} rotation={[Math.PI, 0, 0]} />;
    default:
      return <Sphere args={[size/2]} />;
  }
}