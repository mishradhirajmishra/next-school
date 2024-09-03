import React, { FC } from 'react'
interface IconProps { className?:string}
const DownArrowIcon: FC<IconProps> = ( {className ="fill-svg-dark"}) => {
  return (
<svg fill='currentColor' className={ className}  width="20" height="20" viewBox="0 -960 960 960"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"/></svg>
    )
}

export default DownArrowIcon;