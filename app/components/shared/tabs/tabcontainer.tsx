"use client"
import React, {  useEffect, useState } from "react" 
 
const Tabcontainer = ({ children,show ,className }: { children: React.ReactNode ,show:boolean ,className?:string }) => {
    const [showTab,setshowTab]=useState(false)
    useEffect(()=>{setshowTab(show); },[show])
  return (
      <div className={`${showTab?"":"hidden"} ${className?className:"mx-4 h-[calc(100vh-188px)]"} my-2   overflow-y-auto`}>    
           {children}
      </div>
  )
}
export default Tabcontainer