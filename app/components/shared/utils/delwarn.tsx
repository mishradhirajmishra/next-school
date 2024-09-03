"use client"
import React, { FC, useEffect, useState } from 'react'
import PlusIcon from '../Icons/plus';


export interface Delobj {delete: boolean, _id: string }
  interface DelwarnProps {
  deleteData: {
    showDelwarn: number
    _id: string
  }
  handeleDealate: (option: Delobj) => void
}

export const Delwarn: FC<DelwarnProps> = ({ deleteData, handeleDealate }
) => {
  const [show, setshow] = useState(false)
  useEffect(() => {
    if (deleteData.showDelwarn != 0) {
      setshow(true);
    }
  }, [deleteData.showDelwarn])
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
              <h3 className="c-text-error text-xl mt-10"> Are you sure want to delete it ?
              </h3>
              <p className='c-text-dark mt-3 text-center'>You wont be able to find it again</p>
            </div>
            <div className="flex items-center justify-end px-5 pb-5">
              <button className='btn-outline-success  mr-3 ' onClick={() => { handeleDealate({ delete: true, _id: deleteData._id }); setshow(false) }}>Yes</button>
              <button className='btn-outline-dark' onClick={() => { handeleDealate({ delete: false, _id: deleteData._id }); setshow(false) }}>No</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

