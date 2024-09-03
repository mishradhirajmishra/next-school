import React, { FC } from 'react'
interface IconProps { className?:string}
const ExpendMoreIcon: FC<IconProps> = ( {className ="fill-svg-dark"}) => {
  return (
<svg className={ className} fill="currentColor"   height="24" viewBox="0 -960 960 960" width="24"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>
   )
}

export default ExpendMoreIcon;