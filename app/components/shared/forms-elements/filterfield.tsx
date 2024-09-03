"use client"
import React, { FC, useState } from 'react'
import PlusIcon from '../Icons/plus';
import SearchIcon from '../Icons/search';

interface FilterFieldProps {
 
  rowsBacup: Array<any>,
  rows: Array<any>,
  handleChange:(option:any)=>void
}

const FilterField: FC<FilterFieldProps> = ({rowsBacup, rows, handleChange }) => {
  const [text,settext]=useState("")
  return (
    <div className="relative max-w-sm">
      {/* {JSON.stringify(rowsBacup)} */}
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
       <SearchIcon/>
    </div>
    <input
    value={text}
     type="search" 
     id="default-search" 
     className="c-input pl-8"
      placeholder="Search ..." 
      onChange={(e)=>{
        let searchText = e.target.value
        settext(searchText)
        if(rowsBacup.length>0){
        handleChange(rowsBacup.filter(x => {            
          if (JSON.stringify(x).toLowerCase().search(searchText.toLowerCase()) != -1) {
            return x;
          }
        }))
      }
      
      }}
       />
   {text!="" && <button className="absolute right-2  z-10 flex items-center c-bg-error rounded-full -mt-8"
        onClick={() => { settext("");handleChange(rowsBacup) }}
         >
        <PlusIcon className='fill-white rotate-45' />
 
      </button>}
 </div>
  )
}

export default FilterField;