import React, { FC } from 'react'
interface IconProps { className?:string}
const MarksheetIcon: FC<IconProps> = ( {className ="fill-svg-dark"}) => {
  return (
    <svg  className={ className} fill="currentColor"   height="24" viewBox="0 -960 960 960" width="24">
 <path xmlns="http://www.w3.org/2000/svg" d="M360-600v-80h360v80H360Zm0 120v-80h360v80H360Zm120 320H200h280Zm0 80H240q-50 0-85-35t-35-85v-120h120v-560h600v361q-20-2-40.5 1.5T760-505v-295H320v480h240l-80 80H200v40q0 17 11.5 28.5T240-160h240v80Zm80 0v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/>
      </svg>
    )
}

export default MarksheetIcon;