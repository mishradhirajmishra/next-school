"use client"

import React, { FC, useEffect, useState } from 'react'
import {GetAllTransportSettingApi,  } from '../../shared/utils/apis'; 
import { TransportSetting, TransportSettingInit } from "@/app/components/shared/model/transporthelper"
import EditIcon from '../../shared/Icons/edit';

 
interface SettingProps {
  newData: any,
  reciveDataTobeEdited: (option: TransportSetting) => void
}

const AllTransportSetting: FC<SettingProps> = ({ newData, reciveDataTobeEdited }) => {
  const [row, setrow] = useState <TransportSetting>(TransportSettingInit)

  useEffect(() => { getSetting() }, [newData])
  const getSetting = async () => {
    let data = await GetAllTransportSettingApi()  
    setrow(data); 
  }

  return (
    <>
      <div className="mt-5 relative   overflow-x-auto pb-5">
       {row && <table >
         <tbody>
          <tr>
          <td><label className="c-form-label">Vehicle Charge <span className='c-text-success'>{row?.vehicle_charge_rule}</span></label> <div className=" c-text-dark  c-input h-10  col-span-1 truncate ">{row?.vehicle_charge} </div>  </td>
          <td><label className="c-form-label">Driver Charge <span className='c-text-success'>{row?.driver_salary_rule}</span></label> <div className=" c-text-dark  c-input h-10  col-span-1 truncate ">{row?.driver_salary} </div>  </td>
          <td><label className="c-form-label">Action</label> <div className="  ">           
                    <button type='button' className='btn-outline-light p-1 ml-5 ' onClick={() => { reciveDataTobeEdited(row) }}><EditIcon /></button></div>  </td>
         </tr>
         <tr><td colSpan={2}>Casual Leave For Male</td><td>{row.cl_male}</td></tr>
         <tr><td  colSpan={2}>Casual Leave For Female</td><td>{row.cl_female}</td></tr>
         <tr><td  colSpan={2}>Max Allowed CL Per Month</td><td>{row.max_cl_per_month}</td></tr>
         <tr><td>  Salary Calculation Rule For Single Day Used In Leave</td><td  colSpan={2}>{row.salary_leave_rule}</td></tr>
       
         <tr>  
 
         </tr>
          </tbody>
     
 
        </table> }
       
      </div>
    </>
  )
}

export default AllTransportSetting;