"use client"
import React, { FC, useEffect, useState } from 'react'
import FilterField from '../../shared/forms-elements/filterfield';
import DeleteIcon from '../../shared/Icons/delete';
import EditIcon from '../../shared/Icons/edit';
import { Delwarn, Delobj } from '../../shared/utils/delwarn';
import Swall from '../../shared/utils/swal';
import TablePagination from '../../shared/table/pegination';
import TableHeader from '../../shared/table/tableheader';
import {  DelSubjectApi, GetAllSubjectApi, } from '../../shared/utils/apis';
import { AllSubjectProps, SubjectType, Subjectinit, subjectheadData } from '../../shared/model/subjecthelper';

const AllSubject: FC<AllSubjectProps> = ({ newData, reciveDataTobeEdited }) => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [deleteData, seDeleteData] = useState({ showDelwarn: 0, _id: "" })
  const [rows, setrows] = useState<Array<SubjectType>>([Subjectinit])
  const [rowsBacup, setrowsBacup] = useState<Array<SubjectType>>([Subjectinit])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (newPage: number) => { setPage(newPage); };

  useEffect(() => { getSubject() }, [newData])
  const getSubject = async () => {
    let data = await GetAllSubjectApi()
    const newData = data.data
    setrows(newData); setrowsBacup(newData)
  }

  const delSubject = async (val: Delobj) => {
    if (val.delete) {
      let data = await  DelSubjectApi(val._id)
      getSubject()
      seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    }
  }

  return (
    <>
      <Swall swallData={alertData} />
      <Delwarn deleteData={deleteData} handeleDealate={(val) => { delSubject(val) }} />
      <div className='absolute top-1'>
        <FilterField rows={rows} rowsBacup={rowsBacup} handleChange={(val: any) => { setrows(val) }} />
      </div>
      <div className="mt-5 relative   overflow-x-auto pb-5">
        <table >
          <thead>
            <TableHeader theadData={subjectheadData} rows={rows} updateRows={(val) => { setrows(val) }} />
          </thead>
          {rowsBacup && rowsBacup.length && rowsBacup[0]._id  ? <>
            {rows && (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((sub, i) =>
              <tbody key={sub._id}>
                <tr >
                  <td>{sub?.sn}</td>
                  <td>{sub.name}</td>
                  <td>{sub.optional}</td>
                  <td className=' whitespace-nowrap'>
                    <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => { reciveDataTobeEdited(sub) }}><EditIcon /></button>
                    <button type='button' className='btn-outline-light p-1' onClick={() => { seDeleteData({ showDelwarn: Math.random(), _id: sub._id }) }}><DeleteIcon /></button>
                  </td>
                </tr>
              </tbody>
            )}
          </> : <tbody><tr><td colSpan={4} className='text-center c-text-dark'>No Subject found.</td></tr></tbody>}
   
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
              </div>: <></>}
      </div>
    </>
  )
}

export default AllSubject;