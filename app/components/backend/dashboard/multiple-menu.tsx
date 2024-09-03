"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC, ReactNode, useState } from 'react'
import ExpendIcon from "../../shared/Icons/expend";
import SingleMenu from "./single-menu";

interface MultiMenuProps {
  open: boolean,
  menudata: {
    label: string,
    optionList: Array<{ label: string; path: string; icon: ReactNode; }>,
    icon: React.ReactNode,
  }
}

const MultiMenu: FC<MultiMenuProps> = ({ open, menudata }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const activePath = usePathname();
  return (
    <> 
     <div onClick={()=>{setMenuOpen(!menuOpen)}}   className={`mx-1 px-1 flex justify-between items-center c-border-b-dark  ${menuOpen? "menu-item-open" : "menu-item"}`}>
      <div className="w-16 h-10 flex justify-center items-center">
        {menudata.icon}
      </div>
      {open ? <div className="w-56 h-10 flex items-center  c-text-dark"> {menudata.label} </div> : <></>}
      {open ? <ExpendIcon className={menuOpen?"rotate-90 fill-svg-dark duration-300":"fill-svg-dark  duration-300"}/> : <></>}
   
      <hr className='border-b border-b-white' />
    </div>
   
    {menuOpen &&  <div className={`animate-down duration-300`} >
      {menudata.optionList.length && menudata.optionList.map((menudata,i)=>
      <SingleMenu key={i} subMenu={true} open={open} menudata={menudata}/>
      ) }
      </div>}
    </>
  )
}

export default MultiMenu;