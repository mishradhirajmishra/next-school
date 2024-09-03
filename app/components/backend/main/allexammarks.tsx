"use client"
import React, { FC, useEffect, useState } from 'react'
import TablePagination from '../../shared/table/pegination';
import FilterField from '../../shared/forms-elements/filterfield';
import { GetAllExamApi, GetSpecificStudentsListApi } from '../../shared/utils/apis';
import { Expendrow, generateTimeTablePDF, generateMarksLedgerSingleSubjectPdf, generateMarksLedgerAllSubjectPdf, generateAdmtCardPdf, generateDeskSlipPdf } from '../../shared/utils/helperfunction';
import ExpendIcon from '../../shared/Icons/expend';
import { ExamShareType, ExamType, Examinit, IncludeType, TimeTableType } from '../../shared/model/examhelper';
import DownloadIcon from '../../shared/Icons/download';
import ExamMarksBysection from '../sub/exammarksbysection';
import Dropdown from '../../shared/forms-elements/dropdown';


const AllExamMarks: FC = () => {
  const [rows, setrows] = useState<Array<ExamType>>([Examinit])
  const [rowsBacup, setrowsBacup] = useState<Array<ExamType>>([Examinit])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (newPage: number) => { setPage(newPage); };

  useEffect(() => { getExam() }, [])
  const getExam = async () => {
    let data = await GetAllExamApi()
    setrows(data); setrowsBacup(data)
  }
  const marksLedgerSingleSubjectPdf = async (exa: ExamType, inc: IncludeType, tt: TimeTableType,) => {
    let param = { class: inc.class, section: inc.section }
    let studentList = await GetSpecificStudentsListApi(param);
     console.log("studentList",studentList)
     generateMarksLedgerSingleSubjectPdf(exa, inc, tt, studentList)

  }
  const marksLedgerAllSubjectPdf = async (exa: ExamType, inc: IncludeType) => {
    let param = { class: inc.class, section: inc.section }
    let studentList = await GetSpecificStudentsListApi(param);
    console.log(inc.timeTable)
    generateMarksLedgerAllSubjectPdf(exa, inc, studentList)

  }
  const admitCardPdf = async (exa: ExamType, inc: IncludeType) => {
    let param = { class: inc.class, section: inc.section }
    let studentList = await GetSpecificStudentsListApi(param); 
    generateAdmtCardPdf(exa, inc, [...studentList, ...studentList, ...studentList, ...studentList, ...studentList])

  }
  const deskSlipPdf = async (exa: ExamType, inc: IncludeType) => {
    let param = { class: inc.class, section: inc.section }
    let studentList = await GetSpecificStudentsListApi(param); 
    generateDeskSlipPdf(exa, inc, [...studentList, ...studentList, ...studentList, ...studentList, ...studentList])
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

            </tr>
          </thead>
          {rowsBacup && rowsBacup.length && rowsBacup[0]._id ? <>
            {rows && (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((exa: ExamType, i) =>
              <tbody key={exa._id}>
                <tr >
                  <td className='cursor-pointer min-w-14 max-w-14 w-14' onClick={() => { setrows(Expendrow(exa._id, rows)) }}><ExpendIcon className={`${exa.expend ? "rotate-90 " : ""}fill-svg-light duration-300 m-auto`} /></td>
                  <td className='min-w-14 max-w-14 w-14 '>{i + 1}</td>
                  <td className='min-w-48 max-w-48 w-48'>{exa.title}</td>
                  <td className='min-w-40 max-w-40 w-40'>{exa.status}</td>
                  <td >{exa.include_in_marksheet}</td>
                </tr>
                {exa.expend && exa.include.length && <tr className='fade-in nested'>
                  <td className='py-1 px-0' colSpan={5} >
                    <span className='flex justify-center items-center'>
                      <table>
                        {exa.expend && exa.include && exa.include.map((inc: IncludeType, j: number) =>
                          <tbody key={j} className='table-fixed'>
                            <tr>
                              <td className='cursor-pointer max-w-14 min-w-14 w-14'
                                onClick={() => {
                                  if (rows[i].include != undefined && inc._id != undefined) {
                                    rows[i].include = Expendrow(inc._id, rows[i].include);
                                    setrows(JSON.parse(JSON.stringify(rows)))
                                  }
                                }}>
                                <ExpendIcon className={`${inc.expend ? "rotate-90 " : ""} fill-svg-success duration-300 m-auto`} /></td>
                              <td className='min-w-14 max-w-14 w-14 '>{i + j + 1}</td>
                              <td className='min-w-28 max-w-28 w-28'>{inc.class_name} </td>
                              <td className='min-w-28 max-w-28 w-28' >{inc.section_name}</td>
                              <td className=' opacity-90 c-text-error min-w-0 max-w-0 w-0 pl-0 pr-1' >  | </td>
                              {inc.timeTable.length && inc.timeTable.map((tt: TimeTableType, k) =>
                                <td className='min-w-32 max-w-32 w-32' key={k}>
                                  <span className=' text-wrap justify-between flex'> {tt.subject}                   
                                  <Dropdown classNameBtn="no-class"
                                    dropdownlist={[{ text: 'Marks Ledger', postIcon: <DownloadIcon className='fill-current' /> }]}
                                    onOptionClick={(option: any) => {
                                      if (option == 'Marks Ledger') { marksLedgerSingleSubjectPdf(exa, inc, tt) }

                                    }}
                                  />
                                  </span>


                                </td>
                              )}
                              <td className=' opacity-90 c-text-error min-w-0 max-w-0 w-0 pl-0 pr-1' >  | </td>
                              <td className='min-w-14 max-w-14 w-14' >
                                <Dropdown
                                  dropdownlist={[{ text: "All Marks Ledger", postIcon: <DownloadIcon className='fill-current' /> }, { text: "Admit Card", postIcon: <DownloadIcon className='fill-current' /> }, { text: "Desk Slip", postIcon: <DownloadIcon className='fill-current' /> }]}
                                  onOptionClick={(option: any) => {
                                    if (option == "All Marks Ledger") { marksLedgerAllSubjectPdf(exa, inc) }
                                    else if (option == "Admit Card") { admitCardPdf(exa, inc) }
                                    else if (option == "Desk Slip") { deskSlipPdf(exa, inc) }
                                  }}
                                />


                              </td>

                            </tr>
                            {inc.expend &&
                              <tr>
                                <td className='py-0 px-0' colSpan={6 + inc.timeTable.length}>
                                  <ExamMarksBysection exam_id={exa._id} class_id={inc.class} section_id={inc.section} timeTable={inc.timeTable} start={Math.random()} />
                                </td>
                              </tr>}
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
          {rowsBacup && rowsBacup.length > rowsPerPage && rowsBacup[0]._id ? <tfoot>
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



export default AllExamMarks;