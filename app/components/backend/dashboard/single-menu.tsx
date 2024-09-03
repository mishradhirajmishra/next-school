  
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from 'react'

interface SingleMenuProps {
  subMenu?: boolean, 
  open: boolean, 
  menudata: {
    label: string,
    path: string,
    icon: React.ReactNode,   
  }
}

const SingleMenu: FC<SingleMenuProps> = ({ open,subMenu,menudata }) => {
  const activePath = usePathname();
  return (
    <Link href={menudata.path} className={`mx-1 h-10 ${subMenu?"menu-item-sub":""} flex justify-between items-center c-border-b-dark  ${menudata.path==activePath?"menu-item-active":"menu-item"}`}>
      
      <div className={`w-16 flex justify-center items-center  ${menudata.path==activePath?"text-white":""}`}>
        {menudata.icon}
       </div>
      {open ? <div className="w-56 flex items-center"> {menudata.label} </div> : <></>}
      <hr className='border-b border-b-white' />
    </Link>
  )
}

export default SingleMenu;