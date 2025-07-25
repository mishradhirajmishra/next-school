import React, { FC } from 'react'
interface IconProps { className?:string}
const RedoIcon: FC<IconProps> = ( {className ="fill-svg-dark"}) => {
  return (
<svg className={ className} fill="currentColor"   height="24" viewBox="0 -960 960 960" width="24">
<path xmlns="http://www.w3.org/2000/svg" d="M396-200q-97 0-166.5-63T160-420q0-94 69.5-157T396-640h252L544-744l56-56 200 200-200 200-56-56 104-104H396q-63 0-109.5 40T240-420q0 60 46.5 100T396-280h284v80H396Z"/>
  </svg>
  )
}

export default RedoIcon;