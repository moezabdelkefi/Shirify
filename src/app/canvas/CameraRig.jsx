import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'

import state from '../(pages)/store'

const CameraRig = ({ children }) => {
  const group = useRef()
  const snap = useSnapshot(state)
  const { gl } = useThree()

  // Define a targ  et rotation value
  let targetRotation = 0
  const [isUserInteracting, setIsUserInteracting] = useState(false)

  useEffect(() => {
    const handleMouseDown = () => {
      setIsUserInteracting(true)
    }

    const handleMouseUp = () => {
      setIsUserInteracting(false)
    }

    const handleMouseMove = event => {
      if (!isUserInteracting) return
      const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
      const rotationSpeed = 0.001
      group.current.rotation.y += movementX * rotationSpeed
    }

    gl.domElement.addEventListener('mousedown', handleMouseDown)
    gl.domElement.addEventListener('mouseup', handleMouseUp)
    gl.domElement.addEventListener('mousemove', handleMouseMove)

    return () => {
      gl.domElement.removeEventListener('mousedown', handleMouseDown)
      gl.domElement.removeEventListener('mouseup', handleMouseUp)
      gl.domElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [gl.domElement, isUserInteracting])

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260
    const isMobile = window.innerWidth <= 600

    let targetPosition = [0.1, 0, 2.5]
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2.5]
      if (isMobile) targetPosition = [0, 0.2, 3]
    } else {
      if (isMobile) targetPosition = [0, 0, 3]
      else targetPosition = [0, 0, 2.5]
    }

    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    if (group.current) {
      if (group.current.rotation.y !== targetRotation) {
        let diff = targetRotation - group.current.rotation.y

        if (diff < 0) {
          diff += 2 * Math.PI
        }

        if (diff < delta * 1) {
          group.current.rotation.y = targetRotation
        } else {
          group.current.rotation.y += delta * 1
        }

        if (group.current.rotation.y >= 2 * Math.PI) {
          group.current.rotation.y -= 2 * Math.PI
        }
      }
    }
    if (group.current && snap.isRotating) {
      group.current.rotation.y += delta * 0.8
    }
  })

  return <group ref={group}>{children}</group>
}

export default CameraRig
