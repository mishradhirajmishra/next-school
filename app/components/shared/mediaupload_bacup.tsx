"use client"
import React, { FC, useState } from 'react'
interface MediaUploadProps {  
}
const MediaUpload: FC<MediaUploadProps> = ({  }) => {
  const [file, setFile] = useState<File>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      console.log('file', file)
      data.set('file', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })
      // handle the error
      if (!res.ok) throw new Error(await res.text())
    } catch (e: any) {
      // Handle errors here
      console.error(e)
    }
  }

  return (
    <form onSubmit={onSubmit}>

      {/* <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files?.[0])}
      /> */}
      <button type="submit" className='btn-outline-error' >Upload file</button>
 
    </form>
  )
}

export default MediaUpload;