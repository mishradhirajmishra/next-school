"use client"
import React, { FC, useEffect, useState } from 'react'
import { SelectOptionType, SelectOptioninit } from '@/app/components/shared/model/timeoptionhelper';
import FilterField from '../../shared/forms-elements/filterfield';
import TablePagination from '../../shared/table/pegination';
import TableHeader from '../../shared/table/tableheader';
import { timeOptionheadData } from '../../shared/model/timeoptionhelper';
import Swall from '../../shared/utils/swal';
import { GetTimeoptionApi, UpdateTimeOptionApi } from '../../shared/utils/apis';
const initialValue = SelectOptioninit

const AllTimeOption: FC = () => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [rows, setrows] = useState<Array<SelectOptionType>>([initialValue])
  const [rowsBacup, setrowsBacup] = useState<Array<SelectOptionType>>([initialValue])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (newPage: number) => { setPage(newPage); };

  useEffect(() => { if (rowsBacup.length = 1) { getTimeoption() } }, [])
  const getTimeoption = async () => {
    let data = await GetTimeoptionApi()
    const newData = data.data.filter((x: any) => x.name != "Select")
    setrows(newData); setrowsBacup(newData)
  }

  const updateTimeoption = async (val: SelectOptionType) => {
    val.hide = !val.hide
    let data = await UpdateTimeOptionApi(val)
    getTimeoption()
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
  }

  return (
    <>
      <Swall swallData={alertData} />
      <div className='absolute top-1'>
        <FilterField rows={rows} rowsBacup={rowsBacup} handleChange={(val: any) => { setrows(val) }} />
      </div>
      <div className="mt-5 relative   overflow-x-auto pb-5">
        <table >
          <thead>
            <TableHeader theadData={timeOptionheadData} rows={rows} updateRows={(val) => { setrows(val) }} />
          </thead>
          {rowsBacup && rowsBacup.length && rowsBacup[0]._id  ? <>
            {rows && (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((pr, i) =>
              <tbody key={pr._id}>
                <tr >
                  <td className='max-w-[50px]'>{pr.sn}</td>
                  <td>{pr.name}</td>
                  <td className='max-w-[100px] whitespace-nowrap justify-self-center'>
                    <button onClick={() => { updateTimeoption(pr) }} type='button' className='btn-outline-light px-1 py-0 mr-3 ' >
                      {pr.hide ? <span className='opacity-30 flex gap-2'> Enable</span> : <span className='flex gap-2  c-text-success'> Disable</span>}
                    </button>

                  </td>
                </tr>
              </tbody>
            )}
          </> : <tbody><tr><td colSpan={3} className='text-center c-text-dark'>No Timeoption found.</td></tr></tbody>}

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

export default AllTimeOption;