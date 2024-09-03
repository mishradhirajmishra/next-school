"use client"

import React, { FC, useEffect, useState } from 'react'
import { GetAllSettingApi,  } from '../../shared/utils/apis'; 
import { SettingType } from '../../shared/model/settinghelper';
import EditIcon from '../../shared/Icons/edit';
import Image from 'next/image';
import { ImageSorce } from '../../shared/utils/helperfunction';
import IMGR from '../../shared/images/imgr';
 
interface SettingProps {
  newData: any,
  reciveDataTobeEdited: (option: SettingType) => void
}

const Setting: FC<SettingProps> = ({ newData, reciveDataTobeEdited }) => {
  const [row, setrow] = useState <SettingType>()

  useEffect(() => { getSetting() }, [newData])
  const getSetting = async () => {
    let data = await GetAllSettingApi()  
    setrow(data); 
  }

  return (
    <>
      <div className="mt-5 relative   overflow-x-auto pb-5">
    
       {row && row?.address && <table >
         <tbody>
          <tr>
          <td><label className="c-form-label">School Name</label> <div className=" c-text-dark  c-input h-10  col-span-1 truncate ">{row?.school_name} </div>  </td>
          <td><label className="c-form-label">Running Year</label> <div className=" c-text-dark  c-input h-10  col-span-1 truncate ">{row?.running_year} </div>  </td>
          <td><label className="c-form-label">Running Year</label> <div className="  ">                     <button type='button' className='btn-outline-light p-1 ml-5 ' onClick={() => { reciveDataTobeEdited(row) }}><EditIcon /></button></div>  </td>
         </tr>
         <tr>
          <td  ><label className="c-form-label">Address</label> <div className=" c-text-dark  c-input   col-span-1 truncate capitalize">
            {row?.address?.line_1}<br/>
            {row?.address?.line_2} <br/>
            {row?.address?.city} <br/>
            {row?.address?.state} <br/>
            {row?.address?.country} <br/>
            {row?.address?.pin_no} <br/>            
            </div>  </td>
            <td colSpan={2} className='relative'>
            <IMGR className='p-2'
                          src={row.logo}
                          alt="Profile Image"
                        />
            </td>
 
         </tr>
          </tbody>
     
   
        </table>}
       
      </div>
    </>
  )
}

export default Setting;