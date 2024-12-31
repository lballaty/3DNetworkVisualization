import { useState } from 'react';
import { useNetworkStore } from '../store/networkStore';
import { NetworkConfig } from './node/NetworkConfig';
import { LocationConfig } from './node/LocationConfig';
import { VisualConfig } from './node/VisualConfig';

type Tab = 'network' | 'location' | 'visual';

export function NodeDetails() {
  const [activeTab, setActiveTab] = useState<Tab>('network');
  const selectedNode = useNetworkStore((state) => 
    state.nodes.find(n => n.id === state.selectedNode)
  );
  const updateNode = useNetworkStore((state) => state.updateNode);
  const setSelectedNode = useNetworkStore((state) => state.setSelectedNode);

  if (!selectedNode) return null;

  const tabs: { id: Tab; label: string }[] = [
    { id: 'network', label: 'Network' },
    { id: 'location', label: 'Location' },
    { id: 'visual', label: 'Visual' },
  ];

  return (
    <div className="absolute top-4 right-4 p-4 bg-white rounded-lg shadow-lg max-w-sm">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-gray-800">{selectedNode.name}</h2>
        <button
          onClick={() => setSelectedNode(null)}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={selectedNode.name}
          onChange={(e) => updateNode(selectedNode.id, { name: e.target.value })}
          className="w-full p-2 border rounded text-lg"
          placeholder="Node Name"
        />
      </div>

      <div className="flex space-x-1 mb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === 'network' && (
          <NetworkConfig node={selectedNode} onUpdate={(updates) => updateNode(selectedNode.id, updates)} />
        )}
        {activeTab === 'location' && (
          <LocationConfig node={selectedNode} onUpdate={(updates) => updateNode(selectedNode.id, updates)} />
        )}
        {activeTab === 'visual' && (
          <VisualConfig node={selectedNode} onUpdate={(updates) => updateNode(selectedNode.id, updates)} />
        )}
      </div>
    </div>
  );
}