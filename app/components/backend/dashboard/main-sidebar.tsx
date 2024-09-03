
"use client"
import React, { FC, useEffect } from 'react'
import { useState } from "react"
import AdminSidebar from './admin-sidebar'
import { SettingType } from '../../shared/model/settinghelper'
import { GetAllSettingApi } from '../../shared/utils/apis'

import IMGR from '../../shared/images/imgr'
interface SidebarProps {
  onOptionClick: (option: boolean) => void  
}

const Sidebar: FC<SidebarProps> = ({ onOptionClick }) => {
    const [open, setOpen] = useState(true)
    const [row, setrow] = useState <SettingType>()
    useEffect(() => { getSetting() }, [])
    const getSetting = async () => {
      let data = await GetAllSettingApi()  
      localStorage.setItem("setting",JSON.stringify(data))
      setrow(data); 
    }
  return (
    <aside className={`${open ? "w-72" : "w-16"} c-bg-dark duration-1000 pt-5 z-0`}>
    <div className="flex justify-between pb-5">
     {open &&  <div className={`${open ? "w-56" : "w-0"} duration-300  flex justify-center items-center `}>
     {row && row.logo&& 
     <div className='h-24 w-24 relative'>
     <IMGR className={`${open ? "w-24" : "w-0"} self-center  duration-300`}  src={row?.logo}  alt="Profile Image"  />
     </div>
     }
       </div>}
      <div className="w-16 h-16 flex justify-center items-center">
      <button className="btn-outline p-1 duration-150" onClick={()=>{
        if(open)
         { onOptionClick(false);setOpen(false)}else{setOpen(true);onOptionClick(true)}}}>{open ?
        <svg className="fill-svg-dark " height="24" viewBox="0 -960 960 960" width="24"><path d="M120-240v-80h520v80H120Zm664-40L584-480l200-200 56 56-144 144 144 144-56 56ZM120-440v-80h400v80H120Zm0-200v-80h520v80H120Z" /></svg>
        :
        <svg className="fill-svg-dark " height="24" viewBox="0 -960 960 960" width="24"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>}
      </button>
      </div>
    </div>
    <AdminSidebar open={open}/>
  </aside> 
  )
}

export default Sidebar;