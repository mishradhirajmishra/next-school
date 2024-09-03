import React, { FC } from 'react'
interface IconProps { className?:string}
const SearchIcon: FC<IconProps> = ({className="c-text-dark"   }) => {
  return (
    <svg className={className} height={20} width={16}   fill="none" viewBox="0 0 20 20">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
</svg>
   )
}

export default SearchIcon;