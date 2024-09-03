"use client"
import React, { FC, useEffect, useState } from 'react'
import { AllEmployeeProps, EmployeType, Employeainitial, employetheadData } from '@/app/components/shared/model/employeehelper';
import TablePagination from '../../shared/table/pegination';
import TableHeader from '../../shared/table/tableheader';
import FilterField from '../../shared/forms-elements/filterfield';
import DeleteIcon from '../../shared/Icons/delete';
import EditIcon from '../../shared/Icons/edit';
import {Delwarn, Delobj } from '../../shared/utils/delwarn';
import Swall from '../../shared/utils/swal';
import {CreateUpdateEmployeeApi, DelEmployeeApi, GetAllEmployeeApi } from '../../shared/utils/apis';
import {Expendrow} from '../../shared/utils/helperfunction';
import ExpendIcon from '../../shared/Icons/expend';
import EmployeeDetailTable from '../sub/employee/employeedetail';
import TabBar from '../../shared/tabs/tabbar';
import Tabcontainer from '../../shared/tabs/tabcontainer';
import AttendanceSummary from '../sub/employee/attendancesummary';
import SalarySummary from '../sub/employee/salarysummary';
 
const AllEmployee: FC<AllEmployeeProps> = ({ newData, reciveDataTobeEdited }) => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [deleteData, seDeleteData] = useState({ showDelwarn: 0, _id: "" })
  const [rows, setrows] = useState<Array<EmployeType>>([Employeainitial])
  const [rowsBacup, setrowsBacup] = useState<Array<EmployeType>>([Employeainitial])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState(0);
  const handleChangePage = (newPage: number) => { setPage(newPage); };

  useEffect(() => { getEmployee() }, [newData])
  const getEmployee = async () => {
    let data = await GetAllEmployeeApi()
    setrows(data.data); 
    setrowsBacup(data.data)
  }
  const delemployee = async (val: Delobj) => {
    if (val.delete) {
      let data = await  DelEmployeeApi(val._id)
      seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
      let newData = rowsBacup.filter(x => x._id != val._id)
      setrows(newData); setrowsBacup(newData)
    }
  }
  const updateStatus = async (val:any) => {
    let data = await CreateUpdateEmployeeApi(val)
    let newData = rowsBacup.map(x =>{ if(x._id == val._id){x.status=val.status} return x})
    setrows(newData); setrowsBacup(newData)
    seAlertData({ showSwall: Math.random(), className: data.class, message: "Status updated Successfully" })
  }

  return (
    <>
      <Swall swallData={alertData} />
      <Delwarn deleteData={deleteData} handeleDealate={(val) => { delemployee(val) }} />
      <span className='absolute top-1'>
        <FilterField rows={rows} rowsBacup={rowsBacup} handleChange={(val: any) => { setrows(val) }} />
      </span>
      <span className="mt-5 relative   overflow-x-auto pb-5">
       <table >
          <thead>
            <TableHeader theadData={employetheadData} rows={rows} updateRows={(val) => { setrows(val) }} />
          </thead>
          {rowsBacup && rowsBacup.length && rowsBacup[0]._id  ?  <>
            {rows && (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((emp, i) => 
            <tbody key={emp._id}>
            <tr >
             <td className='cursor-pointer w-14' onClick={() => { setrows(Expendrow(emp._id, rows)) }}><ExpendIcon className={`${emp.expend ? "rotate-90 " : ""}fill-svg-light duration-300 m-auto`} /></td>
              <td>{i + 1}</td>          
              <td>{emp.name}</td>
              <td>{emp.role}</td>
              <td>{emp.status=="Active" ?
                  <button type='button' className='btn-outline-light p-0 c-text-success mr-3 ' onClick={() => { updateStatus({_id:emp._id,status:"Inactive"}) }}>{emp.status}</button>
                  : <button type='button' className='btn-outline-light c-text-error p-0' onClick={() => { updateStatus({_id:emp._id,status:"Active"}) }}>{emp.status}</button>

                  }</td>
                     <td>{emp.emp_type}</td>
              <td>
                <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => { reciveDataTobeEdited(emp) }}><EditIcon /></button>
                <button disabled={true} type='button' className='btn-outline-light p-1' onClick={() => { seDeleteData({ showDelwarn: Math.random(), _id: emp._id }) }}><DeleteIcon /></button>
              </td>
            </tr>
            {emp.expend && <tr className='fade-in nested'>
                  <td className='py-3' colSpan={7} >
                    <TabBar tabs={["Employee Detail", "Attendance Detail", "Salary",]} onOptionClick={(val) => { setActiveTab(val) }}  />
                    <Tabcontainer className='flex justify-center items-center' show={activeTab==0}>
                    <EmployeeDetailTable emp={emp}/>
                    </Tabcontainer>
                    <Tabcontainer className='flex justify-center items-center' show={activeTab==1}>
                   {activeTab==1 && <AttendanceSummary emp={emp}/>}
                    </Tabcontainer>
                    <Tabcontainer className='flex justify-center items-center' show={activeTab==2}>
                   {activeTab==2 && <SalarySummary emp={emp}/>}
                    </Tabcontainer>
                  </td>
                </tr>
                }



            </tbody>
            )}
          </>:<tbody><tr><td colSpan={11} className='text-center c-text-dark'>No Employee found.</td></tr></tbody>}
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
      </span>
    </>
  )
}

export default AllEmployee;