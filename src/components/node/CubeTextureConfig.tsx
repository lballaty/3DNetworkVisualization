import { NetworkNode, CubeFaceTexture } from '../../types/Node';

interface CubeTextureConfigProps {
  node: NetworkNode;
  onUpdate: (updates: Partial<NetworkNode>) => void;
}

export function CubeTextureConfig({ node, onUpdate }: CubeTextureConfigProps) {
  if (node.shape !== 'cube') return null;

  const faces: Array<CubeFaceTexture['face']> = ['front', 'back', 'left', 'right', 'top', 'bottom'];
  const textures = node.textures || [];

  const handleTextureChange = (face: CubeFaceTexture['face'], url: string) => {
    const newTextures = [...textures.filter(t => t.face !== face)];
    if (url) {
      newTextures.push({ face, url });
    }
    onUpdate({ textures: newTextures });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Cube Face Textures</h3>
      <div className="space-y-2">
        {faces.map(face => {
          const texture = textures.find(t => t.face === face);
          return (
            <div key={face} className="flex gap-2 items-center">
              <label className="w-20 text-sm capitalize">{face}:</label>
              <input
                type="url"
                value={texture?.url || ''}
                onChange={(e) => handleTextureChange(face, e.target.value)}
                placeholder="Image URL"
                className="flex-1 p-2 border rounded text-sm"
              />
              {texture && (
                <button
                  onClick={() => handleTextureChange(face, '')}
                  className="p-1 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}