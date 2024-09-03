"use client"

import React, { FC, useEffect, useState } from 'react'

import { StudentType, Studentinitial, studentheadData } from '@/app/components/shared/model/studenthelper';
import TablePagination from '../../shared/table/pegination';
import TableHeader from '../../shared/table/tableheader';
import DeleteIcon from '../../shared/Icons/delete';
import EditIcon from '../../shared/Icons/edit';
import { Delwarn, Delobj } from '../../shared/utils/delwarn';
import Swall from '../../shared/utils/swal';
import { CreateUpdateStudentApi, DelStudentApi, GetAllClassApi, GetAllClassDropDownApi, GetSpecificStudentsApi } from '../../shared/utils/apis';
import { ClassDropDownType, ClassType, Classinitial, ClassinitialDropdown } from '../../shared/model/classhelper';
import ExpendIcon from '../../shared/Icons/expend';
import { Expendrow, ImageSorce } from '../../shared/utils/helperfunction';
import Image from 'next/image';
import SelectArryField from '../../shared/forms-elements/selectArray-html';
import FilterField from '../../shared/forms-elements/filterfield';
import { useSession } from 'next-auth/react';
import IMG from '../../shared/images/img';
import IMGR from '../../shared/images/imgr';
const initialValue = Studentinitial
const initialValueClass = Classinitial
const selectedSectionInitial = { name: "", _id: "", value: "" }

interface AllStudentsProps {
  newData: StudentType,
  reciveDataTobeEdited: (option: StudentType) => void
}


const AllStudents: FC<AllStudentsProps> = ({ newData, reciveDataTobeEdited }) => {
  const { data: session, status } = useSession()
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [deleteData, seDeleteData] = useState({ showDelwarn: 0, _id: "" })
  const [rows, setrows] = useState<Array<StudentType>>([initialValue])
  const [rowsBacup, setrowsBacup] = useState<Array<StudentType>>([initialValue])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [clasList, setclasList] = useState<Array<ClassType>>([initialValueClass])
  const [classList, setClassList] = useState<Array<ClassDropDownType>>([ClassinitialDropdown])
  const [classSelected, setClassSelected] = useState<ClassDropDownType>(ClassinitialDropdown)
  const [sectionSelected, setSectionSelected] = useState(selectedSectionInitial)

  const handleChangePage = (newPage: number) => { setPage(newPage); };

  useEffect(() => {
    if (session?.user.role == "Teacher") {
      //@ts-ignore
      setClassSelected({ ...classSelected, _id: session?.user.class })
      //@ts-ignore
      setSectionSelected({ ...sectionSelected, _id: session?.user.section })
      let param = { class: session?.user.class, section: session?.user.section }
      getSpecificStudentsForSection(param)
    } else if (session?.user.role == "Admin") {
      getSpecificStudents()
      GetAllClassDropDown()
      getClass()
    }
  }, [session, newData])

  const GetAllClassDropDown = async () => {
    let data = await GetAllClassDropDownApi()
    setClassList(data.data)
  }

  const getClass = async () => {
    const data = await GetAllClassApi()
    setclasList(data.data);
  }

  const getSpecificStudents = async () => {
    let param = {}
    if (classSelected._id !== "" && sectionSelected._id !== "") { param = { class: classSelected._id, section: sectionSelected._id } }
    else if (classSelected._id !== "" && sectionSelected._id == "") { param = { class: classSelected._id } } else { param = {} }
    let data = await GetSpecificStudentsApi(param)
    setrows(data.data); setrowsBacup(data.data)
  }

  const getSpecificStudentsForSection = async (param: any) => {
    let data = await GetSpecificStudentsApi(param)
    setrows(data.data); setrowsBacup(data.data)
  }



  const deletestudent = async (val: Delobj) => {
    if (val.delete) {
      let data = await DelStudentApi(val._id)
      seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
      let newData = rowsBacup.filter(x => x._id != val._id)
      setrows(newData); setrowsBacup(newData)
    }
  }
  const updateStatus = async (val: any) => {
    let data = await CreateUpdateStudentApi(val)
    let newData = rowsBacup.map(x => { if (x._id == val._id) { x.status = val.status } return x })
    setrows(newData); setrowsBacup(newData)
    seAlertData({ showSwall: Math.random(), className: data.class, message: "Status updated Successfully" })
  }

  return (
    <>
      <Swall swallData={alertData} />
      <Delwarn deleteData={deleteData} handeleDealate={(val) => { deletestudent(val) }} />
      <span className='absolute top-[-4px] '>

        <span className="grid grid-cols-12 gap-x-2">
          <span className="col-span-2 mt-2">
            <FilterField rows={rows} rowsBacup={rowsBacup} handleChange={(val: any) => { setrows(val) }} />
          </span>
          {session?.user.role == "Admin" ? <>
            <SelectArryField className="col-span-2" options={classList} firstOption="Class" value={classSelected._id} label="" name="class" onChange={(e: any) => {
              let tstuData = classList.find(x => x._id == e.target.value)
              if (tstuData != undefined) { setClassSelected(tstuData) }
              setSectionSelected(selectedSectionInitial)
            }} />
            <SelectArryField className="col-span-2" options={classSelected.section} firstOption="Section" value={sectionSelected._id} label="" name="section" onChange={(e: any) => {
              let tstuData = classSelected.section.find(x => x._id == e.target.value)
              if (tstuData != undefined) { setSectionSelected(tstuData) }
            }} />

            <button className='btn-link-success mt-2 whitespace-nowrap col-span-2'
              // disabled={sectionSelected._id == "" }
              onClick={() => {
                getSpecificStudents()
              }}>Get Students</button>
          </> : <></>}
        </span>
      </span>
      <span className="mt-5 relative   overflow-x-auto pb-5">
        <table >
          <thead>
            <TableHeader theadData={studentheadData} rows={rows} updateRows={(val) => { setrows(val) }} />
          </thead>
          {rowsBacup && rowsBacup.length && rowsBacup[0]._id  ? <>
            {rows && (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((stu, i) =>
              <tbody key={stu._id}>
                <tr >
                  <td className='cursor-pointer w-14' onClick={() => { setrows(Expendrow(stu._id, rows)) }}><ExpendIcon className={`${stu.expend ? "rotate-90 " : ""}fill-svg-light duration-300 m-auto`} /></td>
                  <td>{i + 1}</td>
                  <td>{stu.name}</td>
                  <td>{stu.guardian.name}</td>
                  <td>{stu.family_detail.find((x: any) => x.relation == "Father")?.name}</td>
                  <td>{stu.status == "Active" ?
                    <button type='button' className='btn-outline-light p-0 c-text-success mr-3 ' onClick={() => { updateStatus({ _id: stu._id, status: "Inactive" }) }}>{stu.status}</button>
                    : <button type='button' className='btn-outline-light c-text-error p-0' onClick={() => { updateStatus({ _id: stu._id, status: "Active" }) }}>{stu.status}</button>

                  }</td>

                  <td>
                    <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => { reciveDataTobeEdited(stu) }}><EditIcon /></button>
                    <button type='button' className='btn-outline-light p-1' onClick={() => { seDeleteData({ showDelwarn: Math.random(), _id: stu._id }) }}><DeleteIcon /></button>
                  </td>
                </tr>
                {stu.expend && <tr className='fade-in nested'>
                  <td className='py-3' colSpan={7} >
                    <span className='flex justify-center items-center'>
                      <table>
                        <thead>
                          <tr className='w-14'>
                            <td rowSpan={2} >
                              <span className='flex justify-center items-center  relative h-32 w-auto'>
                                <IMGR src={stu.profile_image} alt='profile image' />
                              </span>
                            </td>
                            <td className='w-48'><label className="c-form-label">Email</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{stu.email} </span> </td>
                          </tr>
                          <tr className='w-14'>
                            <td>
                              <label className="c-form-label"> Mobile </label> <span className="c-text-dark  c-input h-10  col-span-1 truncate"> {stu.mobile} </span>
                            </td>
                          </tr>

                          <tr className='w-14'>
                            <td><label className="c-form-label">Student ID</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{stu.stu_id} </span>  </td>
                            <td><label className="c-form-label">Gender</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{stu.gender} </span>  </td>
                          </tr>
                          <tr className='w-14'>
                            <td><label className="c-form-label">SR. NO.</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{stu.sr_no} </span>  </td>
                            <td><label className="c-form-label">Class</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{clasList.length > 0 ? clasList.find((x: any) => x._id == stu.class)?.name : <></>} </span>  </td>
                          </tr>
                          <tr className='w-14'>
                            <td><label className="c-form-label">Roll No</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{stu.roll_no} </span>  </td>
                            <td><label className="c-form-label">Section</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{clasList.length > 0 ? clasList.find((x: any) => x._id == stu.class)?.section.find((x: any) => x._id == stu.section)?.name : <></>} </span>  </td>
                          </tr>
                          <tr className='w-14'>
                            <td><label className="c-form-label">Admission Date</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{stu.admission_date} </span>  </td>
                            <td><label className="c-form-label">Date of Birth</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{stu.dob} </span>  </td>
                          </tr>
                          <tr className='w-14'>
                            <td><label className="c-form-label">Admission No</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{stu.admission_no} </span>  </td>
                            <td><label className="c-form-label">Addhar No</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{stu.addhar_no} </span>  </td>
                          </tr>
                          <tr className='w-14'>
                            <td><label className="c-form-label">Mother Tongue</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{stu.mother_tongue} </span>  </td>
                            <td><label className="c-form-label">Distance From School</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{stu.distance_from_school} Km </span>  </td>
                          </tr>
                          <tr className='w-14'>
                            <td colSpan={2}>
                              <label className="c-form-label">Language Known</label>
                              <span className="c-text-dark c-input h-10  col-span-1 truncate ">
                                {stu.known_language.map((x, i) => <span key={i} >{x}, </span>)}
                              </span>
                            </td>
                          </tr>
                          <tr className='w-14'>
                            <td  ><label className="c-form-label">Fee Discount</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{stu.fee_discount} %</span>
                            </td>

                            <td  ><label className="c-form-label">PEN No</label> <span className=" c-text-dark  c-input h-10  col-span-1 truncate ">{stu.pen_no}</span>
                            </td>
                          </tr>
                        </thead>
                      </table>
                    </span>
                  </td>
                </tr>
                }

              </tbody>

            )}
          </> : <tbody><tr><td colSpan={11} className='text-center c-text-dark'>No Student found.</td></tr></tbody>}
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
          </tfoot> : <></>}
        </table>
      </span>
    </>
  )
}

export default AllStudents;