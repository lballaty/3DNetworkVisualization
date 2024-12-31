import { useState } from 'react';
import { Camera } from 'lucide-react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CameraControlsCanvas } from './camera/CameraControlsCanvas';

interface CameraControlsProps {
  orbitControls: React.RefObject<OrbitControls>;
}

export function CameraControls({ orbitControls }: CameraControlsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
      {isOpen && <CameraControlsCanvas orbitControls={orbitControls} />}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-full shadow-lg transition-colors ${
          isOpen ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
        title="Camera Controls"
      >
        <Camera className="w-5 h-5" />
      </button>
    </div>
  );
}