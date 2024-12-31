import { useNetworkStore } from '../store/networkStore';
import { GridPlane } from './grid/GridPlane';
import { GridAxis } from './grid/GridAxis';
import { calculateGridSize, calculateGridPosition } from '../utils/gridCalculations';

export function Grid3D() {
  const space = useNetworkStore((state) => state.space);
  const opacity = useNetworkStore((state) => state.gridOpacity);
  const gridConfig = useNetworkStore((state) => state.gridConfig);
  const gridPosition = useNetworkStore((state) => state.gridPosition);
  
  return (
    <>
      {/* XZ Plane (floor) - Blue */}
      {gridConfig.showFloor && (
        <GridPlane 
          size={calculateGridSize(space, 'xz')}
          position={calculateGridPosition(space, 'xz')}
          rotation={[0, 0, 0]}
          color="#2196f3"
          opacity={opacity}
          divisions={10}
          axis="xz"
        />
      )}

      {/* XY Plane (wall) - Red */}
      {gridConfig.showWall && (
        <GridPlane 
          size={calculateGridSize(space, 'xy')}
          position={calculateGridPosition(space, 'xy')}
          rotation={[Math.PI/2, 0, 0]}
          color="#f44336"
          opacity={opacity}
          divisions={10}
          axis="xy"
        />
      )}

      {/* YZ Plane (side) - Green */}
      {gridConfig.showSide && (
        <GridPlane 
          size={calculateGridSize(space, 'yz')}
          position={calculateGridPosition(space, 'yz')}
          rotation={[Math.PI/2, 0, Math.PI/2]}
          color="#4caf50"
          opacity={opacity}
          divisions={10}
          axis="yz"
        />
      )}

      <GridAxis space={space} />
    </>
  );
}