import React, { FC } from 'react'
interface IconProps { className?:string}

const PlusIcon: FC<IconProps>= ({className="fill-svg-light" }) => {
  return (
    <svg className={className} fill="currentColor"  height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
    )
}

export default PlusIcon;