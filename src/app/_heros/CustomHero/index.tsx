'use client'
import React, { Suspense } from 'react'
import { OrbitControls, useAnimations, useFBX } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { Page } from '../../../payload/payload-types'
import { CMSLink } from '../../_components/Link'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

const Model = () => {
  const gltf = useLoader(GLTFLoader, '/media/avatar1.glb')
  const fbx = useFBX('/media/Kneeling.fbx')
  const { actions } = useAnimations(fbx.animations, gltf.scene)

  React.useEffect(() => {
    const actionKeys = Object.keys(actions)
    if (actionKeys.length > 0 && actions[actionKeys[0]]) {
      actions[actionKeys[0]].play()
    }
  }, [actions])

  return (
    <>
      <group position={[0, -0.5, 0]}>
        <primitive object={gltf.scene} dispose={null} />
      </group>
    </>
  )
}

export const CustomHero: React.FC<Page['hero']> = ({ richText, media, links }) => {
  const mediaUrl =
    media &&
    typeof media !== 'string' &&
    `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${media.filename}`

  return (
    <section className={classes.hero}>
      <div className={classes.heroWrapper}>
        <div className={classes.heroTextBox}>
          <RichText content={richText} />

          {Array.isArray(links) && links.length > 0 && (
            <ul className={classes.links}>
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <Canvas shadows camera={{ position: [1, 1, 3.5], fov: 25 }} className={classes.model}>
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}
