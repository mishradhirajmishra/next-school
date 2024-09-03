import React, { FC } from 'react'
interface IconProps { className?:string}

const SubjectIcon: FC<IconProps>= ({className}) => {
  return (
    <svg className={ className} fill="currentColor"   height="24" viewBox="0 -960 960 960" width="24">
    <path xmlns="http://www.w3.org/2000/svg" d="M160-200v-80h400v80H160Zm0-160v-80h640v80H160Zm0-160v-80h640v80H160Zm0-160v-80h640v80H160Z"/>
     </svg>
  )
}

export default SubjectIcon;