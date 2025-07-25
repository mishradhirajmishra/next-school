import React, { FC } from 'react'
interface IconProps { className?:string}
const DoneAllIcon: FC<IconProps> = ( {className ="fill-svg-dark"}) => {
  return (
<svg className={ className} fill="currentColor"   height="24" viewBox="0 -960 960 960" width="24">
<path xmlns="http://www.w3.org/2000/svg" d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z"/>
  </svg>
   )
}

export default DoneAllIcon;