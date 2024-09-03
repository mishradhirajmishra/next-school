"use client"
import React, { FC, useEffect, useState } from 'react'
import { AllEmployeeProps, EmployeType, Employeainitial, employetheadData } from '@/app/components/shared/model/employeehelper';
import EditIcon from '../../shared/Icons/edit';
import Swall from '../../shared/utils/swal';
import { GetSingleEmployeeApi } from '../../shared/utils/apis';
import EmployeeDetailTable from '../sub/employee/employeedetail';
import TabBar from '../../shared/tabs/tabbar';
import Tabcontainer from '../../shared/tabs/tabcontainer';
import AttendanceSummary from '../sub/employee/attendancesummary';
import SalarySummary from '../sub/employee/salarysummary';
import { useSession } from "next-auth/react";

const MyProfile: FC<AllEmployeeProps> = ({ newData, reciveDataTobeEdited }) => {
  const { data: session, status } = useSession()
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [deleteData, seDeleteData] = useState({ showDelwarn: 0, _id: "" })
  const [row, setrows] = useState<EmployeType>(Employeainitial)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState(0);
  const handleChangePage = (newPage: number) => { setPage(newPage); };

  useEffect(() => {
    if(session?.user._id!=undefined){
      getEmployee(session?.user._id) 
      console.log("session",session?.user._id)
    }
    }, [session?.user._id])

  const getEmployee = async (employee_id:any) => {
    let data = await GetSingleEmployeeApi(employee_id)
    console.log("data",data)
    setrows(data);
  }



  return (
    <>
      <Swall swallData={alertData} />

      <span className="mt-5 relative   overflow-x-auto pb-5">
       <table >
 
     
            <tbody key={row._id}>
            <tr >            
              <td>{row.name}</td>
              <td>{row.role}</td>
              <td>{row.status=="Active" ?
                  <button type='button' className='btn-outline-light p-0 c-text-success mr-3 ' >{row.status}</button>
                  : <button type='button' className='btn-outline-light c-text-error p-0' >{row.status}</button>

                  }</td>
                     <td>{row.emp_type}</td>
              <td>
                <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => { reciveDataTobeEdited(row) }}><EditIcon /></button>
               </td>
            </tr>
         <tr className='fade-in nested'>
                  <td className='py-3' colSpan={7} >      
                    <TabBar tabs={["Employee Detail", "Attendance Detail", "Salary",]} onOptionClick={(val) => { setActiveTab(val) }}  />
                    <Tabcontainer className='flex justify-center items-center' show={activeTab==0}>
                    <EmployeeDetailTable emp={row}/>
                    </Tabcontainer>
                    <Tabcontainer className='flex justify-center items-center' show={activeTab==1}>
                   {activeTab==1 && <AttendanceSummary emp={row}/>}
                    </Tabcontainer>
                    <Tabcontainer className='flex justify-center items-center' show={activeTab==2}>
                   {activeTab==2 && <SalarySummary emp={row}/>}
                    </Tabcontainer>
                    
                    
                  </td>
                </tr>
 



            </tbody>
      
 
 
        </table>
      </span>
    </>
  )
}

export default MyProfile;