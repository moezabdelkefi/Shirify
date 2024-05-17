'use client'

import React from 'react'
import { ToastContainer } from 'react-toastify'

import CanvasModel from '../../canvas/index.jsx'
import Home from '../Homecustomize/page.jsx'
import Customizer from '../tools/page.jsx'

import 'react-toastify/dist/ReactToastify.css'

const page = () => {
  return (
    <main className="app transition-all ease-in">
      <div className="flex">
        <div>
          <Home />
        </div>
        <div className="flex-1">
          <CanvasModel />
        </div>
        <ToastContainer />
        <Customizer />
      </div>
    </main>
  )
}

export default page
