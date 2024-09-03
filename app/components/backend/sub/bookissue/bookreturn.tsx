"use client"
import DateField from '@/app/components/shared/forms-elements/datefield';
import { BookIssueType } from '@/app/components/shared/model/libraryhelper'
import { CreateUpdateBookIssueApi } from '@/app/components/shared/utils/apis';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import React, { FC, useState } from 'react'

interface BookReturnProp {
  issue: BookIssueType,
  onSbmitForm: (option: boolean) => void
}

const BookReturn: FC<BookReturnProp> = ({ issue, onSbmitForm }) => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const onSubmit = async (values: BookIssueType) => {
    let body = { _id: values._id, return_date: values.return_date }
    let data = await CreateUpdateBookIssueApi(body)
    onSbmitForm(data)
  }

  return (
    <>
      <Formik onSubmit={onSubmit} initialValues={{ ...issue, return_date: format(new Date(), 'yyyy-MM-dd') }}  >
        {({ values, errors, touched, setFieldValue, handleChange }) => <>
          <Form>
            <div className='h-[calc(100vh-225px)]'>
              <div className="grid grid-cols-12 gap-x-2">
                {issue.student_id != "" ? <>  <div className="col-span-6">
                  <label className=" c-form-label"> Student </label>
                  <div className='c-input'> {issue.student_id?.name}</div>
                </div>
                  <div className="col-span-3">
                    <label className=" c-form-label"> Class </label>
                    <div className='c-input'> {issue.class}</div>
                  </div>
                  <div className="col-span-3">
                    <label className=" c-form-label"> Section </label>
                    <div className='c-input'> {issue.section}</div>
                  </div>
                </> : <>
                  <div className="col-span-9">
                    <label className=" c-form-label"> Employee </label>
                    <div className='c-input'> {issue.employee_id.name}</div>
                  </div>
                  <div className="col-span-3">
                    <label className=" c-form-label"> Role </label>
                    <div className='c-input'> {issue.employee_id.role}</div>
                  </div>
                </>}
                <div className="col-span-3 mt-3">
                  <label className=" c-form-label"> From Date </label>
                  <div className='c-input'> {issue.date_from}</div>
                </div>
                <div className="col-span-3  mt-3">
                  <label className=" c-form-label"> To Date </label>
                  <div className='c-input'> {issue.date_to}</div>
                </div>

                <DateField className="col-span-3  mt-3" touched={touched.return_date} errors={errors.return_date}  value={values.return_date} min={values.date_from} max={format(new Date(), 'yyyy-MM-dd')} label="Return Date" name="return_date" onChange={handleChange} />
              </div>
            </div>
            <div className="mx-4 ">
              <button type="submit" className="btn-outline-success w-full">Return</button>
            </div>
          </Form>
        </>}
      </Formik>


    </>
  )
}

export default BookReturn;