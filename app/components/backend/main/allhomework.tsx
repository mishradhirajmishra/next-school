"use client"

import React, { FC, useEffect, useState } from 'react'
import TablePagination from '../../shared/table/pegination';
import TableHeader from '../../shared/table/tableheader';
import FilterField from '../../shared/forms-elements/filterfield';
import DeleteIcon from '../../shared/Icons/delete';
import EditIcon from '../../shared/Icons/edit';
import { Delwarn, Delobj } from '../../shared/utils/delwarn';
import Swall from '../../shared/utils/swal';
import { CreateUpdateHomeWorkApi, DelHomeWorkApi, GetAllHomeWorkApi, GetTeacherPeriodAllotedApi } from '../../shared/utils/apis';
import { Expendrow, ImageSorce } from '../../shared/utils/helperfunction';
import ExpendIcon from '../../shared/Icons/expend';
import Image from 'next/image';
import { CHWorkType, CHWorkheadData, CHWorkinit } from '../../shared/model/classhomeworkhelper';
import { useSession } from 'next-auth/react';
import { PeriodPreviewType, PeriodPreviewinitial } from '../../shared/model/classhelper';
import IMGR from '../../shared/images/imgr';

const initialValue = CHWorkinit

interface AllHomeWorkProps {
  newData: CHWorkType,
  reciveDataTobeEdited: (option: CHWorkType) => void
}

const AllHomeWork: FC<AllHomeWorkProps> = ({ newData, reciveDataTobeEdited }) => {
  const { data: session, status } = useSession()
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [deleteData, seDeleteData] = useState({ showDelwarn: 0, _id: "" })
  const [rows, setrows] = useState<Array<CHWorkType>>([initialValue])
  const [periodAlloted, setPeriodAlloted] = useState<Array<PeriodPreviewType>>([PeriodPreviewinitial])
  const [rowsBacup, setrowsBacup] = useState<Array<CHWorkType>>([initialValue])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (newPage: number) => { setPage(newPage); };

  useEffect(() => { getHomeWork() }, [newData])
  const getHomeWork = async () => {
    let data = await GetAllHomeWorkApi()
    setrows(data.data); setrowsBacup(data.data)
  }

  useEffect(() => { GetTeacherPeriodAlloted() }, [session])
  const GetTeacherPeriodAlloted = async () => {
    let data = await GetTeacherPeriodAllotedApi()
    const newData = data.filter((x: any) => x.teacher == session?.user._id)
    setPeriodAlloted(newData);
  }

  const deleteClassWork = async (val: Delobj) => {
    if (val.delete) {
      let data = await DelHomeWorkApi(val._id)
      seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
      let newData = rowsBacup.filter(x => x._id != val._id)
      setrows(newData); setrowsBacup(newData)
    }
  }
  const updateStatus = async (val: any) => {
    let data = await CreateUpdateHomeWorkApi(val)
    let newData = rowsBacup.map(x => { if (x._id == val._id) { x.status = val.status } return x })
    setrows(newData); setrowsBacup(newData)
    seAlertData({ showSwall: Math.random(), className: data.class, message: "Status updated Successfully" })
  }

  return (
    <>
      <Swall swallData={alertData} />
      <Delwarn deleteData={deleteData} handeleDealate={(val) => { deleteClassWork(val) }} />
      <div className='absolute top-1'>
        <FilterField rows={rows} rowsBacup={rowsBacup} handleChange={(val: any) => { setrows(val) }} />
      </div>
      <div className="mt-5 relative   overflow-x-auto pb-5">
        <table >
          <thead>
            <TableHeader theadData={CHWorkheadData} rows={rows} updateRows={(val) => { setrows(val) }} />
          </thead>
          {rowsBacup && rowsBacup.length && rowsBacup[0]._id  ? <>
            {rows && (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((cw, i) =>
              <tbody key={cw._id}>
                <tr >
                  <td className='cursor-pointer w-14' onClick={() => { setrows(Expendrow(cw._id, rows)) }}><ExpendIcon className={`${cw.expend ? "rotate-90 " : ""}fill-svg-light duration-300 m-auto`} /></td>
                  <td>{i + 1}</td>
                  <td>{cw.title}</td>
                  <td>{cw.date}</td>
                  {/* <td>{format( new Date(cw.date), 'yyyy-MM-dd')}</td> */}
                  <td>{cw.status == "published" ?
                    <button type='button' className='btn-outline-light p-0 c-text-success mr-3 ' onClick={() => { updateStatus({ _id: cw._id, status: "draft" }) }}>{cw.status}</button>
                    : <button type='button' className='btn-outline-light c-text-error p-0' onClick={() => { updateStatus({ _id: cw._id, status: "published" }) }}>{cw.status}</button>

                  }</td>
                  <td>
                    <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => { reciveDataTobeEdited(cw) }}><EditIcon /></button>
                    <button type='button' className='btn-outline-light p-1' onClick={() => { seDeleteData({ showDelwarn: Math.random(), _id: cw._id }) }}><DeleteIcon /></button>
                  </td>
                </tr>
                {cw.expend && periodAlloted && periodAlloted.length &&
                  <tr className='fade-in nested w-full'>
                    <td className='py-3' colSpan={7} >
                      <span className='flex justify-center items-center'>
                        <table>
                          <thead>
                            <tr className='w-14'>
                              <td colSpan={2} >
                                <div className='flex justify-center items-center relative min-w-96 h-72'>
                                <IMGR src={cw.attachment} alt='profile image'/>
                                </div>
                              </td>
                              <td className='w-48'>
                                <label className="c-form-label">Class</label>
                                <div className=" c-text-dark  c-input h-10  col-span-1 truncate ">
                                  {periodAlloted.find((x: PeriodPreviewType) => x.class_id == cw.class_id)?.class}
                                </div>
                                <label className="c-form-label mt-3">Section</label>
                                <div className=" c-text-dark  c-input h-10  col-span-1 truncate ">{periodAlloted.find((x: PeriodPreviewType) => x.section_id == cw.section_id)?.section}  </div>
                                <label className="c-form-label mt-3">Period</label>
                                <div className=" c-text-dark  c-input h-10  col-span-1 truncate ">
                                  {periodAlloted.find((x: PeriodPreviewType) => x.period_id == cw.period_id)?.period}
                                </div>
                                <label className="c-form-label mt-3">Subject</label>
                                <div className=" c-text-dark  c-input h-10  col-span-1 truncate mb-2">{cw.subject} </div>
                              </td>
                            </tr>

                            <tr>
                              <td colSpan={3}>
                                <div className="text-wrap max-w-[500px]">{cw.description}</div>
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
          </> : <tbody><tr><td colSpan={11} className='text-center c-text-dark'>No Home Work found.</td></tr></tbody>}
        </table>
        {rowsBacup && rowsBacup.length>rowsPerPage && rowsBacup[0]._id  ?
          <div className='max-w-[600px]'>
            <TablePagination
              rowsPerPage={rowsPerPage}
              page={page}
              count={rows.length}
              onPageChange={handleChangePage}
              onShowBtnClick={(val) => { setRowsPerPage(val) }}
              setPage={(val) => { setPage(val) }}
            />
          </div> : <></>}
      </div>
    </>
  )
}

export default AllHomeWork;