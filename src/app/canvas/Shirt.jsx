import React from 'react'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import state from '../(pages)/store'
import { easing } from 'maath'

const Shirt = () => {
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF('/shirt_baked.glb')
  const { nodes: newModelNodes, materials: newModelMaterials } = useGLTF('/media/secondmodel.glb')

  const logoTexture = useTexture(snap.logoDecal)
  const fullTexture = useTexture(snap.fullDecal)

  useFrame((state, delta) => {
    if (snap.isSecondModelActive) {
      if (newModelMaterials.Material_l && snap.color) {
        easing.dampC(newModelMaterials.Material_l.color, snap.color, 0.25, delta)
      }
    } else {
      if (materials.lambert1 && snap.color) {
        easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
      }
    }
  })

  const stateString = JSON.stringify(snap)
  const showSecondModel = false
  const firstSecondModel = true
  return (
    <group key={stateString}>
      {!snap.isSecondModelActive && (
        <mesh
          castShadow
          geometry={nodes.T_Shirt_male.geometry}
          material={materials.lambert1}
          material-roughness={1}
          dispose={null}
        >
          {snap.isFullTexture && (
            <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} map={fullTexture} />
          )}

          {snap.isLogoTexture && (
            <Decal
              position={[0, 0.04, 0.15]}
              rotation={[0, 0, 0]}
              scale={0.15}
              map={logoTexture}
              anisotropy={16}
              depthTest={false}
              depthWrite={true}
            />
          )}
        </mesh>
      )}

      {snap.isSecondModelActive && (
        <mesh
          castShadow
          geometry={newModelNodes.Animated_Shirt.geometry}
          material={newModelMaterials.Material_l}
        >
          {snap.isFullTexture && (
            <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} map={fullTexture} />
          )}

          {snap.isLogoTexture && (
            <Decal
              position={[0, 0.04, 0.15]}
              rotation={[0, 0, 0]}
              scale={0.15}
              map={logoTexture}
              anisotropy={16}
              depthTest={false}
              depthWrite={true}
            />
          )}
        </mesh>
      )}
    </group>
  )
}

export default Shirt
