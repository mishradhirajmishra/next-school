"use client"
import React, { FC, useEffect, useState } from 'react'
import TablePagination from '../../shared/table/pegination';
import FilterField from '../../shared/forms-elements/filterfield';
import { GetAllExamApi } from '../../shared/utils/apis';
import { Expendrow, generateTimeTablePDF } from '../../shared/utils/helperfunction';
import ExpendIcon from '../../shared/Icons/expend';
import { ExamShareType, ExamType, Examinit, IncludeType, TimeTableType } from '../../shared/model/examhelper';
import { format } from 'date-fns';
import timelist from '../../shared/utils/timelist';
import EditIcon from '../../shared/Icons/edit';
import DoneIcon from '../../shared/Icons/done';
import DoneAllIcon from '../../shared/Icons/doneall';
import PdfIcon from '../../shared/Icons/pdf';
import Dropdown from '../../shared/forms-elements/dropdown';
import DownloadIcon from '../../shared/Icons/download';


interface AllExamProps {
  newData: ExamType,
  reciveDataTobeEdited: (option: ExamShareType) => void
}

const AllExam: FC<AllExamProps> = ({ newData, reciveDataTobeEdited }) => {
  const [rows, setrows] = useState<Array<ExamType>>([Examinit])
  const [rowsBacup, setrowsBacup] = useState<Array<ExamType>>([Examinit])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (newPage: number) => { setPage(newPage); };

  useEffect(() => { getExam() }, [])
  useEffect(() => { getExam() }, [newData])
  const getExam = async () => {
    let data = await GetAllExamApi() 
    setrows(data); setrowsBacup(data)
  }

  return (
    <>
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
              <td className='p-2'>Incude in Marksheet</td>
              <td className='p-2 w-[90px]'>Action</td>
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
                  <td >{exa.include_in_marksheet}</td>
                  <td>

                    <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => { reciveDataTobeEdited({ type: "exam", exam: exa }) }}><EditIcon /></button></td>
                </tr>
                {exa.expend && exa.include.length && <tr className='fade-in nested'>
                  <td className='py-3' colSpan={7} >
                    <span className='flex justify-center items-center'>
                      <table>
                        <thead>
                          <tr>
                            <td className=' opacity-60' >SN </td>
                            <td className=' opacity-60' > Class  </td>
                            <td className=' opacity-60' > Section</td>
                            <td className='p-0 opacity-90 c-text-error' >  | </td>
                            <td className=' opacity-60' colSpan={exa.include[i].timeTable.length}> Subject     </td>
                            <td className='p-0 opacity-90 c-text-error' >  | </td>
                            <td className=' opacity-60' > Action</td>
                          </tr>
                        </thead>
                        {exa.expend && exa.include && exa.include.map((inc: IncludeType, j: number) =>
                          <tbody key={j}>
                            <tr>
                              <td>{i + j + 1}</td>
                              <td>{inc.class_name} </td>
                              <td>{inc.section_name}</td>                             
                              <td className='p-0 opacity-90 c-text-success' >  | </td>
                              {inc.same_syllabus_as_section_id =="" && inc.timeTable && inc.timeTable.length && inc.timeTable.map((tt: TimeTableType, k) =>
                                <td  key={k}>                                 
                                   <div> {tt.subject}</div>
                                  <div> {format(tt.date, "dd-MM-yyyy")}</div>
                                  <div className='font-thin'> {timelist.find((x: any) => x.value == tt.start_time)?.name} - {timelist.find((x: any) => x.value == tt.end_time)?.name}</div>
                                  {tt.syllabus!="" ? <span className='flex justify-between'>Syllabus <DoneAllIcon className='fill-svg-success'/></span>:
                                  <span className='flex justify-between opacity-35'>Syllabus <DoneAllIcon className='fill-svg-dark'/></span>}

                                 {tt.max_mark!="" ? <span className='flex justify-between'>Max mark  <span>{tt.max_mark}</span></span>:
                                  <span className='flex justify-between opacity-35'>Max Mark <DoneAllIcon className='fill-svg-dark'/></span>}

                                 {tt.min_mark!="" ? <span className='flex justify-between'>Min mark  <span>{tt.min_mark}</span></span>:
                                  <span className='flex justify-between opacity-35'>Min Mark <DoneAllIcon className='fill-svg-dark'/></span>}
                          
                                  {tt.question_paper!=undefined && tt.question_paper.length!=0  ? <button className='flex justify-between' onClick={() => {
                                    reciveDataTobeEdited({ type: "question-paper", exam: exa, include: exa.include[j],timeTable:tt})                              
                                }}>Question Paper <DoneAllIcon className='fill-svg-success'/></button>:
                                  <button className='flex justify-between opacity-35' onClick={() => {
                                    reciveDataTobeEdited({ type: "question-paper", exam: exa, include: exa.include[j],timeTable:tt})                              
                                }}>Question Paper <DoneAllIcon className='fill-svg-dark'/></button>}
                                </td>
                              )}
                              {inc.same_syllabus_as_section_id !="" && <td className='text-center opacity-65' colSpan={inc.timeTable.length}>Same as {inc.same_syllabus_as_section_name}</td> }
                              <td className='p-0 opacity-90 c-text-success' >  | </td>
                              <td >
                              {inc.same_syllabus_as_section_id =="" &&
                              <>
                                <button type='button' className='btn-outline-light p-1 mr-3 mb-3' onClick={() => {
                                    reciveDataTobeEdited({ type: "time-table", exam: exa, include: exa.include[j] })
                                }}><EditIcon /> 
                                        </button>
                                        <Dropdown  
                                    dropdownlist={[{ text: 'Time Table', postIcon: <DownloadIcon className='fill-current' /> }]}
                                    onOptionClick={(option: any) => {
                                      if (option == 'Time Table') {generateTimeTablePDF(inc,exa) }

                                    }}
                                  />                               
                                </>
                              }
                             
                              </td>
                                
                            </tr>
                          </tbody>

                        )}


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



export default AllExam;