import React, { FC } from 'react'
interface IconProps { className?:string}

const MasterIcon: FC<IconProps>= ( {className ="fill-svg-dark"}) => {
  return (
    <svg className={ className} fill="currentColor"   height="24" viewBox="0 -960 960 960" width="24">
    <path xmlns="http://www.w3.org/2000/svg" d="M80-120v-720h400v160h400v560H80Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h320v-400H480v80h80v80h-80v80h80v80h-80v80Zm160-240v-80h80v80h-80Zm0 160v-80h80v80h-80Z"/>
     </svg>
  )
}

export default MasterIcon;