import { NetworkNode } from '../../types/Node';
import { Protocol } from '../../types/Protocol';

interface NetworkConfigProps {
  node: NetworkNode;
  onUpdate: (updates: Partial<NetworkNode>) => void;
}

export function NetworkConfig({ node, onUpdate }: NetworkConfigProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">IP Address</label>
        <input
          type="text"
          value={node.ip || ''}
          onChange={(e) => onUpdate({ ip: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="192.168.1.1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Protocol</label>
        <select
          value={node.protocol}
          onChange={(e) => onUpdate({ protocol: e.target.value as Protocol })}
          className="w-full p-2 border rounded"
        >
          <option value="HTTP">HTTP</option>
          <option value="HTTPS">HTTPS</option>
          <option value="WebSocket">WebSocket</option>
          <option value="TCP">TCP</option>
          <option value="UDP">UDP</option>
          <option value="MQTT">MQTT</option>
          <option value="CoAP">CoAP</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Port</label>
        <input
          type="number"
          value={node.port || 80}
          onChange={(e) => onUpdate({ port: Number(e.target.value) })}
          className="w-full p-2 border rounded"
          min="1"
          max="65535"
        />
      </div>
    </div>
  );
}