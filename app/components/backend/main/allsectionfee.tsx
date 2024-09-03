"use client"

import React, { FC, useEffect, useState } from 'react'
import FilterField from '../../shared/forms-elements/filterfield';
import Swall from '../../shared/utils/swal';
import TablePagination from '../../shared/table/pegination';
import TableHeader from '../../shared/table/tableheader';
import { GetAllFeeApi, GetAllSectionFeeApi, UpdateSectionFeePostApi } from '../../shared/utils/apis';
import { SectionFeeType, sectionFeeinit, sectionFeeheadData, FeeType, Feeinit, feeheadData, feeNestedheadData, classDataProps } from '../../shared/model/feehelper';
import ExpendIcon from '../../shared/Icons/expend';
import { Expendrow } from '../../shared/utils/helperfunction';
import EditIcon from '../../shared/Icons/edit';
import { Delwarn } from '../../shared/utils/delwarn';
import { PopupMsg } from '../../shared/utils/poupMsg';


interface AllSectionFeeProps {
  newData: FeeType,
  reciveDataTobeEdited: (option: FeeType, classData: classDataProps) => void
}

const AllSectionFee: FC<AllSectionFeeProps> = ({ newData, reciveDataTobeEdited }) => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [popupMsgData, setPopupMsgData] = useState({ mainMsg: "", subMsg: "", showPopupMsg: 0, obj: {} })
  const [rows, setrows] = useState<Array<SectionFeeType>>([sectionFeeinit])
  const [rowsBacup, setrowsBacup] = useState<Array<SectionFeeType>>([sectionFeeinit])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [masterFee, setMasterFee] = useState<Array<FeeType>>([Feeinit])
  const handleChangePage = (newPage: number) => { setPage(newPage); };

  useEffect(() => { GetAllSectionFee() }, [newData])
  const GetAllSectionFee = async () => {
    const data = await GetAllSectionFeeApi();
    setrows(data); setrowsBacup(data)
  }

  useEffect(() => { getFee() }, [newData])
  const getFee = async () => {
    let data = await GetAllFeeApi()
    const newData = data.filter((x: any) => x.status == "Active")
    setMasterFee(newData)
  }

  const updateFromMaterData = async (class_id: string, section_id: string) => {
    const body = { class_id: class_id, section_id: section_id, fee: masterFee }
    const data = await UpdateSectionFeePostApi(body)
    GetAllSectionFee()
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })

  }

  return (
    <>
      <Swall swallData={alertData} />
      <PopupMsg data={popupMsgData} handelePopupMsg={(val) => { if (val.accepted) { updateFromMaterData(val.obj.class_id, val.obj.section_id) } }} />
      <div className='absolute top-1'>
        <FilterField rows={rows} rowsBacup={rowsBacup} handleChange={(val: any) => { setrows(val) }} />
      </div>
      <div className="mt-5 relative   overflow-x-auto pb-5">
        <table >
          <thead>
            <TableHeader theadData={sectionFeeheadData} rows={rows} updateRows={(val) => { setrows(val) }} />
          </thead>
          {rowsBacup && rowsBacup.length && rowsBacup[0]._id  ? <>
            {rows && (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((sfe: SectionFeeType, i) =>
              <tbody key={i}>
                <tr >
                  <td className='cursor-pointer w-14' onClick={() => { setrows(Expendrow(sfe._id, rows)) }}><ExpendIcon className={`${sfe.expend ? "rotate-90 " : ""}fill-svg-light duration-300 m-auto`} /></td>
                  <td>{sfe?.sn}</td>
                  <td>{sfe.class}</td>
                  <td>{sfe.section}</td>
                  <td className=' whitespace-nowrap'>
                    {!sfe.fee.length ?
                      <button type='button' className='btn-outline-success p-1 mr-3 ' onClick={() => { updateFromMaterData(sfe.class_id, sfe.section_id) }}>Update From Master Data</button>
                      : <button type='button' className='btn-outline-error p-1 mr-3 ' onClick={() => {
                        setPopupMsgData({ mainMsg: "Are you sure want to reset it ?", subMsg: "You wont be able to find it again", showPopupMsg: Math.random(), obj: { class_id: sfe.class_id, section_id: sfe.section_id } })
                      }}>Reset From Master Data</button>}

                  </td>
                </tr>
                {sfe.expend && sfe.fee.length &&
                  <tr className='fade-in nested'>
                    <td className='py-3' colSpan={8} >
                      <span className='flex justify-center items-center'>
                        {/* ===== */}
                        <table >
                          <thead>
                            <TableHeader theadData={feeNestedheadData} rows={rows} updateRows={(val) => { setrows(val) }} />
                          </thead>

                          {sfe.fee.map((fe, j) =>
                            <tbody key={fe._id}>
                              <tr className={`${fe.status=="Active"?"":"opacity-35"}`} >
                                <td className='cursor-pointer w-14' onClick={() => {
                                  rows[i].fee = Expendrow(fe._id, sfe.fee);
                                  setrows(JSON.parse(JSON.stringify(rows)))
                                }}>
                                  <ExpendIcon className={`${fe.expend ? "rotate-90 " : ""}fill-svg-light duration-300 m-auto fill-svg-success`} />
                                </td>
                                <td>{j + 1}</td>
                                <td>{fe.title}</td>
                                <td>{fe.amount}</td>
                                <td>{fe.collecting_month}</td>
                                <td>{fe.last_date_of_collection}</td>
                                <td>{fe.optional}</td>
                                <td>{fe.status}</td>
                                <td>
                                  <button type='button' className='btn-outline-light p-1 mr-3 ' onClick={() => {
                                    reciveDataTobeEdited(fe, { class_id: sfe.class_id, class: sfe.class, section_id: sfe.section_id, section: sfe.section })
                                  }}><EditIcon /></button>
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
                        </table>
                        {/* ======== */}
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
      </div >
    </>
  )
}

export default AllSectionFee;