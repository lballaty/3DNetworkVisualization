import { Space } from '../types/Node';

export function calculateUniformPositions(count: number, space: Space) {
  const positions: [number, number, number][] = [];
  
  // Calculate number of nodes per dimension
  const dimension = Math.ceil(Math.cbrt(count));
  
  // Calculate step size for each axis
  const stepX = space.width / (dimension + 1);
  const stepY = space.height / (dimension + 1);
  const stepZ = space.depth / (dimension + 1);

  console.log('[calculateUniformPositions] Initial calculations:', {
    count,
    dimension,
    steps: { stepX, stepY, stepZ },
    space
  });
  
  let index = 0;
  for (let i = 1; i <= dimension && index < count; i++) {
    for (let j = 1; j <= dimension && index < count; j++) {
      for (let k = 1; k <= dimension && index < count; k++) {
        // Calculate positions starting from (0,0,0)
        const x = stepX * i;
        const y = stepY * j;
        const z = stepZ * k;

        console.log(`Node ${index} position:`, { x, y, z });
        
        positions.push([x, y, z]);
        index++;
      }
    }
  }
  
  return positions;
}