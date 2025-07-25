import React, { FC } from 'react'
interface IconProps { className?:string}
const ErrorIcon: FC<IconProps> = ( {className ="fill-svg-dark"}) => {
  return (
    <svg className="w-12 h-12 animate-pulse" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
     </svg>   )
}

export default ErrorIcon;