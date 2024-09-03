"use client"
import React, { FC, useEffect, useState } from 'react'
import timelist from '../../../shared/utils/timelist';
import { CreateUpdateEmployeeSalaryApi, GetAllSettingApi, GetEmployeeAttendancesSummaryApi } from '@/app/components/shared/utils/apis';
import { DaysInThisMonth, Expendrow, getRunningYear, roundTwoDecimal } from '@/app/components/shared/utils/helperfunction';
import MonthList from '@/app/components/shared/utils/monthlist';
import ExpendIcon from '@/app/components/shared/Icons/expend';
import AttendanceCalendar from './attendanccalendar';
import PlusIcon from '@/app/components/shared/Icons/plus';
import { EmployeeSalaryinitial } from '@/app/components/shared/model/employeehelper';
import Swall from '@/app/components/shared/utils/swal';
import { number } from 'yup';
import { useSession } from 'next-auth/react';
const allTimeoption = timelist
export interface AttendanceSummaryProps {
  emp: any,
}
const AttendanceSummary: FC<AttendanceSummaryProps> = ({ emp }) => {
  const { data: session, status } = useSession()
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [rows, setRows] = useState(MonthList.sort((a: any, b: any) => a.order - b.order))
  const [anualSalary, setAnualSalary] = useState<any>()
  const [rowsBacup, setrowsBacup] = useState(MonthList.sort((a: any, b: any) => a.order - b.order))

  useEffect(() => { if (emp != undefined) { GetPeriodTeacherAllotedList(); } }, [emp])
  const GetPeriodTeacherAllotedList = async () => {
    let data = await GetEmployeeAttendancesSummaryApi(emp._id, getRunningYear());
    setrowsBacup(data)
   let newRow= rows.map((m:any)=>{
     let monthAtt =data.filter((x:any)=>m.value==new Date(x.createdAt).getMonth())
    return   calculateMonthlyAttendanceSummary(monthAtt,m)
   })   
   setRows(newRow);
   setAnualSalary(calculateMonthlyAttendanceSummary(data,{name:"Anual"})) 
  }

const calculateMonthlyAttendanceSummary=(monthAtt:any,m:any)=>{
  let presentFull= monthAtt.filter((x:any)=>(x.attendance=="Present" && x.duration=="Full-Day"));
  let presentHalf= monthAtt.filter((x:any)=>x.attendance=="Present" && x.duration !="Full-Day");
  let leave =monthAtt.filter((x:any)=>x.attendance=="Leave");  
  let c_leave =leave.filter((x:any)=>x.leave_type== "Casual Leave");  
  let p_leave =leave.filter((x:any)=>x.leave_type== "Paid Leave");  
  let e_leave =leave.filter((x:any)=>x.leave_type== "Earned Leave");  
  let c_leave_h =presentHalf.filter((x:any)=>x.leave_type== "Casual Leave");  
  let p_leave_h =presentHalf.filter((x:any)=>x.leave_type== "Paid Leave");  
  let e_leave_h =presentHalf.filter((x:any)=>x.leave_type== "Earned Leave");  
    return {...m ,schooldays:monthAtt.length,
     presentdays:presentFull.length+presentHalf.length/2,
     leavedays:leave.length+ presentHalf.length/2,
     c_leave:c_leave.length+c_leave_h.length/2,
     p_leave:p_leave.length+p_leave_h.length/2,
     e_leave:e_leave.length+e_leave_h.length/2,      
   }

}


  const generateSalary= async(s_month:any)=>{  
   let setting= await GetAllSettingApi()
   var amt=   calculateEffectiveSalary(s_month.schooldays,s_month.p_leave,setting.salary_leave_rule);
    const body={ ...EmployeeSalaryinitial,
    employee_id: emp._id,
    month: s_month.name,
    amount:amt,
    schooldays:  s_month.schooldays,
    presentdays: s_month.presentdays,
    leavedays:s_month.leavedays,
    c_leave:s_month.c_leave,
    e_leave:s_month.e_leave,
    p_leave: s_month.p_leave,
    running_year:getRunningYear()
};
    const data = await CreateUpdateEmployeeSalaryApi(body)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
  }

  const calculateEffectiveSalary=(schooldays:number,p_leave:number,salary_leave_rule:string)=>{
    if(salary_leave_rule=="Based on Total day of Month"){
      let totaldays= DaysInThisMonth();
      let singleDaySalary=+emp.salary_pm/totaldays;
      return roundTwoDecimal(emp.salary_pm - (singleDaySalary*p_leave))
    }else if(salary_leave_rule=="Based on Total working day of Month"){
      let singleDaySalary=+emp.salary_pm/+schooldays;
      return roundTwoDecimal(emp.salary_pm - (singleDaySalary*p_leave))
    }
  }

  return (
    <>
        <Swall swallData={alertData} />
       
    <table>
      <thead>
        <tr>
        <td>EXP</td>
        <td>SN</td>
        <td>Month</td>
        <td>School Days</td>
        <td>Present</td>
        <td>Casual Leave</td>
        <td>Paid Leave  </td>
        <td>Earned Leave</td>
        <td>Total Leave</td>
        <td>Action</td>
        </tr>
      </thead>
      {rows.map((month: any, i: number) =>
        <tbody key={month.order}>
          <tr >
            <td className='cursor-pointer w-14' onClick={() => { setRows(Expendrow(month._id, rows)) }}><ExpendIcon className={`${month.expend ? "rotate-90 fill-svg-success" : "fill-svg-light"} duration-300 m-auto`} /></td>
            <td className='w-14'>{i + 1}</td>
            <td >{month.name}</td>
            <td>{month.schooldays}</td>
            <td>{month.presentdays}</td>
            <td>{month.c_leave}</td>
            <td>{month.p_leave}</td>
            <td>{month.e_leave}</td>
            <td>{month.leavedays}</td>
            <td>
              {session?.user.role=="Admin"?
              <button className='btn-outline-light p-1 mr-3 '
            disabled={rowsBacup.filter((x:any)=>month.value==new Date(x.createdAt).getMonth())?.length==0}
            onClick={()=>{ generateSalary(month) }}><PlusIcon className='fill-svg-success'/></button>
            :<></>}
            </td>
          </tr>
          {month.expend &&  <tr className='fade-in nested'>
            <td className='py-3' colSpan={10} >
          {rowsBacup.filter((x:any)=>month.value==new Date(x.createdAt).getMonth())?.length ? <AttendanceCalendar attendance={rowsBacup.filter((x:any)=>month.value==new Date(x.createdAt).getMonth())} />:
          <span className='block text-center'>No Attendance Available</span>}
            </td>
          </tr>
          }          
        </tbody>
      )}
     <tbody>
     <tr >
          
            <td colSpan={2}></td>
            <td  className='c-text-success'>{anualSalary?.name}</td>
            <td>{anualSalary?.schooldays}</td>
            <td>{anualSalary?.presentdays}</td>
            <td>{anualSalary?.c_leave}</td>
            <td>{anualSalary?.p_leave}</td>
            <td>{anualSalary?.e_leave}</td>
            <td>{anualSalary?.leavedays}</td>
            <td>      
            </td>
          </tr>
     </tbody>
    </table>
    </>
  )
}

export default AttendanceSummary;