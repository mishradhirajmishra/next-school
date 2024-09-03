"use client"
import React, { FC, useEffect, useState } from 'react'
import FilterField from '../../shared/forms-elements/filterfield';
import DeleteIcon from '../../shared/Icons/delete';
import EditIcon from '../../shared/Icons/edit';
import { Delwarn, Delobj } from '../../shared/utils/delwarn';
import Swall from '../../shared/utils/swal';
import TablePagination from '../../shared/table/pegination';
import TableHeader from '../../shared/table/tableheader';
import {  DelRoomApi, GetAllRoomApi, } from '../../shared/utils/apis';
import { AllRoomProps, RoomType, Roominit, roomheadData } from '../../shared/model/roomhelper';

const AllRoom: FC<AllRoomProps> = ({ newData, reciveDataTobeEdited }) => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [deleteData, seDeleteData] = useState({ showDelwarn: 0, _id: "" })
  const [rows, setrows] = useState<Array<RoomType>>([Roominit])
  const [rowsBacup, setrowsBacup] = useState<Array<RoomType>>([Roominit])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (newPage: number) => { setPage(newPage); };

  useEffect(() => { getRoom() }, [newData])
  const getRoom = async () => {
    let data = await GetAllRoomApi()
    setrows( data); setrowsBacup( data)
  }

  const delRoom = async (val: Delobj) => {
    if (val.delete) {
      let data = await  DelRoomApi(val._id)
      getRoom()
      seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    }
  }

  return (
    <>
      <Swall swallData={alertData} />
      <Delwarn deleteData={deleteData} handeleDealate={(val) => { delRoom(val) }} />
      <div className='absolute top-1'>
        <FilterField rows={rows} rowsBacup={rowsBacup} handleChange={(val: any) => { setrows(val) }} />
      </div>
      <div className="mt-5 relative   overflow-x-auto pb-5">
        <table >
          <thead>
            <TableHeader theadData={roomheadData} rows={rows} updateRows={(val) => { setrows(val) }} />
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
                  <td>{sub.type}</td>
                  <td>{sub.seat_capcity}</td>
                  <td className=' whitespace-nowrap'>
                    <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => { reciveDataTobeEdited(sub) }}><EditIcon /></button>
                    <button type='button' className='btn-outline-light p-1' onClick={() => { seDeleteData({ showDelwarn: Math.random(), _id: sub._id }) }}><DeleteIcon /></button>
                  </td>
                </tr>
              </tbody>
            )}
          </> : <tbody><tr><td colSpan={5} className='text-center c-text-dark'>No Room found.</td></tr></tbody>}
   
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

export default AllRoom;