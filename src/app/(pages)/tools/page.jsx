import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import state from '../store'
import { reader } from '../../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../../config/constants'
import { fadeAnimation, slideAnimation } from '../../config/motion'
import { ColorPicker, FilePicker, Tab, CustomButton } from '../../_components'
import { downloadCanvasToImage } from '../../config/helpers';

const Customizer = () => {
  const snap = useSnapshot(state)

  const [file, setFile] = useState('')

  const [activeEditorTab, setActiveEditorTab] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />
      case 'filepicker':
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />
      default:
        return null
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type]

    state[decalType.stateProperty] = result

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = tabName => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName]
        break
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName]
        break
      default:
        state.isLogoTexture = true
        state.isFullTexture = false
        break
    }

    setActiveFilterTab(prevState => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      }
    })
  }

  const readFile = async type => {
    try {
      const result = await reader(file)
      handleDecals(type, result)
      setActiveEditorTab('')
    } catch (error) {
      console.error('Error reading file:', error)
    }
  }

  const toggleModel = () => {
    state.isSecondModelActive = !state.isSecondModelActive
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map(tab => (
                  <Tab key={tab.name} tab={tab} handleClick={() => setActiveEditorTab(tab.name)} />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div className="filtertabs-container" {...slideAnimation('up')}>
            {FilterTabs.map(tab => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
             <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
           <button onClick={toggleModel} className="w-fit px-4 py-2.5 font-bold text-sm">
                  Switch Model
                </button> 
          </motion.div>
            <button onClick={downloadCanvasToImage}>Download</button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer
