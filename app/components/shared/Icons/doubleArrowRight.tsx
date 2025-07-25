import React, { FC } from 'react'
interface IconProps { className?:string}

const DoubleArrowRightIcon: FC<IconProps>= ( {className ="fill-svg-dark"}) => {
  return (
    <svg className={ className} height="24" viewBox="0 -960 960 960" width="24"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
     )
}

export default DoubleArrowRightIcon;