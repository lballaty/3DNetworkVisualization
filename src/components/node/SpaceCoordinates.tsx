import { NetworkNode } from '../../types/Node';

interface SpaceCoordinatesProps {
  node: NetworkNode;
  onUpdate: (updates: Partial<NetworkNode>) => void;
}

export function SpaceCoordinates({ node, onUpdate }: SpaceCoordinatesProps) {
  const [x, y, z] = node.position;

  return (
    <div className="space-y-4">
      <h3 className="font-medium">3D Space Coordinates</h3>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-sm mb-1">X Position</label>
          <input
            type="number"
            value={x}
            onChange={(e) => {
              const newPosition: [number, number, number] = [
                Number(e.target.value),
                y,
                z
              ];
              onUpdate({ position: newPosition });
            }}
            className="w-full p-2 border rounded"
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Y Position</label>
          <input
            type="number"
            value={y}
            onChange={(e) => {
              const newPosition: [number, number, number] = [
                x,
                Number(e.target.value),
                z
              ];
              onUpdate({ position: newPosition });
            }}
            className="w-full p-2 border rounded"
            step="0.1"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Z Position</label>
          <input
            type="number"
            value={z}
            onChange={(e) => {
              const newPosition: [number, number, number] = [
                x,
                y,
                Number(e.target.value)
              ];
              onUpdate({ position: newPosition });
            }}
            className="w-full p-2 border rounded"
            step="0.1"
          />
        </div>
      </div>
    </div>
  );
}