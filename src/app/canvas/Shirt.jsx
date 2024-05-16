import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture, Center } from '@react-three/drei'
import state from '../(pages)/store'
import { easing } from 'maath'
import * as THREE from 'three'

const Shirt = () => {
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF('/shirt_baked.glb')
  const { nodes: newModelNodes, materials: newModelMaterials } = useGLTF('/media/hoodie.glb')
  const { nodes: ThirsModelNodes, materials: ThirdModelMaterials } =
    useGLTF('/media/secondmodel.glb')

  const logoTexture = useTexture(snap.logoDecal)
  const backTexture = useTexture(snap.backDecal)
  const fullTexture = useTexture(snap.fullDecal)

  useFrame((state, delta) => {
    if (snap.currentModel === 0 && materials.lambert1 && snap.color) {
      easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
    } else if (snap.currentModel === 1 && newModelMaterials.Materiall && snap.color) {
      easing.dampC(newModelMaterials.Materiall.color, snap.color, 0.25, delta)
    } else if (snap.currentModel === 2 && ThirdModelMaterials.Material_l && snap.color) {
      easing.dampC(ThirdModelMaterials.Material_l.color, snap.color, 0.25, delta)
    }
  })

  useEffect(() => {
    if (backTexture) {
      backTexture.wrapS = THREE.RepeatWrapping
      backTexture.repeat.x = -1
      backTexture.offset.x = 1
    }
  }, [backTexture])
  

  const stateString = JSON.stringify(snap)
  const showSecondModel = false
  const firstSecondModel = true

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    return () => {
      document.documentElement.setAttribute('data-theme', 'light');
    };
  }, []);

  return (
    <group key={stateString}>
      {snap.currentModel === 0 && (
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
              position={[0.05, 0.09, 0.14]}
              rotation={[0, Math.PI, 0]}
              scale={0.1}
              map={logoTexture}
              anisotropy={16}
              depthTest={false}
              depthWrite={true}
            />
          )}

          {snap.isBackTexture && snap.isBackVisible && (
            <Decal
              position={[0, 0, -0.15]}
              rotation={[0, 0, 0]}
              scale={0.2}
              map={backTexture}
              anisotropy={16}
              depthTest={false}
              depthWrite={true}
            />
          )}
        </mesh>
      )}

      {snap.currentModel === 1 && (
        <Center>
          <mesh
            castShadow
            geometry={newModelNodes.cloth.geometry}
            material={newModelMaterials.Materiall}
            scale={[0.01, 0.01, 0.01]}
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
        </Center>
      )}

      {snap.currentModel === 2 && (
        <mesh
          castShadow
          geometry={ThirsModelNodes.Animated_Shirt.geometry}
          material={ThirdModelMaterials.Material_l}
          material-roughness={1}
          dispose={null}
        >
          {snap.isFullTexture && (
            <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} map={fullTexture} />
          )}

          {snap.isLogoTexture && (
            <Decal
              position={[0.05, 0.15, 0.15]}
              rotation={[0, Math.PI, 0]}
              scale={0.1}
              map={logoTexture}
              anisotropy={16}
              depthTest={false}
              depthWrite={true}
            />
          )}

          {snap.isBackTexture && snap.isBackVisible && (
            <Decal
              position={[0, 0, -0.15]}
              rotation={[0, 0, 0]}
              scale={0.2}
              map={backTexture}
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
