import React, { FC } from 'react'
interface IconProps { className?:string}
const LeftArrowIcon: FC<IconProps> = ( {className ="fill-svg-dark"}) => {
  return (
    <svg width="20" height="15" viewBox="0 0 14 8" fill="none">
    <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
      )
}

export default LeftArrowIcon;