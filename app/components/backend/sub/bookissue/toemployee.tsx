"use client"
import DateField from '@/app/components/shared/forms-elements/datefield';
import SelectArryField from '@/app/components/shared/forms-elements/selectArray';
import { BookIssueEmloyeeValidationSchema, BookIssueType, BookType, bookIssueInit } from '@/app/components/shared/model/libraryhelper'
import { CreateUpdateBookIssueApi, GetEmployeeDropdownApi } from '@/app/components/shared/utils/apis';
import { getRunningYear } from '@/app/components/shared/utils/helperfunction';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react'



interface ToEmployeeProp {
  book: BookType,
 onSbmitForm :(option: boolean) => void   
}

const ToEmployee: FC<ToEmployeeProp> = ({ book ,onSbmitForm}) => {
  const [employeeList, setEmployeeList] = useState<any>([]);
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  useEffect(() => { getemployeeList() }, [book])
  const getemployeeList = async () => {
    let data = await GetEmployeeDropdownApi("")
     setEmployeeList(data.data.map((x: any) => { x.value = x._id; x.name=x.name + " ( "+x.role +" )"; return x }));
  }
  const onSubmit = async (values: BookIssueType) => { 
   let data = await CreateUpdateBookIssueApi({...values,running_year:getRunningYear()})
   onSbmitForm(data)
   }
  return (
    <>
         <Formik onSubmit={onSubmit} initialValues={{...bookIssueInit,book_id:book._id}} validationSchema={BookIssueEmloyeeValidationSchema} >
        {({ values, errors, touched, setFieldValue, handleChange }) => <>
          <Form>
            <div className='h-[calc(100vh-225px)]'>
          <div className="grid grid-cols-12 gap-x-2">
    
          <SelectArryField  className="col-span-4" options={employeeList} firstOption={"Employee"} errors={errors.employee_id} value={values.employee_id} label="Employee Name" name="employee_id" onChange={(e:any)=>{ setFieldValue("employee_id",e.target.value)}}  />
         <DateField className="col-span-4" touched={touched.date_from} errors={errors.date_from} min={format(new Date(), "yyyy-MM-dd")} value={values.date_from} label="From" name="date_from" onChange={handleChange}/>
         <DateField className="col-span-4" touched={touched.date_to} errors={errors.date_to} min={format(new Date(values.date_from), "yyyy-MM-dd")} value={values.date_to} label="To" name="date_to" onChange={handleChange}/>
         {/* <DateField className="col-span-4" touched={touched.return_date} errors={errors.return_date} value={values.return_date} label="Return Date" name="return_date" onChange={handleChange}/> */}
          </div>
          </div>
          <div className="mx-4 ">
                    {/* <button type="submit" className="btn-outline-success w-full">{formValues._id == "" ? "Add" : "Update"}</button> */}
                    <button type="submit" className="btn-outline-success w-full">Issue</button>
                  </div>
          </Form>
        </>}
      </Formik>


    </>
  )
}

export default ToEmployee;