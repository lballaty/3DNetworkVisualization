import { useState } from 'react';
import { Settings, Grid } from 'lucide-react';
import { useNetworkStore } from '../store/networkStore';
import { ColorPicker } from './controls/ColorPicker';

export function GridControls() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    gridOpacity, 
    setGridOpacity,
    backgroundColor,
    setBackgroundColor,
    gridConfig,
    setGridConfig,
    gridPosition,
    setGridPosition
  } = useNetworkStore();

  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      {isOpen && (
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Grid Planes</h3>
              <div className="flex gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={gridConfig.showFloor}
                    onChange={(e) => setGridConfig({ 
                      ...gridConfig, 
                      showFloor: e.target.checked 
                    })}
                    className="rounded text-blue-500"
                  />
                  Floor (XZ)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={gridConfig.showWall}
                    onChange={(e) => setGridConfig({ 
                      ...gridConfig, 
                      showWall: e.target.checked 
                    })}
                    className="rounded text-red-500"
                  />
                  Wall (XY)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={gridConfig.showSide}
                    onChange={(e) => setGridConfig({ 
                      ...gridConfig, 
                      showSide: e.target.checked 
                    })}
                    className="rounded text-green-500"
                  />
                  Side (YZ)
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Grid Position</h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs mb-1">X Position</label>
                  <input
                    type="number"
                    value={gridPosition.x}
                    onChange={(e) => setGridPosition({ 
                      ...gridPosition, 
                      x: Number(e.target.value) 
                    })}
                    className="w-full p-1 text-sm border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Y Position</label>
                  <input
                    type="number"
                    value={gridPosition.y}
                    onChange={(e) => setGridPosition({ 
                      ...gridPosition, 
                      y: Number(e.target.value) 
                    })}
                    className="w-full p-1 text-sm border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Z Position</label>
                  <input
                    type="number"
                    value={gridPosition.z}
                    onChange={(e) => setGridPosition({ 
                      ...gridPosition, 
                      z: Number(e.target.value) 
                    })}
                    className="w-full p-1 text-sm border rounded"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Grid Opacity: {Math.round(gridOpacity * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={gridOpacity * 100}
                onChange={(e) => setGridOpacity(Number(e.target.value) / 100)}
                className="w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <ColorPicker
              label="Background Color"
              color={backgroundColor}
              onChange={setBackgroundColor}
            />
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-full shadow-lg transition-colors ${
          isOpen ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
        title="Grid Settings"
      >
        <Grid className="w-5 h-5" />
      </button>
    </div>
  );
}