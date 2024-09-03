"use client"
import React, { FC, useEffect, useState } from 'react'
import { PeriodType, periodheadData, Periodinitial, AllPeriodProps } from '@/app/components/shared/model/classhelper';
import FilterField from '../../shared/forms-elements/filterfield';
import DeleteIcon from '../../shared/Icons/delete';
import EditIcon from '../../shared/Icons/edit';
import { Delwarn, Delobj } from '../../shared/utils/delwarn';
import Swall from '../../shared/utils/swal';
import TablePagination from '../../shared/table/pegination';
import TableHeader from '../../shared/table/tableheader';
import { DelPeriodMasterApi, GetAllPeriodMasterApi } from '../../shared/utils/apis';
import timelist from '../../shared/utils/timelist';

const AllPeriod: FC<AllPeriodProps> = ({ newData, reciveDataTobeEdited }) => {
  const allTimeoption = timelist
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [deleteData, seDeleteData] = useState({ showDelwarn: 0, _id: "" })
  const [rows, setrows] = useState<Array<PeriodType>>([Periodinitial])
  const [rowsBacup, setrowsBacup] = useState<Array<PeriodType>>([Periodinitial])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (newPage: number) => { setPage(newPage); };

  useEffect(() => { getPeriod() }, [newData])
  const getPeriod = async () => {
    let data = await GetAllPeriodMasterApi()
    setrows(data.data); setrowsBacup(data.data)
  }

  const delClass = async (val: Delobj) => {
    if (val.delete) {
      let data = await DelPeriodMasterApi(val._id)
      getPeriod()
      seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
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
        <table >
          <thead>
            <TableHeader theadData={periodheadData} rows={rows} updateRows={(val) => { setrows(val) }} />
          </thead>
          {rowsBacup && rowsBacup.length && rowsBacup[0]._id  ? <>
            {rows && (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((pr, i) =>
              <tbody key={pr._id}>
                <tr >
                  <td>{pr?.sn}</td>
                  <td>{pr.name}</td>
                  <td>{allTimeoption.find((x: any) => x.value == pr.start_time)?.name}</td>
                  <td>{allTimeoption.find((x: any) => x.value == pr.end_time)?.name}</td>
                  <td className=' whitespace-nowrap'>
                    <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => { reciveDataTobeEdited(pr) }}><EditIcon /></button>
                    <button type='button' className='btn-outline-light p-1' onClick={() => { seDeleteData({ showDelwarn: Math.random(), _id: pr._id }) }}><DeleteIcon /></button>
                  </td>
                </tr>
              </tbody>
            )}
          </> : <tbody><tr><td colSpan={11} className='text-center c-text-dark'>No Period found.</td></tr></tbody>}

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
          </div>
          : <></>}
      </div>
    </>
  )
}

export default AllPeriod;