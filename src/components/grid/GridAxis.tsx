import { Html } from '@react-three/drei';
import { Space } from '../../types/Node';

interface GridAxisProps {
  space: Space;
}

export function GridAxis({ space }: GridAxisProps) {
  const offset = 2; // Offset for labels from axis ends

  return (
    <>
      {/* X-axis label */}
      <Html position={[space.width/2 + offset, 0, 0]}>
        <div className="text-red-500 font-bold">X</div>
      </Html>

      {/* Y-axis label */}
      <Html position={[0, space.height/2 + offset, 0]}>
        <div className="text-green-500 font-bold">Y</div>
      </Html>

      {/* Z-axis label */}
      <Html position={[0, 0, space.depth/2 + offset]}>
        <div className="text-blue-500 font-bold">Z</div>
      </Html>
    </>
  );
}