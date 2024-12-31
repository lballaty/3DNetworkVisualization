import { useEffect, useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector3 } from 'three';

interface CameraControlsCanvasProps {
  orbitControls: React.RefObject<OrbitControls>;
}

export function CameraControlsCanvas({ orbitControls }: CameraControlsCanvasProps) {
  const [distance, setDistance] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const frameRef = useRef(0);

  // Get min/max distance from OrbitControls
  const minDistance = orbitControls.current?.minDistance || 0.001;
  const maxDistance = orbitControls.current?.maxDistance || 300;

  useFrame(() => {
    if (!orbitControls.current) return;
    
    // Throttle updates to every 5 frames for performance
    frameRef.current = (frameRef.current + 1) % 5;
    if (frameRef.current !== 0) return;

    const camera = orbitControls.current.object;
    const target = new Vector3();
    orbitControls.current.target.clone(target);
    
    // Update position
    setPosition({
      x: Number(camera.position.x.toFixed(2)),
      y: Number(camera.position.y.toFixed(2)),
      z: Number(camera.position.z.toFixed(2))
    });

    // Update distance from target
    setDistance(Number(camera.position.distanceTo(target).toFixed(2)));
  });

  const handleDistanceChange = (newDistance: number) => {
    if (!orbitControls.current) return;

    const camera = orbitControls.current.object;
    const target = orbitControls.current.target;
    const direction = camera.position.clone().sub(target).normalize();
    
    camera.position.copy(target.clone().add(direction.multiplyScalar(newDistance)));
    orbitControls.current.update();
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg w-80">
      <h2 className="text-lg font-semibold mb-4">Camera Controls</h2>
      
      <div className="space-y-4">
        {/* Position Display */}
        <div>
          <label className="block text-sm font-medium mb-2">Camera Position</label>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="text-center">
              <span className="text-gray-500">X:</span> {position.x}
            </div>
            <div className="text-center">
              <span className="text-gray-500">Y:</span> {position.y}
            </div>
            <div className="text-center">
              <span className="text-gray-500">Z:</span> {position.z}
            </div>
          </div>
        </div>

        {/* Distance Controls */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">
              Distance from Origin (0,0,0)
              <span className="block text-xs text-gray-500 font-normal">
                Distance to grid intersection point
              </span>
            </label>
            <span className="text-xs text-gray-500">
              {distance.toFixed(1)} units
            </span>
          </div>
          <div className="relative pt-1">
            <input
              type="range"
              min={minDistance}
              max={maxDistance}
              step={0.1}
              value={distance}
              onChange={(e) => handleDistanceChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Close ({minDistance})</span>
              <span>Far ({maxDistance.toFixed(0)})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}