import React from 'react'
import { useSnapshot } from 'valtio'

import state from '../(pages)/store'
import { getContrastingColor } from '../config/helpers'

const CustomButton = ({ type, title, customStyles, handleClick }) => {
  const snap = useSnapshot(state)

  const handleButtonClick = () => {
    // If the button's title is 'Customize It', toggle the rotation
    if (title === 'Customize It') {
      state.isRotating = !state.isRotating
    }
    // Call the handleClick function if it exists
    if (handleClick) {
      handleClick()
    }
  }
  const generateStyle = type => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      }
    } else if (type === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color,
      }
    }
  }

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleButtonClick}
    >
      {title}
    </button>
  )
}

export default CustomButton
