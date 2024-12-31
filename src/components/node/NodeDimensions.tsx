import { NetworkNode } from '../../types/Node';

interface NodeDimensionsProps {
  node: NetworkNode;
  onUpdate: (updates: Partial<NetworkNode>) => void;
}

export function NodeDimensions({ node, onUpdate }: NodeDimensionsProps) {
  if (node.shape === 'cube') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Width</label>
          <input
            type="number"
            value={node.width || 2}
            onChange={(e) => onUpdate({ width: Number(e.target.value) })}
            min={0.1}
            max={10}
            step={0.1}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Height</label>
          <input
            type="number"
            value={node.height || 2}
            onChange={(e) => onUpdate({ height: Number(e.target.value) })}
            min={0.1}
            max={10}
            step={0.1}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Depth</label>
          <input
            type="number"
            value={node.depth || 2}
            onChange={(e) => onUpdate({ depth: Number(e.target.value) })}
            min={0.1}
            max={10}
            step={0.1}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Size</label>
      <input
        type="number"
        value={node.size || 2}
        onChange={(e) => onUpdate({ size: Number(e.target.value) })}
        min={0.1}
        max={10}
        step={0.1}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}