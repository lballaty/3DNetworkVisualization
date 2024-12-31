import { NetworkNode, CubeFaceText } from '../../types/Node';
import { ColorPicker } from '../controls/ColorPicker';

interface CubeFaceTextConfigProps {
  node: NetworkNode;
  onUpdate: (updates: Partial<NetworkNode>) => void;
}

export function CubeFaceTextConfig({ node, onUpdate }: CubeFaceTextConfigProps) {
  if (node.shape !== 'cube') return null;

  const faces: Array<CubeFaceText['face']> = ['front', 'back', 'left', 'right', 'top', 'bottom'];
  const faceTexts = node.faceTexts || [];

  const handleTextChange = (face: CubeFaceText['face'], updates: Partial<CubeFaceText>) => {
    const newFaceTexts = [...faceTexts.filter(t => t.face !== face)];
    const existing = faceTexts.find(t => t.face === face) || { face, text: '', fontSize: 32, color: '#ffffff' };
    
    const updated = { ...existing, ...updates };
    if (updated.text || updated.color !== '#ffffff' || updated.fontSize !== 32) {
      newFaceTexts.push(updated);
    }
    
    onUpdate({ faceTexts: newFaceTexts });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Cube Face Text</h3>
      <div className="space-y-4">
        {faces.map(face => {
          const faceText = faceTexts.find(t => t.face === face) || { 
            face, 
            text: '', 
            fontSize: 32,
            color: '#ffffff'
          };
          
          return (
            <div key={face} className="space-y-2 p-3 bg-gray-50 rounded">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium capitalize">{face} Face</label>
                {faceText.text && (
                  <button
                    onClick={() => handleTextChange(face, { text: '' })}
                    className="text-red-500 hover:text-red-700"
                  >
                    Clear
                  </button>
                )}
              </div>
              
              <input
                type="text"
                value={faceText.text}
                onChange={(e) => handleTextChange(face, { text: e.target.value })}
                placeholder="Enter text"
                className="w-full p-2 border rounded text-sm"
              />
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm mb-1">Font Size</label>
                  <input
                    type="number"
                    value={faceText.fontSize}
                    onChange={(e) => handleTextChange(face, { 
                      fontSize: Math.max(1, Math.min(200, Number(e.target.value))) 
                    })}
                    className="w-full p-2 border rounded text-sm"
                    min="1"
                    max="200"
                  />
                </div>
                
                <div className="flex-1">
                  <ColorPicker
                    label="Text Color"
                    color={faceText.color || '#ffffff'}
                    onChange={(color) => handleTextChange(face, { color })}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}