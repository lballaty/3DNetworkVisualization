import { Protocol } from './Protocol';

export interface CubeFaceText {
  text: string;
  face: 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom';
  fontSize?: number;
  color?: string;
}

export interface NetworkNode {
  id: string;
  name: string;
  type: string;
  interfaces: number;
  position: [number, number, number];
  rotation: [number, number, number];
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
  faceTexts?: CubeFaceText[];
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