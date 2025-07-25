import React, { FC } from 'react'
interface IconProps { className?:string}
const SuccessIcon: FC<IconProps> = ({className}) => {
  return (
    <svg className="w-10 h-10 animate-bounce" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
     </svg>   )
}

export default SuccessIcon;