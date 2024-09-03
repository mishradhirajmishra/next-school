import React, { FC } from 'react'
interface IconProps { className?:string}
const CloseFullIcon: FC<IconProps> = ( {className ="fill-svg-dark"}) => {
  return (
     <svg  className={ className}  height="24" viewBox="0 -960 960 960" width="24"><path d="m136-80-56-56 264-264H160v-80h320v320h-80v-184L136-80Zm344-400v-320h80v184l264-264 56 56-264 264h184v80H480Z"/></svg>
    )
}

export default CloseFullIcon;