"use client"
import React, { FC, useEffect, useState } from 'react'
import PlusIcon from '../Icons/plus';
import InfoIcon from '../Icons/info';
import WarnIcon from '../Icons/warn';
import ErrorIcon from '../Icons/error';
import SuccessIcon from '../Icons/success';

interface SwallProps {  
      swallData:{     
      showSwall:number
      className?:string
      message?:string}
}

const Swall: FC<SwallProps> = ({swallData:{showSwall ,className,message}}) => {
  const [show,setshow]=useState(false)
  useEffect(()=>{
    if(showSwall!=0){
      setshow(true); 
      setTimeout(()=>{setshow(false)},8000)
    }
  }
    ,[showSwall])
  
  return (
    <div className={`${show?"block":"hidden"} duration-300 absolute right-1 top-1 max-w-sm flex flex-col`}>     
      <div className={`${className}`} role="Swall">
       {className=="success" && <SuccessIcon />}
       {className=="error" && <ErrorIcon />}
       {className=="info" &&  <InfoIcon />}
       {className=="warn" && <WarnIcon/>}            
        <div className="ml-3 text-lg font-medium">
          {message}
        </div>
        <button type='button'
          onClick={() => { setshow(false)}}
          className='flex ml-1 h-6 c-bg-light-xtra hover:c-bg-dark rounded-full -mr-2 -mt-8'>
          <PlusIcon className='fill-white rotate-45' />
        </button>        
      </div>
      {className=="success" && <div className='success-bottom-line'></div>}
       {className=="error" && <div className='error-bottom-line'></div>}
       {className=="info" &&  <div className='info-bottom-line'></div>}
       {className=="warn" && <div className='warn-bottom-line'></div>}       
      
     </div>
  )
}

export default Swall;