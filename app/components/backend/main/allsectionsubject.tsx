"use client"

import React, { FC, useEffect, useState } from 'react'
import FilterField from '../../shared/forms-elements/filterfield';
import Swall from '../../shared/utils/swal';
import TablePagination from '../../shared/table/pegination';
import TableHeader from '../../shared/table/tableheader';
import { GetAllSectionSubjectApi, GetAllSubjectApi, UpdateSectionSubjectPostApi } from '../../shared/utils/apis';
import { SectionSubjectType, sectionSubjectinit, sectionFeeheadData, FeeType, Feeinit } from '../../shared/model/feehelper';
import ExpendIcon from '../../shared/Icons/expend';
import { Expendrow } from '../../shared/utils/helperfunction';
import { PopupMsg } from '../../shared/utils/poupMsg';
import { SubjectType, Subjectinit, subjectheadData } from '../../shared/model/subjecthelper';
import DeleteIcon from '../../shared/Icons/delete';
import ClosecircleIcon from '../../shared/Icons/closecircle';
import PlusIcon from '../../shared/Icons/plus';
import ResetIcon from '../../shared/Icons/reset';

const AllSectionSubject: FC = () => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [popupMsgData, setPopupMsgData] = useState({ mainMsg: "", subMsg: "", showPopupMsg: 0, obj: {} })
  const [rows, setrows] = useState<Array<SectionSubjectType>>([sectionSubjectinit])
  const [rowsBacup, setrowsBacup] = useState<Array<SectionSubjectType>>([sectionSubjectinit])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (newPage: number) => { setPage(newPage); };

  const [subjectList, setSubjectList] = useState<Array<SubjectType>>([Subjectinit])

  useEffect(() => { getSubject() }, [])
  const getSubject = async () => {
    let data = await GetAllSubjectApi()
    const newData = data.data
    setSubjectList(newData);
  }

  useEffect(() => { GetAllSectionSubject() }, [])
  const GetAllSectionSubject = async () => {
    const data = await GetAllSectionSubjectApi();
    setrows(data); setrowsBacup(data)
  }

  const updateFromMaterData = async (class_id: string, section_id: string, same_syllabus_as_section_id: string, subjectList: any) => {
    const body = { class_id: class_id, section_id: section_id, same_syllabus_as_section_id: same_syllabus_as_section_id, subjectList: subjectList }
    const data = await UpdateSectionSubjectPostApi(body)
    GetAllSectionSubject()
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
  }

  const updateassamesubject = (class_id: string, section_id: string, same_syllabus_as_section_id: string) => {
    let finalrow = getFinalrow(class_id, section_id, same_syllabus_as_section_id)
    updateFromMaterData(class_id, section_id, finalrow.section_id, finalrow.subjectList)
    console.log(finalrow)
  }

  const getFinalrow = (class_id: string, section_id: string, same_syllabus_as_section_id: string) => {
    let result: SectionSubjectType = sectionSubjectinit;
    rows.filter(r => (r.class_id == class_id && r.section_id != section_id))
      .map((x) => {
        let prev = rows.find(x => x._id == same_syllabus_as_section_id)
        if (prev) {
          same_syllabus_as_section_id = x.section_id;
          result = x
        }
      })
    return result;
  }



  return (
    <>
      <Swall swallData={alertData} />
      <PopupMsg data={popupMsgData} handelePopupMsg={(val) => { if (val.accepted) { updateFromMaterData(val.obj.class_id, val.obj.section_id, "", subjectList) } }} />
      <div className='absolute top-1'>
        <FilterField rows={rows} rowsBacup={rowsBacup} handleChange={(val: any) => { setrows(val) }} />
      </div>
      <div className="mt-5 relative   overflow-x-auto pb-5">
        <table >
          <thead>
            <TableHeader theadData={sectionFeeheadData} rows={rows} updateRows={(val) => { setrows(val) }} />
          </thead>
          {rowsBacup && rowsBacup.length && rowsBacup[0]._id ? <>
            {rows && (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((ssub: SectionSubjectType, i) =>
              <tbody key={i}>
                <tr >
                  <td className='cursor-pointer w-14' onClick={() => { setrows(Expendrow(ssub._id, rows)) }}><ExpendIcon className={`${ssub.expend ? "rotate-90 " : ""}fill-svg-light duration-300 m-auto`} /></td>
                  <td>{ssub.sn}</td>
                  <td>{ssub.class}</td>
                  <td>{ssub.section}</td>
                  <td className=' whitespace-nowrap'>
                    {ssub.same_syllabus_as_section_id == "" ? 
                    <span>
                      {!ssub.subjectList.length ?
                        <button type='button' className='btn-outline-success p-1 mr-3 ' onClick={() => { updateFromMaterData(ssub.class_id, ssub.section_id, "", subjectList) }}>Update From Master Data</button>
                        : <button type='button' className='btn-outline-error p-1 mr-3 ' onClick={() => { setPopupMsgData({ mainMsg: "Are you sure want to reset it ?", subMsg: "You wont be able to find it again", showPopupMsg: Math.random(), obj: { class_id: ssub.class_id, section_id: ssub.section_id } }) }}><ResetIcon className="current"/> Master Data</button>
                      }
                    </span>
                      : <span className='flex justify-between'>
                        <span className='mt-1'>Same  as {rows.find(x => x.section_id == ssub.same_syllabus_as_section_id)?.section}</span>
                        <button className="btn-outline-error w-12" type="button" onClick={() => { updateFromMaterData(ssub.class_id, ssub.section_id, "", subjectList) }}> <PlusIcon className="fill-svg-error rotate-45 p-0" /> </button>
                        </span>
                    }

                    {ssub.same_syllabus_as_section_id == "" ? <>
                      {(i > 0 && rows[i - 1].class_id == rows[i].class_id) ?
                        <button type='button' className='btn-outline-success p-1 float-end' onClick={() => {
                          updateassamesubject(ssub.class_id, ssub.section_id, rows[i - 1]._id)                       
                        }}><ResetIcon className="current"/> {rows[i - 1].section} </button> :<></>
                        // <span className='opacity-35'>Subject same as</span>
                      }
                    </> : <></>}
                  </td>
                </tr>
                {ssub.expend && ssub.subjectList.length &&
                  <tr className='fade-in nested'>
                    <td className='py-3' colSpan={5} >
                      <table >
                        <thead>
                          <TableHeader theadData={subjectheadData} rows={rows} updateRows={(val) => { setrows(val) }} />
                        </thead>
                        <tbody >
                          {ssub.subjectList.map((sub, i) =>
                            <tr key={sub._id}>
                              <td>{i + 1}</td>
                              <td>{sub.name}</td>
                              <td>{sub.optional}</td>
                              <td className=''>
                                <button type='button' className='btn-outline-light p-1' onClick={() => {
                                  updateFromMaterData(ssub.class_id, ssub.section_id, "", ssub.subjectList.filter(x => x._id != sub._id))

                                }}><DeleteIcon /></button>
                              </td>
                            </tr>

                          )}
                        </tbody>
                      </table>


                    </td>
                  </tr>
                }
              </tbody>
            )}
          </> : <tbody><tr><td colSpan={11} className='text-center c-text-dark'>No Section Subject found.</td></tr></tbody>}

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

export default AllSectionSubject;