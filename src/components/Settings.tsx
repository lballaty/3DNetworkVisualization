import { Settings as SettingsIcon, Plus, Grid, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { useNetworkStore } from '../store/networkStore';
import { calculateUniformPositions } from '../utils/nodeDistribution';
import { ColorPicker } from './controls/ColorPicker';

export function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const [bulkCount, setBulkCount] = useState(8);
  const addNode = useNetworkStore((state) => state.addNode);
  const space = useNetworkStore((state) => state.space);
  const setSpace = useNetworkStore((state) => state.setSpace);
  const backgroundColor = useNetworkStore((state) => state.backgroundColor);
  const setBackgroundColor = useNetworkStore((state) => state.setBackgroundColor);
  const resetConfig = useNetworkStore((state) => state.resetConfig);

  const handleAddNode = () => {
    const id = crypto.randomUUID();
    addNode({
      id,
      name: `Node ${id.slice(0, 4)}`,
      type: 'default',
      interfaces: 1,
      position: [
        (Math.random() - 0.5) * space.width,
        (Math.random() - 0.5) * space.height,
        (Math.random() - 0.5) * space.depth
      ],
      rotation: [0, 0, 0],
      ip: `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
      protocol: 'HTTP',
      port: 80,
      shape: 'sphere',
      size: 2,
      color: '#2196f3',
      opacity: 1
    });
  };

  const handleAddBulkNodes = () => {
    const positions = calculateUniformPositions(bulkCount, space);
    positions.forEach((position, index) => {
      const id = crypto.randomUUID();
      addNode({
        id,
        name: `Node ${index + 1}`,
        type: 'default',
        interfaces: 1,
        position,
        rotation: [0, 0, 0],
        ip: `192.168.1.${index + 1}`,
        protocol: 'HTTP',
        port: 80,
        shape: 'sphere',
        size: 2,
        color: '#2196f3',
        opacity: 1
      });
    });
  };

  return (
    <div className="absolute top-4 left-4 flex flex-col items-start gap-2">
      {isOpen && (
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Settings</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Space Dimensions</h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs mb-1">Width</label>
                  <input
                    type="number"
                    value={space.width}
                    onChange={(e) => setSpace({ ...space, width: Number(e.target.value) })}
                    className="w-full p-1 text-sm border rounded"
                    min="10"
                    max="1000"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Height</label>
                  <input
                    type="number"
                    value={space.height}
                    onChange={(e) => setSpace({ ...space, height: Number(e.target.value) })}
                    className="w-full p-1 text-sm border rounded"
                    min="10"
                    max="1000"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Depth</label>
                  <input
                    type="number"
                    value={space.depth}
                    onChange={(e) => setSpace({ ...space, depth: Number(e.target.value) })}
                    className="w-full p-1 text-sm border rounded"
                    min="10"
                    max="1000"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Add Nodes</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleAddNode}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <Plus className="w-4 h-4" />
                  Add Single Node
                </button>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={bulkCount}
                    onChange={(e) => setBulkCount(Number(e.target.value))}
                    className="w-16 p-1 text-sm border rounded"
                    min="1"
                    max="100"
                  />
                  <button
                    onClick={handleAddBulkNodes}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Add Bulk Nodes
                  </button>
                </div>
              </div>
            </div>

            <ColorPicker
              label="Background Color"
              color={backgroundColor}
              onChange={setBackgroundColor}
            />

            <button
              onClick={resetConfig}
              className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Configuration
            </button>
          </div>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-full shadow-lg transition-colors ${
          isOpen ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
        title="Settings"
      >
        <SettingsIcon className="w-5 h-5" />
      </button>
    </div>
  );
}