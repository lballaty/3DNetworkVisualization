import { Scene } from './components/Scene';
import { Settings } from './components/Settings';
import { NodeDetails } from './components/NodeDetails';
import { ConnectionDetails } from './components/ConnectionDetails';
import { ConnectionModeToggle } from './components/ConnectionModeToggle';
import { useNetworkStore } from './store/networkStore';
import { useStatePersistence } from './hooks/useStatePersistence';

export default function App() {
  const state = useNetworkStore();
  useStatePersistence(state);

  return (
    <div className="w-full h-screen relative">
      <Scene />
      <Settings />
      <NodeDetails />
      <ConnectionDetails />
      <ConnectionModeToggle />
    </div>
  );
}