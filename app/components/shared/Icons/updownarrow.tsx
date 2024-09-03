import React, { FC } from 'react'
interface IconProps {
  className?: string,
  
}
const UpDownArrowIcon: FC<IconProps> = ({ className="-rotate-90" }) => {
  return (
    <svg className={className} opacity={.3} fill='currentColor' height="20" viewBox="0 -960 960 960" width="20">
      <path d="m680-280-56-56 103-104H520v-80h207L624-624l56-56 200 200-200 200Zm-400 0L80-480l200-200 56 56-103 104h207v80H233l103 104-56 56Z" />
    </svg>
   )
}

export default UpDownArrowIcon;