import React, { FC } from 'react'
interface IconProps { className?:string}

const ExpendIcon: FC<IconProps>= ( {className ="fill-svg-dark"}) => {
  return (
    <svg className={ className} height="24" viewBox="0 -960 960 960" width="24"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
    )
}

export default ExpendIcon;