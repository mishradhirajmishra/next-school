"use client"
import React, { FC, useEffect, useState } from 'react'
import PlusIcon from '../Icons/plus';


export interface opupMsgObj {accepted: boolean, obj: any }
  interface PopupMsgProps {
  data: {
    mainMsg:string;
    subMsg:string;
    showPopupMsg: number;
    obj: any;
  }
  handelePopupMsg: (option: opupMsgObj) => void
}

export const PopupMsg: FC<PopupMsgProps> = ({ data, handelePopupMsg }
) => {
  const [show, setshow] = useState(false)
  useEffect(() => {
    if (data.showPopupMsg != 0) {
      setshow(true);
    }
  }, [data.showPopupMsg])
  return (
    <>
      <div className={`${show ? "" : "hidden"} full-overlay `} onClick={() => { setshow(false) }}>
        <div className="relative modal">
          <div className="c-border-light1 p-1 m-1 rounded-lg ">
            <button type='button'
              onClick={() => { setshow(false) }}
              className='flex ml-1 right-3 top-3 absolute h-6 c-bg-light-xtra hover:bg-gray-500   rounded-full '>
              <PlusIcon className='fill-white rotate-45' />
            </button>
            <div className="p-6">
              <h3 className="c-text-error text-xl mt-10"> {data.mainMsg}
              </h3>
              <p className='c-text-dark mt-3 text-center'>{data.subMsg}</p>
            </div>
            <div className="flex items-center justify-end px-5 pb-5">
              <button className='btn-outline-success  mr-3 ' onClick={() => { handelePopupMsg({ accepted: true, obj: data.obj }); setshow(false) }}>Yes</button>
              <button className='btn-outline-dark' onClick={() => { handelePopupMsg({ accepted: false, obj: data.obj }); setshow(false) }}>No</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

