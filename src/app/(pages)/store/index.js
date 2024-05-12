import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: '/media/threejs.png',
  fullDecal: '/threejs.png',
  isRotating: true,
  isSecondModelActive: false,
});

export default state;