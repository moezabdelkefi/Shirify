'use client'
import React, { Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, useAnimations, useFBX } from '@react-three/drei'

const Model = () => {
  const gltf = useLoader(GLTFLoader, '/media/avatar1.glb')
  const fbx = useFBX('/media/Kneeling.fbx')
  const { actions } = useAnimations(fbx.animations, gltf.scene);

  React.useEffect(() => {
    const actionKeys = Object.keys(actions);
    if (actionKeys.length > 0 && actions[actionKeys[0]]) {
      actions[actionKeys[0]].play();
    }
  }, [actions]);

  return (
    <>
      <group position-y={-1}>
        <primitive object={gltf.scene} dispose={null} />
      </group>
    </>
  )
}

const Dmodel = () => {
  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 30 }}>
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  )
}

export default Dmodel
