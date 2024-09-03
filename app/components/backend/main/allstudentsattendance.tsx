"use client"
import React, { FC, useEffect, useState } from 'react'
import { StudentAttendanceType, StudentAttendanceinitial, StudentType, Studentinitial, studentAttendanceHeadData } from '@/app/components/shared/model/studenthelper';
import TablePagination from '../../shared/table/pegination';
import TableHeader from '../../shared/table/tableheader';
import Swall from '../../shared/utils/swal';
import { GetAllClassDropDownApi, GetAllStudentAttendancesApi, StartStudentAttendancesApi, UpdateStudentAttendanceApi, } from '../../shared/utils/apis';
import { ClassDropDownType, ClassinitialDropdown, selectedSectionInitial } from '../../shared/model/classhelper';
import { format } from 'date-fns';
import SelectField from '../../shared/forms-elements/select-html';
import TextField from '../../shared/forms-elements/textfield-html';
import SelectArryField from '../../shared/forms-elements/selectArray-html';
import DateField from '../../shared/forms-elements/datefield-html';
import ExpendIcon from '../../shared/Icons/expend';
import { Expendrow } from '../../shared/utils/helperfunction';
import Image from 'next/image';
import TextAreaField from '../../shared/forms-elements/textarea-html';
import { useSession } from 'next-auth/react';
import IMG from '../../shared/images/img';
import IMGR from '../../shared/images/imgr';


interface AllStudentsAttendanceProps {
  newData: StudentType,
  reciveDataTobeEdited: (option: StudentType) => void
}


const AllStudentsAttendance: FC<AllStudentsAttendanceProps> = ({ newData, reciveDataTobeEdited }) => {
  const { data: session, status } = useSession() 
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [rows, setrows] = useState<Array<StudentAttendanceType>>([StudentAttendanceinitial])
  const [rowsBacup, setrowsBacup] = useState<Array<StudentAttendanceType>>([StudentAttendanceinitial])
  const [classList, setClassList] = useState<Array<ClassDropDownType>>([ClassinitialDropdown])
  const [classSelected, setClassSelected] = useState<ClassDropDownType>(ClassinitialDropdown)
  const [sectionSelected, setSectionSelected] = useState(selectedSectionInitial)
  const [dateSelected, setDateSelected] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (newPage: number) => { setPage(newPage); };

  useEffect(()=>{ 
    if(session?.user.role=="Teacher"){  
      //@ts-ignore
      setClassSelected({...classSelected,_id:session?.user.class})
      //@ts-ignore
      setSectionSelected({...sectionSelected,_id:session?.user.section})    
      let param ={class:session?.user.class, section:session?.user.section}
      //@ts-ignore
      getallAttendance(session?.user.class,session?.user.section, dateSelected)
      // getSpecificStudentsForSection(param)
    }else if(session?.user.role=="Admin"){
      // getSpecificStudents()
      GetAllClassDropDown()
    } 
  },[session])

  const GetAllClassDropDown = async () => {
    let data = await GetAllClassDropDownApi()
    setClassList(data.data)
  }

  const getallAttendance = async (class_id: string, section_id: string, date: string) => {
    let data = await GetAllStudentAttendancesApi(class_id, section_id, date);
    console.log(data.data)
    setrows(data.data); setrowsBacup(data.data)
  }

  const startAttendance = async (class_id: string, section_id: string, date: string) => {
    if (date == format(new Date(), 'yyyy-MM-dd')) {
      let data = await StartStudentAttendancesApi(class_id, section_id, date)
      seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    } else {
      seAlertData({ showSwall: Math.random(), className: "warn", message: "Its allowed for same day only" })
    }
  }


  const updateAttendance = async (stu: any) => {
    let data = await UpdateStudentAttendanceApi(stu)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
  }

 


  return (
    <>
      <Swall swallData={alertData} />
      <div className='absolute top-[-4px] '>
        {/* <FilterField rows={rows} rowsBacup={rowsBacup} handleChange={(val: any) => { setrows(val) }} /> */}
        <div className="grid grid-cols-12 gap-x-2">
        {session?.user.role=="Admin" ? <>
          <SelectArryField className="col-span-2" options={classList} firstOption="Class" value={classSelected._id} label="" name="class" onChange={(e: any) => {
            let tempData = classList.find(x => x._id == e.target.value)
            if (tempData != undefined) { setClassSelected(tempData) }
            setSectionSelected(selectedSectionInitial)
          }} />
          <SelectArryField className="col-span-2" options={classSelected.section} firstOption="Section" value={sectionSelected._id} label="" name="section" onChange={(e: any) => {
            let tempData = classSelected.section.find(x => x._id == e.target.value)
            if (tempData != undefined) { setSectionSelected(tempData) }

          }} />
             </>:<></>}
          <DateField className="col-span-2" value={dateSelected} name="sectionSelected" onChange={(e: any) => {
            setDateSelected(e.target.value)
            console.log(e.target.value)
          }} />

          <button className='btn-link-success mt-2 whitespace-nowrap col-span-2'
            disabled={sectionSelected._id == "" || sectionSelected._id == "" || dateSelected == ""}
            onClick={() => {
              getallAttendance(classSelected._id, sectionSelected._id, dateSelected)
            }}>Get Attendance</button>
          <button className='btn-link-success mt-2 whitespace-nowrap col-span-2'
            disabled={sectionSelected._id == "" || sectionSelected._id == "" || dateSelected == ""}
            onClick={() => {
              startAttendance(classSelected._id, sectionSelected._id, dateSelected)
            }}>Start Attendance</button>
        </div>

        {/* {classList.length>1 && <FilterSelectField rows={rows} options={classList} rowsBacup={rowsBacup} handleChange={(val: any) => { setrows(val) }} />} */}
      </div>

      <div className="mt-5 relative   overflow-x-auto pb-5">
        <table >
          <thead>
            <TableHeader theadData={studentAttendanceHeadData} rows={rows} updateRows={(val) => { setrows(val) }} />
          </thead>
          {rowsBacup && rowsBacup.length && rowsBacup[0]._id ? <>
            {rows && (rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((att, i) =>
            <tbody key={att._id}>
             <tr >
             <td className='cursor-pointer w-14' onClick={() => { setrows(Expendrow(att._id, rows)) }}><ExpendIcon className={`${att.expend ? "rotate-90 " : ""}fill-svg-light duration-300 m-auto`} /></td>
              <td >{i + 1}</td>
              <td>{att.student_id.roll_no}</td>
              <td>{att.student_id.name}</td>
              <td><SelectField options={["Present", "Absent", "Leave"]} value={att.attendance} name="att.attendance" onChange={(e: any) => { setrows([...rows].map((x=>{if(x._id==att._id){x["attendance"]=e.target.value} return x}))) }} />  </td>
              <td className='whitespace-nowrap'><SelectField options={["Full-Day", "First-half", "Second-Half"]} value={att.duration} name="att.duration" onChange={(e: any) => { setrows([...rows].map((x=>{if(x._id==att._id){x["duration"]=e.target.value} return x}))) }} />  </td>
 
              <td>
                <button type='button' className='btn-outline-success p-1 mr-3 ' onClick={() => { updateAttendance(att) }}>Update</button>
              </td>
            </tr>
                {att.expend && <tr className='fade-in nested'>
                  <td className='py-3' colSpan={7} >
                    <span className='flex justify-center items-center'>
                    <table>
                      <thead>
                        <tr className='w-14'>
                          <td rowSpan={5} colSpan={2}> 
                          <span className='flex justify-center items-center  relative h-32 w-auto'>
                                <IMGR src={att.student_id.profile_image} alt='profile image' />
                              </span>
                          </td>                     
                        <td  className='w-48'><SelectField options={["Yes", "No"]} label='Cleanliness' value={att.cleanliness} name="att.cleanliness" onChange={(e: any) => {  setrows([...rows].map((x=>{if(x._id==att._id){x["cleanliness"]=e.target.value} return x}))) }} />  </td>
                        </tr><tr className='w-14'>
                      
                        <td><SelectField options={["Yes", "No"]} label='Attentiveness' value={att.attentiveness} name="att.attentiveness" onChange={(e: any) => {  setrows([...rows].map((x=>{if(x._id==att._id){x["attentiveness"]=e.target.value} return x}))) }} />  </td>
                        </tr><tr className='w-14'>
                  
                        <td><SelectField options={["Yes", "No"]} label='Punctuality' value={att.punctuality} name="att.punctuality" onChange={(e: any) => {  setrows([...rows].map((x=>{if(x._id==att._id){x["punctuality"]=e.target.value} return x}))) }} />  </td>
                        </tr><tr className='w-14'>
                      
                        <td><SelectField options={["Good", "Better", "Best"]} label='Handwriting' value={att.handwriting} name="att.handwriting" onChange={(e: any) => {   setrows([...rows].map((x=>{if(x._id==att._id){x["handwriting"]=e.target.value} return x}))) }} />  </td>
                        </tr><tr className='w-14'>
                   
                        <td><SelectField options={["Good", "Better", "Best"]} label='Interactive' value={att.interactive} name="att.interactive" onChange={(e: any) => {   setrows([...rows].map((x=>{if(x._id==att._id){x["interactive"]=e.target.value} return x}))) }} />  </td>
                        </tr><tr className='w-14'>
                        <td colSpan={2} rowSpan={2}>  <TextAreaField  label='Remarks' rows={4}  value={att.remark} name="att.remark" onChange={(e: any) => {   setrows([...rows].map((x=>{if(x._id==att._id){x["remark"]=e.target.value} return x}))) }} placeholder='Enter Remarks' />
                          </td>
                    
                        <td><SelectField options={["Done", "Not-done", "Half-Done"]} label='Homework' value={att.classwork} name="att.classwork" onChange={(e: any) => {   setrows([...rows].map((x=>{if(x._id==att._id){x["classwork"]=e.target.value} return x}))) }} />  </td>
                        </tr><tr className='w-14'>
                    
                      
                        <td><SelectField options={["Done", "Not-done", "Half-Done"]} label='Classwork' value={att.homework} name="att.homework" onChange={(e: any) => {  setrows([...rows].map((x=>{if(x._id==att._id){x["homework"]=e.target.value} return x}))) }} />  </td>

                        </tr>
                         
                        
                        
                        
                        </thead>
                      </table>
                    </span>
                  </td>
                </tr>
                }

            </tbody>
            )}
          </> : <tbody><tr><td colSpan={11} className='text-center c-text-dark'>No Student Attendance found.</td></tr></tbody>}
        </table>

      </div>
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
    </>
  )
}

export default AllStudentsAttendance;