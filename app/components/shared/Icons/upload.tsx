import React, { FC } from 'react'
interface IconProps { className?:string}
const UploadIcon: FC<IconProps> = ({className="fill-svg-dark"   }) => {
  return (
    <svg  className={ className} height="200" viewBox="0 -960 960 960" width="200"><path d="M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63v167ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>
   )
}

export default UploadIcon;