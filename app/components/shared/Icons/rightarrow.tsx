import React, { FC } from 'react'
interface IconProps { className?:string}
const RightArrowIcon: FC<IconProps> = ({className}) => {
  return (
    <svg className={className} width="20" height="15" viewBox="0 0 14 8" fill="none">
    <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    )
}

export default RightArrowIcon;