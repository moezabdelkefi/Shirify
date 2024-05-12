'use client'
import React from 'react'
import CanvasModel from '../../canvas/index'
import Home from '../Homecustomize/page'
import Customizer from '../tools/page'
const page = () => {
  return (
    <main className="app transition-all ease-in">
      <div className="flex">
        <div><Home /></div>
        <div className="flex-1"><CanvasModel /></div>
        <Customizer />
      </div>
    </main>
  )
}

export default page