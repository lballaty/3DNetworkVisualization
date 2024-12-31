import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Mesh, Vector3, Plane, Raycaster } from 'three';
import { useNetworkStore } from '../store/networkStore';

export function useDragNode(
  nodeId: string, 
  meshRef: React.RefObject<Mesh>,
  orbitControls: React.RefObject<OrbitControls>
) {
  const { camera, gl } = useThree();
  const updateNode = useNetworkStore((state) => state.updateNode);
  const dragPlane = useRef(new Plane());
  const intersection = useRef(new Vector3());
  const mouse = useRef(new Vector3());

  useEffect(() => {
    if (!meshRef.current) return;

    const controls = new DragControls([meshRef.current], camera, gl.domElement);

    const onDragStart = (event: THREE.Event) => {
      if (orbitControls.current) {
        orbitControls.current.enabled = false;
      }
      gl.domElement.style.cursor = 'grabbing';

      // Create drag plane perpendicular to camera
      const normal = new Vector3();
      camera.getWorldDirection(normal);
      dragPlane.current.setFromNormalAndCoplanarPoint(
        normal,
        event.object.position
      );
    };

    const onDrag = (event: any) => {
      // Convert mouse coordinates to normalized device coordinates (-1 to +1)
      const rect = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.current.z = 0;

      const raycaster = new Raycaster();
      raycaster.setFromCamera(mouse.current, camera);
      
      if (raycaster.ray.intersectPlane(dragPlane.current, intersection.current)) {
        event.object.position.copy(intersection.current);
        const position: [number, number, number] = [
          intersection.current.x,
          intersection.current.y,
          intersection.current.z
        ];
        updateNode(nodeId, { position });
      }
    };

    const onDragEnd = () => {
      if (orbitControls.current) {
        orbitControls.current.enabled = true;
      }
      gl.domElement.style.cursor = 'auto';
    };

    controls.addEventListener('dragstart', onDragStart);
    controls.addEventListener('drag', onDrag);
    controls.addEventListener('dragend', onDragEnd);

    return () => {
      controls.removeEventListener('dragstart', onDragStart);
      controls.removeEventListener('drag', onDrag);
      controls.removeEventListener('dragend', onDragEnd);
      controls.dispose();
    };
  }, [camera, gl, nodeId, updateNode, orbitControls]);
}