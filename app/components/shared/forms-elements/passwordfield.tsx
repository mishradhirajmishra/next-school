import { Field, ErrorMessage } from 'formik';
import Image from 'next/image';
import React, { FC, useState } from 'react'
import HideIcon from '../Icons/hide';
import ViewIcon from '../Icons/view';

interface PasswordFieldProps {
  className?:string,
  touched: boolean | undefined,
  errors: string | undefined,
  value: string,
  label: string,
  placeholder?:string,
  name: string, 
  onChange: any
}

const PasswordField: FC<PasswordFieldProps> = ({className, touched, errors, value, label,placeholder, name, onChange }) => {
  const [inputType, setInputType] = useState("password")
  return (
    <div className={`${className} relative`}>
    
      <label htmlFor={name} className=" c-form-label">{label}</label>
      <Field as="input"
        id={name}
        value={value}
        type={inputType}
        name={name}
        className={`${touched && errors ? " c-input-error" : " c-input"}`}
        placeholder={placeholder ||`Enter ${label}`}
        onChange={onChange}
      />
     <div className='flex h-6'> <ErrorMessage component={'p'} name={name} className=" c-text-error" /> </div>
      <button className="absolute  inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
        onClick={() => { inputType == "password" ? setInputType("text") : setInputType("password") }}>
        {inputType == "password" ? <ViewIcon/> :<HideIcon/> }
      </button>
    </div>
  )

}

export default PasswordField;