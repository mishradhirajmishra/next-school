"use client"

import React, { FC, useEffect, useState } from 'react'
import FilterField from '../../shared/forms-elements/filterfield';
import Swall from '../../shared/utils/swal';
import TablePagination from '../../shared/table/pegination';
import TableHeader from '../../shared/table/tableheader';
import { GetAllLessonPlanApi, GetAllLessonSubjectApi } from '../../shared/utils/apis';
import ExpendIcon from '../../shared/Icons/expend';
import { Expendrow, getRunningYear } from '../../shared/utils/helperfunction';
import { AllLessonSyllabusProps, LessonPlanData, LessonplainxpData, LessonPlanType, lessonPlaninit } from '../../shared/model/lessonplanhelper';
import EditIcon from '../../shared/Icons/edit';
import LessonPlanSubject from '../sub/lessonplansubject';
import { LPClassType, LPClassInit } from '../../shared/model/lessonplanhelper';

const AllLessonSyllabus: FC<AllLessonSyllabusProps> = ({ newData, reciveDataTobeEdited }) => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [rows, setrows] = useState<Array<LPClassType>>([LPClassInit])
  const [rowsBacup, setrowsBacup] = useState<Array<LPClassType>>([LPClassInit])
  const [lessonPlan, setLessonPlan] = useState<Array<LessonPlanType>>([lessonPlaninit]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (newPage: number) => { setPage(newPage); };




  useEffect(() => { GetAllSectionSubject() }, [])
  const GetAllSectionSubject = async () => {
    const data = await GetAllLessonSubjectApi();
    console.log(data)
    setrows(data);
    setrowsBacup(data)
  }
  useEffect(() => { getLessonPlan() }, [newData])
  useEffect(() => { getLessonPlan() }, [])
  const getLessonPlan = async () => {
    let data = await GetAllLessonPlanApi();
    setLessonPlan(data)
  }



  return (
    <>
      <Swall swallData={alertData} />
      {/* <PopupMsg data={popupMsgData} handelePopupMsg={(val) => { if (val.accepted) { updateFromMaterData(val.obj.class_id, val.obj.section_id,subjectList) } }} /> */}
      <div className='absolute top-1'>
        <FilterField rows={rows} rowsBacup={rowsBacup} handleChange={(val: any) => { setrows(val) }} />
      </div>
      <div className="mt-5 relative   overflow-x-auto pb-5">
        <table  >
          <thead>
            <TableHeader theadData={LessonPlanData} rows={rows} updateRows={(val) => { setrows(val) }} />
          </thead>
          {rowsBacup && rowsBacup.length && rowsBacup[0]._id ? <>
            {rows && (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((cl, i) =>
              <tbody key={cl._id}>
                <tr >
                  <td className='cursor-pointer w-14' onClick={() => { setrows(Expendrow(cl._id, rows)) }}><ExpendIcon className={`${cl.expend ? "rotate-90 " : ""}fill-svg-light duration-300 m-auto`} /></td>
                  <td>{i + 1}</td>
                  <td>{cl.name}</td> 
                </tr>
                {/* ============== Expended Area ================= */}
                {cl.expend && <tr className='fade-in nested'>
                  <td className='p-0 opacity-90 ' colSpan={4} >
                    <span>
                      <table>
                        {cl.section && cl.section.length && cl.section.map((sec, j) =>
                          <tbody key={j}>
                            <tr >
                              <td  className={`${sec.same_syllabus_as_section_id =="" ?"cursor-pointer":"opacity-65"} w-14`} onClick={() => {
                                if(sec.same_syllabus_as_section_id ==""){
                                  rows[i].section = Expendrow(sec._id, cl.section); setrows(JSON.parse(JSON.stringify(rows))) 
                                }
                                 
                                 
                                 }}>
                                <ExpendIcon className={`${sec.expend ? "rotate-90 " : ""}fill-svg-light duration-300 m-auto fill-svg-success`} />
                              </td>
                              <td className={`${sec.same_syllabus_as_section_id =="" ?"cursor-pointer":"opacity-65"} capitalize`} >{sec.name}</td>
                              <td className='capitalize '> 
                              {j>0 &&sec.same_syllabus_as_section_id !="" &&  <span className='opacity-65'>Same as {cl.section.find((s:any)=>s._id==sec.same_syllabus_as_section_id)?.name }</span> }
                                </td>
                            </tr>
                            {sec.expend && sec.subjectList.length &&
                              <tr className='fade-in nested'>
                                <td className='py-3 px-1' colSpan={5} >
                                  <table >
                                    <thead>
                                      <TableHeader className='opacity-35' theadData={LessonplainxpData} rows={rows} updateRows={(val) => { setrows(val) }} />
                                    </thead>

                                    {sec.subjectList.map((sub, j) => {
                                      const lessonPlanSingle = lessonPlan.find((lp: LessonPlanType) => (lp.class == cl._id && lp.section == sec._id && lp.subject == sub._id))
                                      return (<tbody key={sub._id}>
                                        <tr>
                                          <td className='cursor-pointer w-14'
                                            onClick={() => {
                                              rows[i].section[j].subjectList = Expendrow(sub._id, sec.subjectList);
                                              setrows(JSON.parse(JSON.stringify(rows)))
                                            }}>
                                            <ExpendIcon className={`${sub.expend ? "rotate-90 " : ""}fill-svg-light duration-300 m-auto`} /></td>
                                          <td>{i + 1}</td>
                                          <td>{sub.name}</td>

                                          <td className=''>
                                            <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => {
                                              if (lessonPlanSingle) {
                                                reciveDataTobeEdited({
                                                  ...lessonPlanSingle,
                                                  class_name: cl.name,
                                                  section_name: sec.name,
                                                  subject_name: sub.name,
                                                })
                                              } else {
                                                reciveDataTobeEdited({
                                                  ...lessonPlaninit,
                                                  type: "lesson",
                                                  class: cl._id,
                                                  class_name: cl.name,
                                                  section: sec._id,
                                                  section_name: sec.name,
                                                  subject: sub._id,
                                                  subject_name: sub.name,
                                                  running_year: getRunningYear()
                                                })
                                              }
                                            }}><EditIcon className='fill-svg-dark' /></button>

                                          </td>

                                        </tr>
                                        {sub.expend && lessonPlan.length ? <tr className='fade-in nested'>
                                          <td className='py-3 px-1' colSpan={5}>
                                            <LessonPlanSubject addsyllabus={(less) => {
                                              reciveDataTobeEdited({
                                                ...less,
                                                class_name: cl.name,
                                                section_name: sec.name,
                                                subject_name: sub.name,
                                              })
                                            }} lessonPlan={lessonPlanSingle} />
                                          </td>
                                        </tr> : <></>}
                                      </tbody>)
                                    }
                                    )}

                                  </table>


                                </td>
                              </tr>
                            }
                          </tbody>
                        )}

                      </table>
                    </span>
                  </td>
                </tr>}
                {/* ================================================ */}
              </tbody>
            )}
          </> : <tbody><tr><td colSpan={11} className='text-center c-text-dark'>No Lesson Plan found.</td></tr></tbody>}
          {rowsBacup && rowsBacup.length > rowsPerPage && rowsBacup[0]._id ? <tfoot>
            <tr>
              <td colSpan={5}>
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

export default  AllLessonSyllabus;