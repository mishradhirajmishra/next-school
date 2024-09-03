"use client"
import React, { FC, useEffect, useState } from 'react'
import { StudentType, Studentinitial, studentFeeheadData } from '@/app/components/shared/model/studenthelper';
import TablePagination from '../../shared/table/pegination';
import TableHeader from '../../shared/table/tableheader';
import Swall from '../../shared/utils/swal';
import { CreateUpdateStudentFeeReciptApi, GetAllClassDropDownApi, GetAllStudentFeeApi, GetSpecificStudentsListApi, StudentFeePaymentListApi, StudentFeeReciptListApi } from '../../shared/utils/apis';
import { ClassDropDownType, ClassinitialDropdown } from '../../shared/model/classhelper';
import ExpendIcon from '../../shared/Icons/expend';
import { Expendrow, calculateTotalFee, generateFeePDF, getRunningYear, totalFeePaymet } from '../../shared/utils/helperfunction';
import SelectArryField from '../../shared/forms-elements/selectArray-html';
import FilterField from '../../shared/forms-elements/filterfield';
import { useSession } from 'next-auth/react';
import { FeeType, MonthlyFeeType, StudentFeePaymentType, StudentFeeReciptType } from '../../shared/model/feehelper';
import monthlist from '../../shared/utils/monthlist';
import SectionFee from './sectionfee';
const selectedSectionInitial = { name: "", _id: "", value: "" }
const sortedMonthlist = monthlist.sort((a: any, b: any) => a.order - b.order)
interface AllStudentsFeeProps {
  newData: StudentFeePaymentType,
  reciveDataTobeEdited: (option: any) => void
}


const AllStudentsFee: FC<AllStudentsFeeProps> = ({ newData, reciveDataTobeEdited }) => {
  const { data: session, status } = useSession()
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [rows, setrows] = useState<Array<StudentType>>([Studentinitial])
  const [rowsBacup, setrowsBacup] = useState<Array<StudentType>>([Studentinitial])
  const [page, setPage] = useState(0);
  const [show, setShow] = useState("fee_detail");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [classList, setClassList] = useState<Array<ClassDropDownType>>([ClassinitialDropdown])
  const [classSelected, setClassSelected] = useState<ClassDropDownType>(ClassinitialDropdown)
  const [sectionSelected, setSectionSelected] = useState(selectedSectionInitial)
  const handleChangePage = (newPage: number) => { setPage(newPage); };

  useEffect(() => {
    if (session?.user.role == "Teacher") {
      //@ts-ignore
      setClassSelected({ ...classSelected, _id: session?.user.class })
      //@ts-ignore
      setSectionSelected({ ...sectionSelected, _id: session?.user.section })
      let param = { class: session?.user.class, section: session?.user.section }
      getSpecificStudentsForSection(param)
    } else if (session?.user.role == "Admin") {
      getSpecificStudents()
      GetAllClassDropDown()
    }
  }, [session, newData])



  const GetAllClassDropDown = async () => {
    let data = await GetAllClassDropDownApi()
    setClassList(data.data)
  }

  const getSpecificStudents = async () => {
    let param = {}
    if (classSelected._id !== "" && sectionSelected._id !== "") { param = { class: classSelected._id, section: sectionSelected._id } }
    else if (classSelected._id !== "" && sectionSelected._id == "") { param = { class: classSelected._id } } else { param = {} }
    let studentList = await GetSpecificStudentsListApi(param)
    let FeePaymentList = await StudentFeePaymentListApi(param)
    let FeeReciptList = await StudentFeeReciptListApi(param)
    GetAllSectionFee(studentList, FeePaymentList, FeeReciptList)
  }

  const getSpecificStudentsForSection = async (param: any) => {
    let studentList = await GetSpecificStudentsListApi(param)
    let FeePaymentList = await StudentFeePaymentListApi(param)
    let FeeReciptList = await StudentFeeReciptListApi(param)
    GetAllSectionFee(studentList, FeePaymentList, FeeReciptList)
  }

  const GetAllSectionFee = async (studentList: any, FeePaymentList: Array<StudentFeePaymentType>, FeeReciptList: Array<StudentFeeReciptType>) => {

    const data = await GetAllStudentFeeApi();
    let stuList = studentList.map((stu: StudentType) => {
      let fee_payment = FeePaymentList.filter((fp: StudentFeePaymentType) => fp.stu_id == stu._id) 
      stu.fee_payment = fee_payment;
      stu.total_paid_amount = totalFeePaymet(fee_payment)
      let fee_recipt = FeeReciptList.filter((fp: StudentFeeReciptType) => fp.stu_id == stu._id);
      stu.fee_recipt = fee_recipt
      stu.total_used_amount = totalFeePaymet(fee_recipt)
      if (stu.total_paid_amount && stu.total_used_amount) {
        stu.total_balance_amount = +stu.total_paid_amount - +stu.total_used_amount
      } else if (stu.total_paid_amount && !stu.total_used_amount) {
        stu.total_balance_amount = +stu.total_paid_amount
      }
      stu.fee_data = data.find((cl: any) => cl._id == stu.class)?.section.find((sec: any) => sec._id == stu.section)?.fee.filter((x: FeeType) => {
        if (x.status == "Active") {
          if (x.optional == "Yes") { if (stu.optional_fee.find((ofee: string) => ofee == x.title)) { return x; } } else { return x; }
        }
      })
      return stu;
    })
    setrows(stuList); setrowsBacup(stuList)
  }

  const payRecipt = async (value: any) => {
    const body = {
      _id: "",
      stu_id: value.stu?._id,
      class: value.stu?.class,
      section: value.stu?.section,
      fee_id: value.fee,
      collecting_month: value.month,
      amount: calculateTotalFee(value.fee, value.stu?.fee_discount),
      running_year: getRunningYear()
    }
    let data = await CreateUpdateStudentFeeReciptApi(body)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    if (data.class == "success") {
      getSpecificStudents()
    }
  }
  const getBalancedAmount = (stu: StudentType) => {
    if (stu?.total_paid_amount && stu?.total_used_amount) {
      return `${stu.total_paid_amount} - ${stu.total_used_amount} = ${stu.total_balance_amount}`
    } else if (stu?.total_paid_amount && !stu?.total_used_amount) {
      return `${stu.total_paid_amount}`
    } else if (!stu?.total_paid_amount) {
      return ""
    }
  }

  return (
    <>
      <Swall swallData={alertData} />
      <div className='absolute top-[-4px] '>
        <div className="grid grid-cols-12 gap-x-2">
          <div className="col-span-2 mt-2">
            <FilterField rows={rows} rowsBacup={rowsBacup} handleChange={(val: any) => { setrows(val) }} />
          </div>
          {session?.user.role == "Admin" ? <>
            <SelectArryField className="col-span-2" options={classList} firstOption="Class" value={classSelected._id} label="" name="class" onChange={(e: any) => {
              let tstuData = classList.find(x => x._id == e.target.value)
              if (tstuData != undefined) { setClassSelected(tstuData) }
              setSectionSelected(selectedSectionInitial)
            }} />
            <SelectArryField className="col-span-2" options={classSelected.section} firstOption="Section" value={sectionSelected._id} label="" name="section" onChange={(e: any) => {
              let tstuData = classSelected.section.find(x => x._id == e.target.value)
              if (tstuData != undefined) { setSectionSelected(tstuData) }
            }} />

            <button className='btn-link-success mt-2 whitespace-nowrap col-span-2'
              onClick={() => {
                getSpecificStudents()
              }}>Get Students</button>
          </> : <></>}
        </div>
      </div>
      <div className="mt-5 relative   overflow-x-auto pb-5">
        <table >
          <thead>
            <TableHeader theadData={studentFeeheadData} rows={rows} updateRows={(val) => { setrows(val) }} />
          </thead>
          {rowsBacup && rowsBacup.length && rowsBacup[0]._id  ? <>
            {rows && (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((stu, i) =>
              <tbody key={stu._id}>
                <tr className={`${stu.status == "Active" ? "" : "opacity-35"}`}>
                  <td className='cursor-pointer w-14' onClick={() => { setrows(Expendrow(stu._id, rows)) }}><ExpendIcon className={`${stu.expend ? "rotate-90 " : ""}fill-svg-light duration-300 m-auto`} /></td>
                  <td>{i + 1}</td>
                  <td>{stu.name}</td>
                  <td>{stu.guardian.name}</td>
                  <td>{stu.family_detail.find((x: any) => x.relation == "Father")?.name}</td>
                  <td>{stu.status}</td>
                  <td>{getBalancedAmount(stu)}</td>
                </tr>
                {stu.expend && show == "fee_detail" && <tr className='fade-in nested'>
                  <td className='py-1 px-1' colSpan={7} >
                    <span className='flex justify-center items-center'>
                      <table className='w-full'>
                        <thead><tr><td className='c-text-success' >Collection Month</td>
                          <td className='opacity-80 text-center' colSpan={16}> Fee Detail  </td>
                         </tr></thead>
                        {sortedMonthlist.map((month: any) => {

                          return (
                            <tbody className='border-b-8 border-transparent' key={i}>
                              <tr >
                                <td className='opacity-80 c-text-success' >{month.name}</td>
                                <td className='p-0 opacity-90 c-text-error ' >  | </td>
                                <td className='opacity-60' >  SN </td>
                                <td className='p-0 opacity-90 c-text-error ' >  | </td>
                                <td className='opacity-60' > Fee Name </td>
                                <td className='p-0 opacity-90 c-text-error ' >  | </td>
                                <td className='opacity-60' > Payment Date </td>
                                <td className='p-0 opacity-90 c-text-error ' >  | </td>
                                <td className='opacity-60' >  Amount </td>
                                <td className='p-0 opacity-90 c-text-error ' >  | </td>
                                <td className='opacity-60' > Late Fee </td>
                                <td className='p-0 opacity-90 c-text-error ' >  | </td>
                                <td className='opacity-60' > Discount </td>
                                <td className='p-0 opacity-90 c-text-error ' >  | </td>
                                <td className='opacity-60' > Total Fee </td>
                                <td className='p-0 opacity-90 c-text-error ' >  | </td>
                                <td className='opacity-60' > Recipt </td>
                              </tr>
                              {!month.expend && stu.fee_data?.length && <SectionFee stu={stu} fee_recipt={stu.fee_recipt?.filter((x: any) => x.collecting_month == month.name)} fee_data={stu.fee_data.filter((fe: FeeType) =>
                              (fe.collecting_month == month.name))
                              } reciveDataTobeEdited={(val) => {
                              let cl = classList.find((cl: any) => cl._id == stu.class);
                                if (cl) {
                                  let sec = cl.section.find((sec: any) => sec._id == stu.section)
                                  if (val.type == "pdf") {
                                    generateFeePDF({ ...val, stu: { ...stu, class_name: cl.name, section_name: sec?.name }, month: month.name })
                                  } else if (val.type == "pay") {
                                    payRecipt({ ...val, stu: { ...stu, class_name: cl.name, section_name: sec?.name }, month: month.name })
                                  }
                                  else if (val.type == "add_balance") {
                                    reciveDataTobeEdited({ stu_id: stu._id, stu_name: stu.name, class: stu.class, section: stu.section, class_name: cl.name, section_name: sec?.name })
                                  }
                                }
                                }
                              }

                              />}
                            </tbody>)
                        }
                        )}

                      </table>
                    </span>
                  </td>
                </tr>}
              </tbody>

            )}
          </> : <tbody><tr><td colSpan={11} className='text-center c-text-dark'>No Student found.</td></tr></tbody>}
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

export default AllStudentsFee;