import React from 'react'
import { toast } from 'react-toastify'

import CustomButton from './CustomButton.jsx'

import 'react-toastify/dist/ReactToastify.css'

const FilePicker = ({ file, setFile, readFile }) => {
  const handleUploadClick = type => {
    if (!file) {
      toast.error('Please select a file before uploading.')
      return
    }
    readFile(type)
  }

  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={e => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          <div className="file-picker" style={{ color: 'var(--text-color)' }}>
            Upload File
          </div>
        </label>

        <p className="mt-2 text-xs truncate" style={{ color: 'var(--text-color)' }}>
          {file === '' ? 'No file selected' : file.name}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type="outline"
          title="Logo"
          handleClick={() => handleUploadClick('logo')}
          customStyles="text-xs"
        />
        <CustomButton
          type="filled"
          title="Full"
          handleClick={() => handleUploadClick('full')}
          customStyles="text-xs"
        />
        <CustomButton
          type="filled"
          title="Back"
          handleClick={() => handleUploadClick('back')}
          customStyles="text-xs"
        />
      </div>
    </div>
  )
}

export default FilePicker
