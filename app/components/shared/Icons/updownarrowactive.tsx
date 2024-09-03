import React, { FC } from 'react'
interface IconProps {
  className?: string,
  
}
const UpDownArrowActiveIcon: FC<IconProps> = ({ className="fill-svg-dark" }) => {
  return (
    <svg className={className} fill='currentColor' height="20" viewBox="0 -960 960 960" width="20">
      <defs>
        <linearGradient id="grad2">
        <stop offset="0%" stopColor="currentColor" />
        <stop offset="50%"  stopColor="currentColor" />
        <stop stopOpacity=".5" offset="51%" stopColor="currentColor" />
        <stop stopOpacity=".5" offset="100%" stopColor="currentColor" />
        </linearGradient>
      </defs>
      <path
        fill="url(#grad2)"
        stroke="black"
        strokeWidth="1"
        d="m680-280-56-56 103-104H520v-80h207L624-624l56-56 200 200-200 200Zm-400 0L80-480l200-200 56 56-103 104h207v80H233l103 104-56 56Z" />
    </svg>
 


  )
}

export default UpDownArrowActiveIcon;