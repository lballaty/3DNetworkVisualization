import { NetworkNode } from '../../types/Node';
import { SpaceCoordinates } from './SpaceCoordinates';
import { NodeOrientation } from './NodeOrientation';

interface LocationConfigProps {
  node: NetworkNode;
  onUpdate: (updates: Partial<NetworkNode>) => void;
}

export function LocationConfig({ node, onUpdate }: LocationConfigProps) {
  const location = node.location || {};

  const updateLocation = (updates: Partial<NonNullable<NetworkNode['location']>>) => {
    onUpdate({ location: { ...location, ...updates } });
  };

  return (
    <div className="space-y-6">
      <SpaceCoordinates node={node} onUpdate={onUpdate} />
      <NodeOrientation node={node} onUpdate={onUpdate} />

      <div className="space-y-4">
        <h3 className="font-medium">GPS Coordinates</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm mb-1">Latitude</label>
            <input
              type="number"
              value={location.gps?.latitude || ''}
              onChange={(e) => updateLocation({ gps: { ...location.gps, latitude: Number(e.target.value) } })}
              className="w-full p-2 border rounded"
              step="0.000001"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Longitude</label>
            <input
              type="number"
              value={location.gps?.longitude || ''}
              onChange={(e) => updateLocation({ gps: { ...location.gps, longitude: Number(e.target.value) } })}
              className="w-full p-2 border rounded"
              step="0.000001"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Address</h3>
        <div>
          <label className="block text-sm mb-1">City</label>
          <input
            type="text"
            value={location.address?.city || ''}
            onChange={(e) => updateLocation({ address: { ...location.address, city: e.target.value } })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">State</label>
          <input
            type="text"
            value={location.address?.state || ''}
            onChange={(e) => updateLocation({ address: { ...location.address, state: e.target.value } })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Country</label>
          <input
            type="text"
            value={location.address?.country || ''}
            onChange={(e) => updateLocation({ address: { ...location.address, country: e.target.value } })}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Rack Details</h3>
        <div>
          <label className="block text-sm mb-1">Building</label>
          <input
            type="text"
            value={location.rack?.building || ''}
            onChange={(e) => updateLocation({ rack: { ...location.rack, building: e.target.value } })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Floor</label>
          <input
            type="number"
            value={location.rack?.floor || ''}
            onChange={(e) => updateLocation({ rack: { ...location.rack, floor: Number(e.target.value) } })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Rack Number</label>
          <input
            type="text"
            value={location.rack?.number || ''}
            onChange={(e) => updateLocation({ rack: { ...location.rack, number: e.target.value } })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Position in Rack</label>
          <input
            type="number"
            value={location.rack?.position || ''}
            onChange={(e) => updateLocation({ rack: { ...location.rack, position: Number(e.target.value) } })}
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>
      </div>
    </div>
  );
}