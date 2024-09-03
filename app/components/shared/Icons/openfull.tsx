import React, { FC } from 'react'
interface IconProps { className?:string}
const OpenFullIcon: FC<IconProps> = ( {className ="fill-svg-dark"}) => {
  return (
    <svg  className={ className}  height="24" viewBox="0 -960 960 960" width="24"> 
 <path d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z"/></svg>
        )
}

export default OpenFullIcon;