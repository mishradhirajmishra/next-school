"use client"

import React, { FC, useEffect, useState } from 'react'
import { AllClassProps, BasicData, ClassType, Classinitial, classheadData } from '@/app/components/shared/model/classhelper';
import TablePagination from '../../shared/table/pegination';
import TableHeader from '../../shared/table/tableheader';
import FilterField from '../../shared/forms-elements/filterfield';
import DeleteIcon from '../../shared/Icons/delete';
import EditIcon from '../../shared/Icons/edit';
import { Delwarn, Delobj } from '../../shared/utils/delwarn';
import Swall from '../../shared/utils/swal';
import ExpendIcon from '../../shared/Icons/expend';
import { Expendrow } from '../../shared/utils/helperfunction';
import timelist from '../../shared/utils/timelist';
import { DelClassApi, GetAllClassApi, GetEmployeeDropdownApi } from '../../shared/utils/apis';
import { EmployeType, Employeainitial } from '../../shared/model/employeehelper';

const AllClass: FC<AllClassProps> = ({ newData, reciveDataTobeEdited }) => {
  const allTimeoption = timelist
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [deleteData, seDeleteData] = useState({ showDelwarn: 0, _id: "" })
  const [rows, setrows] = useState<Array<ClassType>>([Classinitial])
  const [rowsBacup, setrowsBacup] = useState<Array<ClassType>>([Classinitial])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [teacherList, setteacherList] = useState<Array<EmployeType>>([Employeainitial])
  const handleChangePage = (newPage: number) => { setPage(newPage); };

  useEffect(() => { getTeacherList() }, [newData])
  const getTeacherList = async () => {
    let data = await GetEmployeeDropdownApi("Teacher")
    setteacherList(data.data);
  }

  useEffect(() => { getClass() }, [newData])
  const getClass = async () => {
    const data = await GetAllClassApi(); 
    setrows(data.data); setrowsBacup(data.data)
  }

  const delClass = async (val: Delobj) => {
    if (val.delete) {
      let data = await DelClassApi(val._id)
      seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
      let newData = rowsBacup.filter(x => x._id != val._id)
      setrows(newData); setrowsBacup(newData)
    }
  }

  return (
    <>
      <Swall swallData={alertData} />
      <Delwarn deleteData={deleteData} handeleDealate={(val) => { delClass(val) }} />
      <div className='absolute top-1'>
        <FilterField rows={rows} rowsBacup={rowsBacup} handleChange={(val: any) => { setrows(val) }} />
      </div>
      <div className="mt-5 relative   overflow-x-auto pb-5">
        <table  >
          <thead>
            <TableHeader theadData={classheadData} rows={rows} updateRows={(val) => { setrows(val) }} />
          </thead>
          {rowsBacup && rowsBacup.length && rowsBacup[0]._id ? <>
            {rows && (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((cl, i) =>
              <tbody key={cl._id}>
                <tr >
                  <td className='cursor-pointer w-14' onClick={() => { setrows(Expendrow(cl._id, rows)) }}><ExpendIcon className={`${cl.expend ? "rotate-90 " : ""}fill-svg-light duration-300 m-auto`} /></td>
                  <td>{i + 1}</td>
                  <td>{cl.name}</td>
                  <td className='min-w-fit flex whitespace-nowrap justify-end'>
                    <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => { reciveDataTobeEdited(cl, "class", { _id: cl._id, name: cl.name }, { _id: "", name: "" }) }}><EditIcon /></button>
                    {/* <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => {   }}><DuplicateIcon /></button>  */}
                    <button type='button' className='btn-outline-light p-1' onClick={() => { seDeleteData({ showDelwarn: Math.random(), _id: cl._id }) }}><DeleteIcon /></button>
                  </td>
                </tr>
                {/* ============== Expended Area ================= */}
                {cl.expend && <tr className='fade-in nested'>
                  <td className='p-0 opacity-90 ' colSpan={4} >
                    <span>
                      <table>
                        <thead><tr className='w-14'><th></th><th>Section</th><th>Room No</th><th>Class Teacher</th></tr></thead>
                        {cl.section && cl.section.length && cl.section.map((sec, j) =>
                          <tbody key={j}>
                            <tr>
                              <td className='cursor-pointer w-14' onClick={() => { rows[i].section = Expendrow(sec._id, cl.section); setrows(JSON.parse(JSON.stringify(rows))) }}>
                                <ExpendIcon className={`${sec.expend ? "rotate-90 " : ""}fill-svg-light duration-300 m-auto fill-svg-success`} />
                              </td>
                              <td className='capitalize '>{sec.name}</td>
                              <td className='capitalize '>{sec.room_no}</td>
                              <td className='capitalize '>{teacherList.find(x => x._id == sec.class_teacher)?.name}</td>
                              <td className='' >
                                <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => {
                                  reciveDataTobeEdited(sec, "manage-period", { _id: cl._id, name: cl.name }, { _id: "", name: "" })
                                }}><EditIcon /></button>
                              </td>
                              <td className='p-0 opacity-90 c-text-error ' >  | </td>
                              <td className=' opacity-60' >  Subject  </td>
                              <td className=' opacity-60' >  Monday  </td>
                              <td className='p-0 opacity-90 c-text-error' >  | </td>
                              <td className=' opacity-60' >  Subject  </td>
                              <td className=' opacity-60' >  Monday  </td>
                              <td className='p-0 opacity-90 c-text-error' >  | </td>
                              <td className=' opacity-60' >  Subject  </td>
                              <td className=' opacity-60' >  Monday  </td>
                              <td className='p-0 opacity-90 c-text-error' >  | </td>
                              <td className=' opacity-60' >  Subject  </td>
                              <td className=' opacity-60' >  Monday  </td>
                              <td className='p-0 opacity-90 c-text-error' >  | </td>
                              <td className=' opacity-60' >  Subject  </td>
                              <td className=' opacity-60' >  Monday  </td>
                              <td className='p-0 opacity-90 c-text-error' >  | </td>
                              <td className=' opacity-60' >  Subject  </td>
                              <td className=' opacity-60' >  Monday  </td>
                            </tr>
                            {sec.expend && sec.period && sec.period.length > 0 && sec.period.map((per, k) =>
                              <tr key={k} >
                                <td className='w-[72px] flex justify-center'>{k + 1}</td>
                                <td >{per.name}</td>
                                <td >{allTimeoption.find((x: any) => x.value == per.start_time)?.name}</td>
                                <td >{allTimeoption.find((x: any) => x.value == per.end_time)?.name}</td>
                                {/* <td >{teacherList.find(x=>x._id==per.)?.name}</td> */}
                                <td>
                                  <button type='button' className='btn-outline-light p-1 mr-3' onClick={() => {
                                    reciveDataTobeEdited(per, "allot-period", { _id: cl._id, name: cl.name }, { _id: sec._id, name: sec.name })
                                  }}><EditIcon className='fill-svg-light' /></button>
                                </td>
                                <td className='p-0 opacity-90 c-text-success' >  | </td>
                                <td> {per.monday.subject} </td>
                                <td> {per.monday.teacher!=""?teacherList.find(x=>x._id==per.monday.teacher)?.name:<></>} </td>
                                <td className='p-0 opacity-90 c-text-success' >  | </td>
                                <td> {per.tuesday.subject} </td>
                                <td> {per.tuesday.teacher!=""?teacherList.find(x=>x._id==per.tuesday.teacher)?.name:<></>} </td>
                                <td className='p-0 opacity-90 c-text-success' >  | </td>
                                <td> {per.wednesday.subject} </td>
                                <td> {per.wednesday.teacher!=""?teacherList.find(x=>x._id==per.wednesday.teacher)?.name:<></>} </td>
                                <td className='p-0 opacity-90 c-text-success' >  | </td>
                                <td> {per.thursday.subject} </td>
                                <td> {per.thursday.teacher!=""?teacherList.find(x=>x._id==per.thursday.teacher)?.name:<></>} </td>
                                <td className='p-0 opacity-90 c-text-success' >  | </td>
                                <td> {per.friday.subject} </td>
                                <td> {per.friday.teacher!=""?teacherList.find(x=>x._id==per.friday.teacher)?.name:<></>} </td>
                                <td className='p-0 opacity-90 c-text-success' >  | </td>
                                <td> {per.saturday.subject} </td>
                                <td> {per.saturday.teacher!=""?teacherList.find(x=>x._id==per.saturday.teacher)?.name:<></>} </td>
                              </tr>
                            )}
                          </tbody>
                        )}

                      </table>
                    </span>
                  </td>
                </tr>}
                {/* ================================================ */}
              </tbody>
            )}
          </> : <tbody><tr><td colSpan={11} className='text-center c-text-dark'>No Class & Section found.</td></tr></tbody>}
          {rowsBacup && rowsBacup.length>rowsPerPage && rowsBacup[0]._id ? <tfoot>
            <tr>
              <td colSpan={5}>
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
          </tfoot> : <></>}
        </table>
      </div>
    </>
  )
}

export default AllClass;