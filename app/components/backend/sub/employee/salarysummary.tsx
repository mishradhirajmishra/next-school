"use client"
import React, { FC, useEffect, useState } from 'react' 
import { CreateUpdateEmployeeSalaryApi, DelEmployeeSalaryApi, GetAllEmployeeSalaryApi, } from '@/app/components/shared/utils/apis';
import { Expendrow, getRunningYear } from '@/app/components/shared/utils/helperfunction'; 
import ExpendIcon from '@/app/components/shared/Icons/expend';
import { EmployeeSalaryType, EmployeeSalaryinitial } from '@/app/components/shared/model/employeehelper';
import Swall from '@/app/components/shared/utils/swal';
import TextField from '@/app/components/shared/forms-elements/textfield-html';
import DateField from '@/app/components/shared/forms-elements/datefield-html';
import SelectField from '@/app/components/shared/forms-elements/select-html';
import DeleteIcon from '@/app/components/shared/Icons/delete';
import { Delwarn } from '@/app/components/shared/utils/delwarn';
import { useSession } from 'next-auth/react';
 
export interface SalarySummaryProps {
  emp: any,
}
const SalarySummary: FC<SalarySummaryProps> = ({ emp }) => {
  const { data: session, status } = useSession()
  const [deleteData, seDeleteData] = useState({ showDelwarn: 0, _id: "" })
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [rows, setRows] = useState<Array<EmployeeSalaryType>>([EmployeeSalaryinitial]) 
 
  useEffect(() => { if (emp != undefined) { GetAllEmployeeSalary(); } }, [emp])
  const GetAllEmployeeSalary = async () => {
    let data = await GetAllEmployeeSalaryApi(emp._id, getRunningYear());
   setRows(data); 
  }
 
  const updateSalary=async(sal:any)=>{
    let body={...sal,status:"Paid"}
    const data = await CreateUpdateEmployeeSalaryApi(body)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    GetAllEmployeeSalary(); 
  }
  const delSalaryOfMonth = async (val: any) => {
    if (val.delete) {
      let data = await  DelEmployeeSalaryApi(val._id)
      seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
      GetAllEmployeeSalary();      
    }
  }

  return (
    <>
        <Swall swallData={alertData} />
        <Delwarn deleteData={deleteData} handeleDealate={(val) => { delSalaryOfMonth(val) }} />
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
        <td>Amount</td>
        <td>Status</td>
        <td>Action</td>
        </tr>
      </thead>
      {(rows && rows.length) ? rows.map((sal: any, i: number) =>
        <tbody key={sal._id}>
          <tr >
            <td className='cursor-pointer w-14' onClick={() => { setRows(Expendrow(sal._id, rows)) }}><ExpendIcon className={`${sal.expend ? "rotate-90 fill-svg-success" : "fill-svg-light"} duration-300 m-auto`} /></td>
            <td className='w-14'>{i + 1}</td>
            <td >{sal.month}</td>
            <td>{sal.schooldays}</td>
            <td>{sal.presentdays}</td>
            <td>{sal.c_leave}</td>
            <td>{sal.p_leave}</td>
            <td>{sal.e_leave}</td>
            <td>{sal.leavedays}</td>
            <td>{sal.amount}</td>
            <td>{sal.status}</td>
            <td>
            {session?.user.role=="Admin"?
              <button disabled={sal.status=="Paid"} type='button' className='btn-outline-light p-1' onClick={() => { seDeleteData({ showDelwarn: Math.random(), _id: sal._id }) }}><DeleteIcon /></button>:<></>}
            </td>
          </tr> 
          {sal.expend &&  <tr className='fade-in nested'>
            <td className='py-3' colSpan={3} >
            <label  className=" c-form-label">Transaction Id</label>
               <TextField   value={sal.transaction_id} label="" name="transaction_id"  
               onChange={(e: any) => { sal.transaction_id = e.target.value;
                 setRows([...rows].map((x=>{if(x._id==emp._id){x.transaction_id=e.target.value} return x}))) }} 
                />               
            </td>
            <td className='py-3' colSpan={2} >
            <label  className=" c-form-label">Transaction Date</label>
               <DateField    value={sal.transaction_date} label="" name="transaction_date"  
               onChange={(e: any) => { sal.transaction_date = e.target.value;
                 setRows([...rows].map((x=>{if(x._id==emp._id){x.transaction_date=e.target.value} return x}))) }} 
                />               
            </td>
            <td className='py-3' colSpan={2} >
            <label  className=" c-form-label">Mode Of Payment</label>
               <SelectField options={["Cash","Cheque","Upi","Other"]}  value={sal.mode} label="" name="mode"  
               onChange={(e: any) => { sal.mode = e.target.value;
                 setRows([...rows].map((x=>{if(x._id==emp._id){x.mode=e.target.value} return x}))) }} 
                />               
            </td>
            <td  ></td>
            <td  >
            {session?.user.role=="Admin"?  
            <button disabled={sal.transaction_date==""} type='button' className='btn-outline-success mt-5 ' onClick={() => { updateSalary(sal)  }}> Update </button>:<></>}

            </td>
          </tr>
          }   

        </tbody>
      ):<tbody><tr><td colSpan={12}><span className='block text-center'>No salary Generated Yet</span></td></tr></tbody>}
 
    </table>
    </>
  )
}

export default SalarySummary;