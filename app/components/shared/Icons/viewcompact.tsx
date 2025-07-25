import React, { FC } from 'react'
interface IconProps { className?:string}

const ViewCompactIcon: FC<IconProps>= ({className="fill-svg-dark"   }) => {
  return (
    <svg className={ className} fill="currentColor"   height="24" viewBox="0 -960 960 960" width="24">
 <path xmlns="http://www.w3.org/2000/svg" d="M80-170v-620h800v620H80Zm80-440h100v-100H160v100Zm180 0h100v-100H340v100Zm180 0h100v-100H520v100Zm180 0h100v-100H700v100Zm0 180h100v-100H700v100Zm-180 0h100v-100H520v100Zm-180 0h100v-100H340v100Zm-80-100H160v100h100v-100Zm440 280h100v-100H700v100Zm-180 0h100v-100H520v100Zm-180 0h100v-100H340v100Zm-180 0h100v-100H160v100Z"/>
       </svg>
  )
}

export default ViewCompactIcon;