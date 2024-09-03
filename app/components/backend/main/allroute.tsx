"use client"

import React, { FC, useEffect, useState } from 'react'
import TablePagination from '../../shared/table/pegination';
import TableHeader from '../../shared/table/tableheader';
import FilterField from '../../shared/forms-elements/filterfield';
import DeleteIcon from '../../shared/Icons/delete';
import EditIcon from '../../shared/Icons/edit';
import { Delwarn, Delobj } from '../../shared/utils/delwarn';
import Swall from '../../shared/utils/swal';
import {  DelRouteApi, GetAllRouteApi} from '../../shared/utils/apis';
import { Expendrow} from '../../shared/utils/helperfunction';
import ExpendIcon from '../../shared/Icons/expend';
import { Route, RouteHeadData, RouteInit } from '../../shared/model/transporthelper';
import RouteDetailTable from '../sub/transport/vehicledetail';

interface AllRouteProps {
  newData: Route,
  reciveDataTobeEdited: (option: Route) => void
}

const AllRoute: FC<AllRouteProps> = ({ newData, reciveDataTobeEdited }) => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [deleteData, seDeleteData] = useState({ showDelwarn: 0, _id: "" })
  const [rows, setrows] = useState<Array<Route>>([RouteInit])
  const [rowsBacup, setrowsBacup] = useState<Array<Route>>([RouteInit])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (newPage: number) => { setPage(newPage); };

  useEffect(() => { GetAllRoute() }, [newData])
  const GetAllRoute = async () => {
    let data = await GetAllRouteApi()
    setrows(data.data); setrowsBacup(data.data)
  }


  const  DelRoute = async (val: Delobj) => {
    if (val.delete) {
      let data = await DelRouteApi(val._id)
      seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
      let newData = rowsBacup.filter(x => x._id != val._id)
      setrows(newData); setrowsBacup(newData)
    }
  }
 

  return (
    <>
      <Swall swallData={alertData} />
      <Delwarn deleteData={deleteData} handeleDealate={(val) => {  DelRoute(val) }} />
      <div className='absolute top-1'>
        <FilterField rows={rows} rowsBacup={rowsBacup} handleChange={(val: any) => { setrows(val) }} />
      </div>
      <div className="mt-5 relative   overflow-x-auto pb-5">
        <table >
          <thead>
            <TableHeader theadData={RouteHeadData} rows={rows} updateRows={(val) => { setrows(val) }} />
          </thead>
          {rowsBacup && rowsBacup.length && rowsBacup[0]._id ? <>
            {rows && (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((rut, i) =>
              <tbody key={rut._id}>
                <tr >
                  <td className='cursor-pointer w-14' onClick={() => { setrows(Expendrow(rut._id, rows)) }}><ExpendIcon className={`${rut.expend ? "rotate-90 " : ""}fill-svg-light duration-300 m-auto`} /></td>
                  <td>{i+1}</td>
                  <td>{rut.name}</td>
                  <td>{rut.description}</td>
           
                  <td>
                    <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => { reciveDataTobeEdited(rut) }}><EditIcon /></button>
                 
                  </td>
                </tr>
                {rut.expend &&   rut.stopage.length && 
               <tr className='fade-in nested'>
               <td className='py-1 px-0' colSpan={5} >
                 <span className='flex justify-center items-center'>
                   <table>
                    <thead>
                       <tr className='opacity-35'>
                        <th>Name</th>
                        <th>Comment</th>
                        <th>Longitude</th>
                        <th>Latitude</th>
                        <th>Distance (in Km)</th>
                        <th>Stop No</th>                       
                       </tr>
                    </thead>
                    <tbody>
                     {rut.stopage.map((stp,j)=>
                      <tr key={j}>
                       <td>{stp.name}</td>
                       <td>{stp.comment}</td>
                       <td>{stp.longitude}</td>
                       <td>{stp.latitude}</td>
                       <td>{stp.distance_in_km}</td>
                       <td>{stp.stop_no}</td>

                      </tr>
                    )}
                    </tbody>

                    </table>
                    </span>
                     </td>
 
     
 

                </tr>
                }
             
     
              </tbody>
            )}
          </> : <tbody><tr><td colSpan={11} className='text-center c-text-dark'>No Route Work found.</td></tr></tbody>}
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

export default AllRoute;