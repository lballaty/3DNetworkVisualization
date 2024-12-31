import { useNetworkStore } from '../store/networkStore';
import { ColorPicker } from './controls/ColorPicker';

export function ConnectionDetails() {
  const selectedConnection = useNetworkStore((state) => 
    state.connections.find(c => c.id === state.selectedConnection)
  );
  const nodes = useNetworkStore((state) => state.nodes);
  const removeConnection = useNetworkStore((state) => state.removeConnection);
  const updateConnection = useNetworkStore((state) => state.updateConnection);
  const setSelectedConnection = useNetworkStore((state) => state.setSelectedConnection);

  if (!selectedConnection) return null;

  const sourceNode = nodes.find(n => n.id === selectedConnection.sourceId);
  const targetNode = nodes.find(n => n.id === selectedConnection.targetId);

  return (
    <div className="absolute bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Connection Details</h2>
        <button
          onClick={() => setSelectedConnection(null)}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Source Node</label>
          <div className="p-2 bg-gray-100 rounded">
            {sourceNode?.name || 'Unknown'}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Target Node</label>
          <div className="p-2 bg-gray-100 rounded">
            {targetNode?.name || 'Unknown'}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Line Width</label>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={selectedConnection.lineWidth || 2}
            onChange={(e) => updateConnection(selectedConnection.id, { 
              lineWidth: Number(e.target.value) 
            })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Opacity</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={selectedConnection.opacity || 1}
            onChange={(e) => updateConnection(selectedConnection.id, { 
              opacity: Number(e.target.value) 
            })}
            className="w-full"
          />
        </div>

        <ColorPicker
          label="Color"
          color={selectedConnection.color || "#4CAF50"}
          onChange={(color) => updateConnection(selectedConnection.id, { color })}
        />

        <button
          onClick={() => {
            removeConnection(selectedConnection.id);
            setSelectedConnection(null);
          }}
          className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove Connection
        </button>
      </div>
    </div>
  );
}