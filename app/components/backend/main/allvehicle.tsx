"use client"

import React, { FC, useEffect, useState } from 'react'
import TablePagination from '../../shared/table/pegination';
import TableHeader from '../../shared/table/tableheader';
import FilterField from '../../shared/forms-elements/filterfield';
import DeleteIcon from '../../shared/Icons/delete';
import EditIcon from '../../shared/Icons/edit';
import { Delwarn, Delobj } from '../../shared/utils/delwarn';
import Swall from '../../shared/utils/swal';
import {  DelVehicleApi, GetAllVehicleApi} from '../../shared/utils/apis';
import { Expendrow} from '../../shared/utils/helperfunction';
import ExpendIcon from '../../shared/Icons/expend';
import { Vehicle, VehicleHeadData, VehicleInit } from '../../shared/model/transporthelper';
import VehicleDetailTable from '../sub/transport/vehicledetail';

interface AllVehicleProps {
  newData: Vehicle,
  reciveDataTobeEdited: (type:string,option: Vehicle) => void
}

const AllVehicle: FC<AllVehicleProps> = ({ newData, reciveDataTobeEdited }) => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [deleteData, seDeleteData] = useState({ showDelwarn: 0, _id: "" })
  const [rows, setrows] = useState<Array<Vehicle>>([VehicleInit])
  const [rowsBacup, setrowsBacup] = useState<Array<Vehicle>>([VehicleInit])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (newPage: number) => { setPage(newPage); };

  useEffect(() => { GetAllVehicle() }, [newData])
  const GetAllVehicle = async () => {
    let data = await GetAllVehicleApi()
    setrows(data.data); setrowsBacup(data.data)
  }


  const  DelVehicle = async (val: Delobj) => {
    if (val.delete) {
      let data = await DelVehicleApi(val._id)
      seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
      let newData = rowsBacup.filter(x => x._id != val._id)
      setrows(newData); setrowsBacup(newData)
    }
  }
 

  return (
    <>
      <Swall swallData={alertData} />
      <Delwarn deleteData={deleteData} handeleDealate={(val) => {  DelVehicle(val) }} />
      <div className='absolute top-1'>
        <FilterField rows={rows} rowsBacup={rowsBacup} handleChange={(val: any) => { setrows(val) }} />
      </div>
      <div className="mt-5 relative   overflow-x-auto pb-5">
        <table >
          <thead>
            <TableHeader theadData={VehicleHeadData} rows={rows} updateRows={(val) => { setrows(val) }} />
          </thead>
          {rowsBacup && rowsBacup.length && rowsBacup[0]._id ? <>
            {rows && (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((vc, i) =>
              <tbody key={vc._id}>
                <tr >
                  <td className='cursor-pointer w-14' onClick={() => { setrows(Expendrow(vc._id, rows)) }}><ExpendIcon className={`${vc.expend ? "rotate-90 " : ""}fill-svg-light duration-300 m-auto`} /></td>
                  <td>{i + 1}</td>
                  <td>{vc.vehicle_no}</td>
                  <td>{vc.nick_name}</td>
                  <td>{vc.seating_capacity}</td>
                  <td>{vc.type}</td>
                  <td>{vc.status}</td>       
                  <td>
                    <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => { reciveDataTobeEdited("vehicle",vc) }}><EditIcon /></button>
                    <button type='button' className='btn-outline-light p-1' onClick={() => { seDeleteData({ showDelwarn: Math.random(), _id: vc._id }) }}><DeleteIcon /></button>
                  </td>
                </tr>
                {vc.expend &&   
                    <tr className='fade-in nested' > 
                    <td className='py-3' colSpan={8}> <VehicleDetailTable vehicle={vc} addMentinence={(obj)=>{reciveDataTobeEdited("mentinence",obj)}}/></td>
                  </tr>
                }
              </tbody>
            )}
          </> : <tbody><tr><td colSpan={11} className='text-center c-text-dark'>No Vehicle Work found.</td></tr></tbody>}
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

export default AllVehicle;