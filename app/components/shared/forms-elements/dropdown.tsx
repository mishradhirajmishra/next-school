"use client"
import React, { FC, useState } from 'react'
 
import Image from 'next/image'
import ExpendMoreIcon from '../Icons/expendmore'

interface ListItem {
   preIcon?:any,
    postIcon?:any,
     text?:any
     }
  interface DropdownProps {  
    button?:ListItem
    classNameBtn?: String,
    classNameDRP?: String,
    dropdownlist?: Array<ListItem>
    onOptionClick: (option: String) => void    
}

const Dropdown: FC<DropdownProps> = ({ button,classNameBtn,classNameDRP, dropdownlist, onOptionClick }) => {

    return ( 
<div className="dropdown relative p-0 m-0">
  <button className={`${classNameBtn?"":"btn-outline-dark"} p-0 rounded inline-flex items-center`}>
  {button?.preIcon?<span className="  ">{button?.preIcon}</span>:<></>}
  {button?.text? <span className=" ">{button?.text}</span>:<></>}
  {button?.postIcon? <span className=" ">{button?.postIcon}</span>:<></>}
    <ExpendMoreIcon/> 
   </button>
  <ul className="dropdown-menu absolute hidden right-0 text-sm  z-10   bg-neutral-400 divide-y divide-neutral-300 rounded-sm shadow   dark:bg-gray-500 dark:divide-gray-600">
    {dropdownlist && dropdownlist.length && dropdownlist.map((ddl:any,i:number)=>
    <li key={i} className="w-full text-nowrap">
      <button className="px-4 py-2 dark:hover:bg-gray-600  w-full text-left text-nowrap flex flex-row justify-between" onClick={()=>{ onOptionClick(ddl.text)}} > 
       <span className="mr-1">{ddl.preIcon}</span>
    <span className="-mt-1 ">{ddl.text}</span>
    <span className="ml-1">{ddl.postIcon}</span></button></li>
    
    )}  
 
  </ul>
</div>
 
    )
}

export default Dropdown;
 