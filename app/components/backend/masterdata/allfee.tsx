"use client"

import React, { FC, useEffect, useState } from 'react'
import FilterField from '../../shared/forms-elements/filterfield';
import DeleteIcon from '../../shared/Icons/delete';
import EditIcon from '../../shared/Icons/edit';
import { Delwarn, Delobj } from '../../shared/utils/delwarn';
import Swall from '../../shared/utils/swal';
import TablePagination from '../../shared/table/pegination';
import TableHeader from '../../shared/table/tableheader';
import timelist from '../../shared/utils/timelist';
import { CreateUpdateFeeApi, CupdateOrderedFeeApi, DelFeeApi, GetAllFeeApi } from '../../shared/utils/apis';
import { FeeType, feeheadData, Feeinit } from '../../shared/model/feehelper';
import ExpendIcon from '../../shared/Icons/expend';
import { Expendrow, handleDragStart, handleDrop } from '../../shared/utils/helperfunction';


interface AllFeeProps {
  newData: FeeType,
  reciveDataTobeEdited: (option: FeeType) => void
}

const AllFee: FC<AllFeeProps> = ({ newData, reciveDataTobeEdited }) => { 
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [deleteData, seDeleteData] = useState({ showDelwarn: 0, _id: "" })
  const [rows, setrows] = useState<Array<FeeType>>([Feeinit])
  const [rowsBacup, setrowsBacup] = useState<Array<FeeType>>([Feeinit])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (newPage: number) => { setPage(newPage); };

  useEffect(() => { getFee() }, [newData])
  const getFee = async () => {
    let data = await GetAllFeeApi()
    setrows(data); setrowsBacup(data)
  }

  const delClass = async (val: Delobj) => {
    if (val.delete) {
      let data = await DelFeeApi(val._id)
      getFee()
      seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    }
  }

  const updateStatus = async (val: any) => {
    let data = await CreateUpdateFeeApi(val)
    let newData = rowsBacup.map(x => { if (x._id == val._id) { x.status = val.status } return x })
    setrows(newData); setrowsBacup(newData)
    seAlertData({ showSwall: Math.random(), className: data.class, message: "Status updated Successfully" })
  }

  const [draggingItem, setDraggingItem] = useState(null)
  
  const updateOrderedFee= async (data:FeeType[])=>{
  const body = data.map((x:FeeType)=>({_id:x._id,order:x.order})) 
  const xxx= await CupdateOrderedFeeApi(body)
       console.log(xxx)
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
            <TableHeader theadData={feeheadData} rows={rows} updateRows={(val) => { setrows(val) }} />
          </thead>
          {rowsBacup && rowsBacup.length && rowsBacup[0]._id  ? <>
            {rows && (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((fe, i) =>
              <tbody key={fe._id}>
                <tr
                  className={`item cursor-move ${fe === draggingItem ? 'cursor-grab' : 'cursor-move'}`}
                  draggable="true"
                  onDragStart={(e) => setDraggingItem(handleDragStart(e, fe))}
                  onDragEnd={() => { setDraggingItem(null) }}
                  onDragOver={(e) => { e.preventDefault() }}
                  onDrop={(e) =>  {const newRows=handleDrop(e, fe,draggingItem,rows); setrows(newRows) ;updateOrderedFee(newRows)} }
                  >
                  <td className='cursor-pointer w-14' onClick={() => { setrows(Expendrow(fe._id, rows)) }}><ExpendIcon className={`${fe.expend ? "rotate-90 " : ""}fill-svg-light duration-300 m-auto`} /></td>
                  <td>{fe?.sn}</td>
                  <td>{fe.title}</td>
                  <td>{fe.amount}</td>
                  <td>{fe.collecting_month}</td>
                  <td>{fe.last_date_of_collection}</td>
                  <td>{fe.optional}</td>
                  <td>{fe.status == "Active" ?
                    <button type='button' className='btn-outline-light p-0 c-text-success mr-3 ' onClick={() => { updateStatus({ _id: fe._id, status: "Inactive" }) }}>{fe.status}</button>
                    : <button type='button' className='btn-outline-light c-text-error p-0' onClick={() => { updateStatus({ _id: fe._id, status: "Active" }) }}>{fe.status}</button>

                  }</td>

                  <td className=' whitespace-nowrap'>
                    <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => { reciveDataTobeEdited(fe) }}><EditIcon /></button>

                    <button type='button' className='btn-outline-light p-1' onClick={() => { seDeleteData({ showDelwarn: Math.random(), _id: fe._id }) }}><DeleteIcon /></button>

                  </td>
                </tr>
                {fe.expend && <tr className='fade-in nested'>
                  <td className='py-3' colSpan={8} >
                    <span className='flex justify-center rows-center'>
                      <table>
                        <thead>
                          <tr className='w-14'>
                            <td><label className="c-form-label">Discount Applicable</label> <div className=" c-text-dark  c-input h-10  col-span-1 truncate ">{fe.discount_applicable} </div>  </td>
                            <td><label className="c-form-label">Late Fee Applicable</label> <div className=" c-text-dark  c-input h-10  col-span-1 truncate ">{fe.late_fee_applicable} </div>  </td>
                            {fe.late_fee_applicable == "Yes" &&
                              <>
                                <td><label className="c-form-label">Late Fee Amount</label> <div className=" c-text-dark  c-input h-10  col-span-1 truncate ">{fe.late_fee_amount} </div>  </td>
                                <td><label className="c-form-label">Late Fee Reoccuring (in days)</label> <div className=" c-text-dark  c-input h-10  col-span-1 truncate ">{fe.late_fee_reoccur_days} </div>  </td>
                              </>}
                          </tr>

                        </thead>
                      </table>
                    </span>
                  </td>
                </tr>
                }
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
          </div> : <></>}
      </div>
    </>
  )
}

export default AllFee;