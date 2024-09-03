import React, { FC } from 'react'
interface IconProps { className?:string}
const UpArrowIcon: FC<IconProps> = ({className}) => {
  return (
    <svg fill='currentColor'  width="20" height="20" viewBox="0 -960 960 960"  ><path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"/></svg>
     )
}

export default UpArrowIcon;