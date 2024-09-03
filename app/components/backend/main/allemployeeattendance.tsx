"use client"

import React, {   FC, useEffect, useState } from 'react'
 
 
import TablePagination from '../../shared/table/pegination'; 
import TableHeader from '../../shared/table/tableheader';
import Swall from '../../shared/utils/swal';
import { GetAllEmployeeAttendancesApi, StartEmployeeAttendancesApi, UpdateEmployeeAttendanceApi  } from '../../shared/utils/apis';
import { format } from 'date-fns';
import SelectField from '../../shared/forms-elements/select-html';
import TextField from '../../shared/forms-elements/textfield-html'; 
import { EmployeType, EmployeeAttendanceType, EmployeeAttendanceinitial, employeeAttendanceHeadData } from '../../shared/model/employeehelper';
import DateField from '../../shared/forms-elements/datefield-html';
const initialValue = EmployeeAttendanceinitial
 

interface AllEmployeeAttendanceProps {
  newData: EmployeeAttendanceType,
  reciveDataTobeEdited: (option: EmployeeAttendanceType) => void
}

const AllEmployeeAttendance: FC<AllEmployeeAttendanceProps> = ({ newData, reciveDataTobeEdited }) => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [rows, setrows] = useState<Array<EmployeeAttendanceType>>([initialValue])
  const [rowsBacup, setrowsBacup] = useState<Array<EmployeeAttendanceType>>([initialValue])
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const [dateSelected, setDateSelected] = useState(format(new Date(), 'yyyy-MM-dd'))

  const handleChangePage = (newPage: number) => { setPage(newPage); }; 

 

  const getallAttendance = async (date: string) => {
    let data = await GetAllEmployeeAttendancesApi( date)
    console.log("ppppppppppppppppppp",data.data)
    setrows(data.data); setrowsBacup(data.data)
  }

 
  


  const startAttendance = async ( date: string) => {
    if (date == format(new Date(), 'yyyy-MM-dd')) {
      let data = await StartEmployeeAttendancesApi( date)
      seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    } else {
      seAlertData({ showSwall: Math.random(), className: "warn", message: "Its allowed for same day only" })
    }

  }
  
  const updateAttendance = async (emp: any) => {
    let data = await UpdateEmployeeAttendanceApi(emp)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
  }
  return (
    <>
      <Swall swallData={alertData} /> 
      <div className='absolute top-[-4px] '>
        {/* <FilterField rows={rows} rowsBacup={rowsBacup} handleChange={(val: any) => { setrows(val) }} /> */}
        <div className="grid grid-cols-12 gap-x-2">
          <DateField className="col-span-2" value={dateSelected} name="sectionSelected" onChange={(e: any) => {
            setDateSelected(e.target.value)
            console.log(e.target.value)
          }} />

          <button className='btn-link-success mt-2 whitespace-nowrap col-span-2'
            disabled={false}
            onClick={() => {
           getallAttendance(dateSelected)
            }}>Get Attendance</button>
          <button className='btn-link-success mt-2 whitespace-nowrap col-span-2'
            disabled={false}
            onClick={() => {
              startAttendance(dateSelected)
            }}>Start Attendance</button>
        </div>
      </div>
      <div className="mt-5 relative   overflow-x-auto pb-5">
       <table >
          <thead>
            <TableHeader theadData={employeeAttendanceHeadData} rows={rows} updateRows={(val) => { setrows(val) }} />
          </thead>
          {rowsBacup && rowsBacup.length && rowsBacup[0]._id  ?  <tbody>
            {rows && (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((emp, i) => <tr key={emp._id}>
              <td >{i + 1}</td>
              <td>{emp.employee_id.name}</td>
              <td><SelectField options={["Present", "Leave"]} value={emp.attendance} name="emp.attendance" onChange={(e: any) => {
                 emp.attendance = e.target.value;
                  setrows([...rows].map((x=>{if(x._id==emp._id){
                    x.attendance=e.target.value;
                    if(e.target.value =="Leave"){
                       x.leave_type="Casual Leave"; 
                       x.duration="Full-Day"; 
                      }else{
                      x.leave_type=""; 
                      x.duration="Full-Day"; 
                      }                      
                  }
                   return x}))) }}
                    />  </td>
              <td className='whitespace-nowrap'>              
               <SelectField disabled={emp.attendance=="Leave"} options={["Full-Day", "First-half", "Second-Half"]} value={emp.duration} name="stu.duration" onChange={(e: any) => { 
                 setrows([...rows].map((x=>{
                  if(x._id==emp._id){
                    x.duration=e.target.value
                    if(e.target.value=="Full-Day"){
                      x.leave_type=""; 
                    }else{
                      x.leave_type="Paid Leave"; 
                    }
                  } return x})))
                  }} /> 
                </td>
 
              <td>
              {(emp.attendance == "Leave" || (emp.attendance == "Present" && emp.duration != "Full-Day")) &&
                <SelectField  options={[ "Casual Leave", "Paid Leave", "Earned Leave"]} value={emp.leave_type} name="emp.leave_type" onChange={(e: any) => { emp.leave_type = e.target.value; setrows([...rows].map((x=>{if(x._id==emp._id){x.leave_type=e.target.value} return x}))) }} />}  </td>
      
              <td>  <TextField   value={emp.remark} name="emp.remark" onChange={(e:any)=>{   setrows([...rows].map((x=>{if(x._id==emp._id){x.remark=e.target.value} return x})))}} placeholder='Enter Remarks' />
              </td>              
              <td>
                <button type='button' className='btn-outline-success p-1 mr-3 ' onClick={() => { updateAttendance(emp) }}>Update</button>
               </td>
            </tr>)}
          </tbody>:<tbody><tr><td colSpan={11} className='text-center c-text-dark'>No Employee Attendance found.</td></tr></tbody>}
          {rowsBacup && rowsBacup.length>rowsPerPage && rowsBacup[0]._id  ? <tfoot>
            <tr>
              <td colSpan={12}>
                <TablePagination
                  rowsPerPage={rowsPerPage}
                  page={page}
                  count={rows.length}
                  onPageChange={handleChangePage}
                  onShowBtnClick={(val) => { setRowsPerPage(val) }}
                  setPage={(val) => { setPage(val) }}
                />
              </td>
            </tr>
          </tfoot>:<></>}
        </table>
      </div>
    </>
  )
}

export default AllEmployeeAttendance;