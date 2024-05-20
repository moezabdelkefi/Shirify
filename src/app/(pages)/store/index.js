import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  color: '#ffcf40',
  isLogoTexture: true,
  isFullTexture: false,
  isBackVisible: true,
  isBackTexture: true,
  logoDecal: '/media/backimg.png',
  backDecal: '/media/backimg.png',
  fullDecal: '/media/backimg.png',
  isRotating: true,
  isSecondModelActive: false,
  currentModel: 0,
})

export default state
