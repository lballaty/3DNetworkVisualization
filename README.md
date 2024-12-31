# Network Visualization Tool

A powerful 3D network visualization tool built with React, Three.js, and Zustand.

## Features

- Interactive 3D network visualization
- Node and connection management
- Real-time communication simulation
- Customizable visual properties
- Location and network configuration
- Persistent state management

## Controls

### Camera Controls
- **Rotate**: Left-click drag
- **Pan**: Right-click drag
- **Zoom**: Mouse wheel

### Node Management
- **Add Node**: Click the "Add Single Node" button in Settings
- **Add Multiple Nodes**: Use the "Add Bulk Nodes" feature
- **Select Node**: Click on a node
- **Move Node**: Drag and drop in 3D space

### Connection Management
- **Create Connection**: 
  1. Click the connection mode toggle (chain icon)
  2. Select source node
  3. Select target node
- **Select Connection**: Click on a connection line

## Configuration Options

### Node Properties

#### Network Configuration
- IP Address
- Protocol (HTTP, HTTPS, WebSocket, TCP, UDP, MQTT, CoAP)
- Port number

#### Location Details
- GPS coordinates (latitude/longitude)
- Address (city, state, country)
- Rack information (building, floor, number, position)

#### Visual Properties
- Shape (sphere, cube, cone)
- Size/dimensions
- Color
- Opacity

### Connection Properties
- Line width
- Color
- Opacity

### Scene Settings
- Background color
- Grid opacity
- Space dimensions

## API Reference

### Node Operations

```typescript
// Get all nodes
const nodes = networkApi.getNodes();

// Get specific node
const node = networkApi.getNode(nodeId);

// Add node
networkApi.addNode({
  id: crypto.randomUUID(),
  name: 'New Node',
  type: 'server',
  interfaces: 1,
  position: [0, 0, 0],
  ip: '192.168.1.100',
  protocol: 'HTTP',
  port: 80,
  shape: 'sphere',
  size: 2,
  color: '#2196f3',
  opacity: 1
});

// Update node
networkApi.updateNode(nodeId, {
  name: 'Updated Node',
  color: '#ff0000'
});

// Remove node
networkApi.removeNode(nodeId);
```

### Connection Operations

```typescript
// Get all connections
const connections = networkApi.getConnections();

// Add connection
networkApi.addConnection({
  id: crypto.randomUUID(),
  sourceId: 'node1-id',
  targetId: 'node2-id',
  color: '#4CAF50',
  opacity: 1,
  lineWidth: 2
});

// Update connection
networkApi.updateConnection(connectionId, {
  color: '#ff0000',
  lineWidth: 3
});

// Remove connection
networkApi.removeConnection(connectionId);
```

### Space Management

```typescript
// Get space dimensions
const space = networkApi.getSpace();

// Update space
networkApi.setSpace({
  width: 200,
  height: 200,
  depth: 200
});
```

### Visual Settings

```typescript
// Get/Set background color
const backgroundColor = networkApi.getBackgroundColor();
networkApi.setBackgroundColor('#1a1a1a');

// Get/Set grid opacity
const gridOpacity = networkApi.getGridOpacity();
networkApi.setGridOpacity(0.5);
```

### State Management

```typescript
// Reset to default configuration
networkApi.resetConfig();

// Subscribe to state changes
const unsubscribe = networkApi.subscribe(
  state => state.nodes,
  nodes => console.log('Nodes updated:', nodes)
);

// Unsubscribe when done
unsubscribe();
```

## Types

### NetworkNode

```typescript
interface NetworkNode {
  id: string;
  name: string;
  type: string;
  interfaces: number;
  position: [number, number, number];
  ip: string;
  protocol: Protocol;
  port: number;
  shape: 'sphere' | 'cube' | 'cone';
  size?: number;
  width?: number;
  height?: number;
  depth?: number;
  color: string;
  opacity: number;
  location?: {
    gps?: {
      latitude: number;
      longitude: number;
    };
    address?: {
      city: string;
      state: string;
      country: string;
    };
    rack?: {
      building: string;
      floor: number;
      number: string;
      position: number;
    };
  };
}
```

### Connection

```typescript
interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
  color: string;
  opacity: number;
  lineWidth: number;
}
```

### Protocol

```typescript
type Protocol = 'HTTP' | 'HTTPS' | 'WebSocket' | 'TCP' | 'UDP' | 'MQTT' | 'CoAP';
```