"use client"
import DateField from '@/app/components/shared/forms-elements/datefield';
import SelectArryField from '@/app/components/shared/forms-elements/selectArray';
import { ClassDropDownType, ClassinitialDropdown} from '@/app/components/shared/model/classhelper';
import { BookIssueStudentValidationSchema, BookIssueType, BookType, bookIssueInit } from '@/app/components/shared/model/libraryhelper'
import { CreateUpdateBookIssueApi, GetAllClassDropDownApi, GetDropDownListApi} from '@/app/components/shared/utils/apis';
import { getRunningYear } from '@/app/components/shared/utils/helperfunction';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react'



interface ToStudentsProp {
  book: BookType,
 onSbmitForm :(option: boolean) => void   
}

const ToStudents: FC<ToStudentsProp> = ({ book ,onSbmitForm}) => {
  const [studentList, setStudentList] = useState<any>([]);
  const [classList, setClassList] = useState<Array<ClassDropDownType>>([ClassinitialDropdown])
  const [classSelected, setClassSelected] = useState<ClassDropDownType>(ClassinitialDropdown)
  // const [sectionSelected, setSectionSelected] = useState(selectedSectionInitial)
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })

  useEffect(() => { GetAllClassDropDown() }, [book])
  const GetAllClassDropDown = async () => {
    let data = await GetAllClassDropDownApi()
    setClassList(data.data)
  }
  const onSubmit = async (values: BookIssueType) => { 
   let data = await CreateUpdateBookIssueApi({...values,running_year:getRunningYear()})
   onSbmitForm(data)
   }

   const  getStudentList=async (class_id:string,section_id:string)=>{
    let param = { class: class_id, section: section_id }
    let studentList = await GetDropDownListApi(param);
    setStudentList(studentList.map((x: any) => { x.status=false; x.value = x._id; x.name=x.name + " ( ROLL NO : "+x.roll_no +" )"; return x }));
   }
  return (
    <> <Formik onSubmit={onSubmit} initialValues={{...bookIssueInit,book_id:book._id}} validationSchema={BookIssueStudentValidationSchema} >
        {({ values, errors, touched, setFieldValue, handleChange }) => <>
          <Form>
            <div className='h-[calc(100vh-225px)]'>
          <div className="grid grid-cols-12 gap-x-2">
          <SelectArryField className="col-span-4" options={classList} firstOption="Class" value={values.class} label="Class" name="class" onChange={(e: any) => {
            let tempData = classList.find(x => x._id == e.target.value)
            setFieldValue("class",e.target.value)
            setFieldValue("student_id","")
            setFieldValue("section","")
            if (tempData != undefined) { setClassSelected(tempData) }
            // setSectionSelected(selectedSectionInitial)
          }} />
          <SelectArryField className="col-span-4" options={classSelected.section} firstOption="Section" value={values.section} label="Section" name="section" onChange={(e: any) => {
            let tempData = classSelected.section.find(x => x._id == e.target.value)
            setFieldValue("student_id","")
            setFieldValue("section",e.target.value)
            if (tempData != undefined) { 
              // setSectionSelected(tempData)
               getStudentList(classSelected._id,e.target.value)
            }
          }} />

          <SelectArryField  className="col-span-4" options={studentList} firstOption={"Student"} errors={errors.student_id} value={values.student_id} label="Student Name" name="student_id" onChange={(e:any)=>{ setFieldValue("student_id",e.target.value)}}  />
         <DateField className="col-span-4" touched={touched.date_from} errors={errors.date_from}  min={format(new Date(), "yyyy-MM-dd")} value={values.date_from} label="From" name="date_from" onChange={handleChange}/>
         <DateField className="col-span-4" touched={touched.date_to} errors={errors.date_to}  min={format(new Date(values.date_from), "yyyy-MM-dd")} value={values.date_to} label="To" name="date_to" onChange={handleChange}/>
         {/* <DateField className="col-span-4" touched={touched.return_date} errors={errors.return_date} value={values.return_date} label="Return Date" name="return_date" onChange={handleChange}/> */}
          </div>
          </div>
          <div className="mx-4 ">
                    {/* <button type="submit" className="btn-outline-success w-full">{formValues._id == "" ? "Add" : "Update"}</button> */}
                    <button type="submit" className="btn-outline-success w-full">Issue</button>
                    <button type="button" onClick={()=>{
                     
                    }} className="btn-outline-success w-full">Alert</button>
                  </div>
          </Form>
        </>}
      </Formik>


    </>
  )
}

export default ToStudents;