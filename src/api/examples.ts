import { networkApi } from './networkApi';

// Example usage:
async function examples() {
  // Get all nodes
  const nodes = networkApi.getNodes();
  
  // Add a new node
  const newNode = {
    id: crypto.randomUUID(),
    name: 'New Node',
    type: 'server',
    interfaces: 1,
    position: [0, 0, 0],
    ip: '192.168.1.100',
    protocol: 'HTTP' as const,
    port: 80,
    shape: 'sphere' as const,
    size: 2,
    color: '#2196f3',
    opacity: 1
  };
  networkApi.addNode(newNode);

  // Update a node
  networkApi.updateNode(newNode.id, {
    name: 'Updated Node',
    color: '#ff0000'
  });

  // Add a connection
  const connection = {
    id: crypto.randomUUID(),
    sourceId: newNode.id,
    targetId: nodes[0]?.id,
    color: '#4CAF50',
    opacity: 1,
    lineWidth: 2
  };
  networkApi.addConnection(connection);

  // Update space dimensions
  networkApi.setSpace({
    width: 200,
    height: 200,
    depth: 200
  });

  // Subscribe to changes
  const unsubscribe = networkApi.subscribe(
    state => state.nodes,
    nodes => console.log('Nodes updated:', nodes)
  );

  // Later: unsubscribe to stop listening
  unsubscribe();
}