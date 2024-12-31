import { NetworkNode } from '../../types/Node';

interface NodeOrientationProps {
  node: NetworkNode;
  onUpdate: (updates: Partial<NetworkNode>) => void;
}

export function NodeOrientation({ node, onUpdate }: NodeOrientationProps) {
  const [rotX, rotY, rotZ] = node.rotation || [0, 0, 0];

  // Convert radians to degrees for the UI
  const toDegrees = (rad: number) => (rad * 180) / Math.PI;
  const toRadians = (deg: number) => (deg * Math.PI) / 180;

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Node Orientation</h3>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-sm mb-1">X Rotation (°)</label>
          <input
            type="number"
            value={Math.round(toDegrees(rotX))}
            onChange={(e) => {
              const newRotation: [number, number, number] = [
                toRadians(Number(e.target.value)),
                rotY,
                rotZ
              ];
              onUpdate({ rotation: newRotation });
            }}
            className="w-full p-2 border rounded"
            step="15"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Y Rotation (°)</label>
          <input
            type="number"
            value={Math.round(toDegrees(rotY))}
            onChange={(e) => {
              const newRotation: [number, number, number] = [
                rotX,
                toRadians(Number(e.target.value)),
                rotZ
              ];
              onUpdate({ rotation: newRotation });
            }}
            className="w-full p-2 border rounded"
            step="15"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Z Rotation (°)</label>
          <input
            type="number"
            value={Math.round(toDegrees(rotZ))}
            onChange={(e) => {
              const newRotation: [number, number, number] = [
                rotX,
                rotY,
                toRadians(Number(e.target.value))
              ];
              onUpdate({ rotation: newRotation });
            }}
            className="w-full p-2 border rounded"
            step="15"
          />
        </div>
      </div>
    </div>
  );
}