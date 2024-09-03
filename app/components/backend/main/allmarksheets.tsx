"use client"

import React, { FC, useEffect, useState } from 'react'
import FilterField from '../../shared/forms-elements/filterfield';
import Swall from '../../shared/utils/swal';
import TablePagination from '../../shared/table/pegination';
import TableHeader from '../../shared/table/tableheader';
import { GetAllExamApi, GetAllExamMarksheetApi, GetAllSectionSubjectApi, GetAllSettingApi, GetAllSubjectApi, GetExamMarkSheetForStudentsApi, UpdateSectionSubjectPostApi } from '../../shared/utils/apis';
import { SectionSubjectType, sectionSubjectinit} from '../../shared/model/feehelper';
import ExpendIcon from '../../shared/Icons/expend';
import { CalculatePercentage, Expendrow, getRunningYear, sudentWiseTotalMark } from '../../shared/utils/helperfunction';
import { PopupMsg } from '../../shared/utils/poupMsg';
import { SubjectType, Subjectinit} from '../../shared/model/subjecthelper';
import { ExamMarksType, ExamType, Examinit, IncludeType, examMarksInit, marksheetHeadData } from '../../shared/model/examhelper';
import StudentsBysection from '../sub/studentbysection';
import ViewCompactIcon from '../../shared/Icons/viewcompact';

const AllMarksheets: FC = () => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [examList, setExamList] = useState<Array<ExamType>>([Examinit])
  const [rows, setrows] = useState<Array<SectionSubjectType>>([sectionSubjectinit])
  const [rowsBacup, setrowsBacup] = useState<Array<SectionSubjectType>>([sectionSubjectinit])
  const [examMarks, setExamMarks] = useState<Array<ExamMarksType>>([examMarksInit])
  const [passRule, setPassRule] = useState<string>("")
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (newPage: number) => { setPage(newPage); };

  useEffect(() => { getExam()  }, [])
  const getExam = async () => {
    let examList = await GetAllExamMarksheetApi("Yes")
    setExamList(examList)
    let examMarks = await GetExamMarkSheetForStudentsApi({running_year:getRunningYear(),examList: examList.map((x: any) => x._id) });
    setExamMarks(examMarks)
    const result_rule= await GetAllSettingApi()
    setPassRule(result_rule?.pass_rule)
  }

  useEffect(() => { GetAllSectionSubject() }, [])
  const GetAllSectionSubject = async () => {
    const data = await GetAllSectionSubjectApi();
    setrows(data); setrowsBacup(data)
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
            <TableHeader theadData={marksheetHeadData} rows={rows} updateRows={(val) => { setrows(val) }} />
          </thead>
          {rowsBacup && rowsBacup.length && rowsBacup[0]._id ? <>
            {rows && (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row: SectionSubjectType, i) =>
              <tbody key={i}>
                <tr >
                  <td className='cursor-pointer min-w-14 max-w-14 w-14' onClick={() => { setrows(Expendrow(row._id, rows)) }}><ExpendIcon className={`${row.expend ? "rotate-90 " : ""}fill-svg-light duration-300 m-auto`} /></td>
                  <td className='min-w-14 max-w-14 w-14 '>{row.sn}</td>
                  <td className='min-w-32 max-w-32 w-32 '>{row.class}</td>
                  <td className='min-w-32 max-w-32 w-32 '>{row.section}</td>
                  <td className=' opacity-90 c-text-error min-w-0 max-w-0 w-0 pl-0 pr-1' >  | </td>
                  <td className=' opacity-65 min-w-14 max-w-14 w-14 '> <button><ViewCompactIcon className='fill-svg-success' /> </button></td>
                  <td className=' opacity-90 c-text-error min-w-0 max-w-0 w-0 pl-0 pr-1' >  | </td>
                </tr>
                {row.expend && 
                  <tr className='fade-in nested'>
                    <td className='py-1 px-0' colSpan={7} >
                     <StudentsBysection class_id={row.class_id} class_name={row.class}  section_id={row.section_id} section_name={row.section} 
                     examList={
                      examList.filter((x:ExamType)=>{ if(x.include.find((inc:IncludeType)=>inc.class==row.class_id && inc.section==row.section_id )){ return x;}})
                      .map((x:ExamType)=>{ 
                        let data=x.include.find((inc:IncludeType)=>inc.class==row.class_id && inc.section==row.section_id )
                        return {_id:x._id,title:x.title,subjectMarks:data?.timeTable};
                      })
                     }
                     classExamMarks={examMarks.filter((x:any)=>(x.class==row.class_id))}
                     sectionExamMarks={examMarks.filter((x:any)=>(x.class==row.class_id && x.section==row.section_id))}
                     passRule={passRule}
                     />
                    </td>
                  </tr>
                }
              </tbody>
            )}
          </> : <tbody><tr><td colSpan={11} className='text-center c-text-dark'>No Period found.</td></tr></tbody>}

        </table>
        {rowsBacup && rowsBacup.length > rowsPerPage && rowsBacup[0]._id ?
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
      </div >
    </>
  )
}


export default AllMarksheets;