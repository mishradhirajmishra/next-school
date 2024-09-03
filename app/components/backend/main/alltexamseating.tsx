"use client"
import React, { FC, useEffect, useState } from 'react'
import TablePagination from '../../shared/table/pegination';
import FilterField from '../../shared/forms-elements/filterfield';
import { CreateUpdateExamApi, GetAllClassApi, GetAllExamApi, GetAllRoomApi } from '../../shared/utils/apis';
import { Expendrow, calculateUsedRoomCapcity, seatingPlanPdf} from '../../shared/utils/helperfunction';
import ExpendIcon from '../../shared/Icons/expend';
import { ExamSeating, ExamType, Examinit, examSeatingInit } from '../../shared/model/examhelper';

import EditIcon from '../../shared/Icons/edit';

import { RoomType, Roominit } from '../../shared/model/roomhelper';
import Swall from '../../shared/utils/swal';
import PdfIcon from '../../shared/Icons/pdf';


interface AllExamSeatingProps {
  newData: any,
  reciveDataTobeEdited: (option1: ExamType,option2: ExamSeating) => void
}

const AllExamSeating: FC<AllExamSeatingProps> = ({ newData, reciveDataTobeEdited }) => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [rows, setrows] = useState<Array<ExamType>>([Examinit])
  const [rowsBacup, setrowsBacup] = useState<Array<ExamType>>([Examinit])
  const [rooms, setRooms] = useState<Array<RoomType>>([Roominit])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (newPage: number) => { setPage(newPage); };

  useEffect(() => { getExam() }, [])
  useEffect(() => { getExam() }, [newData])
  const getExam = async () => {
    let data = await GetAllExamApi() 
    getRoom(data)
    setrows(data); setrowsBacup(data)
  }
 
  const getRoom = async (exam:ExamType[]) => {
    let data = await GetAllRoomApi() 
    setRooms(data)
    let newexa= exam.map((exa:ExamType)=>{   return {...exa,exam_seating:exa.exam_seating?.map((seat:any)=>({...seat,room_id:data.find((rm:any)=>(rm._id==seat.room_id))}))}})  
    setrows(newexa); setrowsBacup(newexa)

 
  }
  
  const startExamSeating = async (exa:any) => {  
      let baseSeating=examSeatingInit;
      exa.exam_seating=rooms.map((x:any)=>{
        return  {...examSeatingInit,room_id:x._id }  
      })
      let data = await CreateUpdateExamApi(exa)
      seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
      getExam()
  }
  const seatingPlan=async (exa:ExamType)=>{
    const data = await GetAllClassApi();
    seatingPlanPdf(exa,data.data)
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
            <tr>
              <td className='p-2'>EXP</td>
              <td className='p-2'>SN</td>
              <td className='p-2'>Title</td>
              <td className='p-2'>Status</td>
              <td className='p-2'>Action</td>
  
            </tr>
          </thead>
          {rowsBacup && rowsBacup.length && rowsBacup[0]._id  ? <>
            {rows && (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((exa: ExamType, i) =>
              <tbody key={exa._id}>
                <tr >
                  <td className='cursor-pointer w-14' onClick={() => { setrows(Expendrow(exa._id, rows)) }}><ExpendIcon className={`${exa.expend ? "rotate-90 " : ""}fill-svg-light duration-300 m-auto`} /></td>
                  <td>{i + 1}</td>
                  <td>{exa.title}</td>
                  <td>{exa.status}</td> 
                  <td>
                  <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => { seatingPlan(exa) }}><PdfIcon className='fill-svg-dark' /></button> 

                  </td>
                </tr>
                {exa.expend && exa.include.length && <tr className='fade-in nested'>
                  <td className='py-3' colSpan={7} >
                    <span className='flex justify-center items-center'>
                    <table > 
                    <thead>
            <tr>
              {/* <td className='p-2'>EXP</td> */}
              <td className='p-2'>SN</td>
              <td className='p-2'>Title</td>
              <td className='p-2'>Type</td>
              <td className='p-2'>Capcity</td>
              <td className='p-2'>Used Capcity</td>
              <td className='p-2'>Action</td>
  
            </tr>
          </thead>
                    {exa.exam_seating?.length ?  <tbody>
                      {exa.exam_seating.map((sub:any,i:number) =>
                  <tr key={i}>
                  <td>{i+1}</td>
                  <td>{sub.room_id.name}</td>
                  <td>{sub.room_id.type}</td>
                  <td>{sub.room_id.seat_capcity}</td>
                  <td>{calculateUsedRoomCapcity(sub.seating)}</td>
                  <td> 
                  <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => { reciveDataTobeEdited(exa,sub) }}><EditIcon /></button> 


                  </td>
                      </tr>
                      )}    
                      </tbody>:<tbody><tr><td><button type="button" className="btn-outline-success w-full mt-5" onClick={()=>{startExamSeating(exa)}} >
                Start Exam Seating 
              </button></td></tr></tbody> }  
                      </table>         
                    </span>
                  </td>
                </tr>
                }



              </tbody>
            )}
          </> : <tbody><tr><td colSpan={11} className='text-center c-text-dark'>No Exam found.</td></tr></tbody>}
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
      </div>
    </>
  )
}



export default AllExamSeating;