import { useMemo } from 'react';
import * as THREE from 'three';
import { NetworkNode, CubeFaceText } from '../types/Node';

function createTextTexture(
  text: string, 
  face: CubeFaceText['face'],
  backgroundColor: string,
  fontSize: number = 32, 
  color: string = '#ffffff'
) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { alpha: false })!;
  
  canvas.width = 512;
  canvas.height = 512;
  
  // Fill background completely opaque
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Configure text rendering for maximum clarity
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.imageSmoothingEnabled = false;
  
  // Use a clear, bold font
  const scaledFontSize = Math.min(fontSize * 2, canvas.height / 2);
  ctx.font = `bold ${scaledFontSize}px Arial, sans-serif`;
  
  // Add slight text shadow for better visibility
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  
  // Draw text
  ctx.fillStyle = color;
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  
  switch (face) {
    case 'left':
    case 'right':
      ctx.rotate(Math.PI / 2);
      break;
  }
  
  ctx.fillText(text, 0, 0);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.format = THREE.RGBAFormat;
  
  return texture;
}

export function useCubeTextures(node: NetworkNode) {
  return useMemo(() => {
    if (node.shape !== 'cube' || !node.faceTexts?.length) {
      return [];
    }

    const faceOrder = ['right', 'left', 'top', 'bottom', 'front', 'back'] as const;
    
    return faceOrder.map(face => {
      const faceText = node.faceTexts?.find(t => t.face === face);
      if (!faceText?.text) return null;

      const texture = createTextTexture(
        faceText.text,
        face,
        node.color,
        faceText.fontSize,
        faceText.color
      );
      
      return new THREE.MeshStandardMaterial({
        map: texture,
        transparent: false,
        opacity: 1,
        metalness: 0.1,
        roughness: 0.5,
        side: THREE.FrontSide
      });
    });
  }, [node.shape, node.faceTexts, node.color]);
}