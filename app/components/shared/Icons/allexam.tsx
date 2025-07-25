import React, { FC } from 'react'
interface IconProps {
  className?:string,  
}

const AllExamIcon: FC<IconProps>= ({className="fill-svg-dark"  }) => {
  return (
    <svg className={className} fill="currentColor"   height="24" viewBox="0 -960 960 960" width="24">
    <path xmlns="http://www.w3.org/2000/svg" d="M160-120q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v560q0 33-23.5 56.5T800-120H160Zm0-80h640v-560H160v560Zm40-80h200v-80H200v80Zm382-80 198-198-57-57-141 142-57-57-56 57 113 113Zm-382-80h200v-80H200v80Zm0-160h200v-80H200v80Zm-40 400v-560 560Z"/>
     </svg>
  )
}

export default AllExamIcon;