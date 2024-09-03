"use client"
import React, { FC, useEffect, useState } from 'react'
import PlusIcon from '../Icons/plus';
import Allmedia from '../../backend/media/allmedia';
import { MediaType } from '../model/mediahelper';


export interface Delobj {delete: boolean, _id: string }
  interface MediaPopupProps {
    mediaData:MediaType,
  getMedia: (option: Delobj) => void
}

export const MediaPopup: FC<MediaPopupProps> = ({ mediaData, getMedia }
) => {
  const [show, setshow] = useState(false)
  useEffect(() => {
    if (mediaData.showMediaPopup != 0) {
      setshow(true);
    }
  }, [mediaData.showMediaPopup])
  return (
    <>
      <div className={`${show ? "" : "hidden"} full-overlay`}    
       >
         <div onClick={() => { setshow(false) }} className="c-bg-dark bg-opacity-50  h-full absolute w-full"></div>
        <div className="relative modal h-5/6  w-5/6 z-30">    
        <button type='button'
              onClick={() => { setshow(false) }}
              className='flex ml-1 right-3 top-3 absolute h-6 c-bg-light-xtra hover:bg-gray-500   rounded-full '>
              <PlusIcon className='fill-white rotate-45' />
            </button>           
          <Allmedia mediaData={mediaData} getSelectedMedia={(val:any)=>{         
            getMedia(val)  
            setshow(false);
            }}/>  
        </div>
      </div>
    </>
  )
}

