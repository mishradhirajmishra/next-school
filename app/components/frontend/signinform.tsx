"use client"
import { Form, Formik } from 'formik'
import React, { FC, useState } from 'react'
import * as yup from 'yup'
import EmailField from '../shared/forms-elements/emailfield'
import PasswordField from '../shared/forms-elements/passwordfield'
import { signIn } from 'next-auth/react'
import Swall from '../shared/utils/swal'

const validationSchema = yup.object({
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required")
})
const initialValue = { email: "admin@gmail.com", password: "123" }
interface SigninProps { }

const Signinform: FC<SigninProps> = ({ }) => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const onSubmit = async (values: any) => {
    const response= await signIn('credentials',{ redirect: false,...values, callbackUrl: '/admin/admin-dashboard' })
     if(response?.error){  
      seAlertData({ showSwall: Math.random(), className: "error", message: "Invalid email or Password" })
     }else{        
      seAlertData({ showSwall: Math.random(), className: "success", message: "Logdin Successfully" })
     location.replace('/admin/admin-dashboard')
   
     }
      
  }

  return (
   <>
      <Swall swallData={alertData} />
       <Formik onSubmit={onSubmit} initialValues={initialValue} validationSchema={validationSchema}>
      {({ values, errors, touched, handleChange }) => <>
        <Form>
          <EmailField touched={touched.email} errors={errors.email} value={values.email} label="Email" name="email" placeholder="Enter Email" onChange={handleChange} />
          <PasswordField touched={touched.password} errors={errors.password} value={values.password} label="password" name="password" placeholder="Enter Password" onChange={handleChange} />
          <button type="submit" className="btn-outline-success w-full">Sign in</button>
        </Form>
      </>}
    </Formik>
   </>


  )
}

export default Signinform;