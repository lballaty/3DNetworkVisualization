import { NetworkNode } from '../../types/Node';
import { ColorPicker } from '../controls/ColorPicker';
import { NodeDimensions } from './NodeDimensions';
import { CubeFaceTextConfig } from './CubeFaceTextConfig';

interface VisualConfigProps {
  node: NetworkNode;
  onUpdate: (updates: Partial<NetworkNode>) => void;
}

export function VisualConfig({ node, onUpdate }: VisualConfigProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Shape</label>
        <select
          value={node.shape || 'sphere'}
          onChange={(e) => onUpdate({ 
            shape: e.target.value as 'sphere' | 'cube' | 'cone',
            faceTexts: [] // Clear face texts when changing shape
          })}
          className="w-full p-2 border rounded"
        >
          <option value="sphere">Sphere</option>
          <option value="cube">Cube</option>
          <option value="cone">Cone</option>
        </select>
      </div>

      <NodeDimensions node={node} onUpdate={onUpdate} />

      <ColorPicker
        label="Color"
        color={node.color || "#2196f3"}
        onChange={(color) => onUpdate({ color })}
      />

      <div>
        <label className="block text-sm font-medium mb-1">
          Opacity: {Math.round((node.opacity || 1) * 100)}%
        </label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={node.opacity || 1}
          onChange={(e) => onUpdate({ opacity: Number(e.target.value) })}
          className="w-full"
        />
      </div>

      <CubeFaceTextConfig node={node} onUpdate={onUpdate} />
    </div>
  );
}