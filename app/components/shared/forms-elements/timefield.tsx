import { Field ,ErrorMessage } from 'formik';
import React, { FC } from 'react'

interface TimeFieldProps {
  className?:string,
  touched?: boolean | undefined,
  errors?: string | undefined,
  value: string,
  label: string,
  placeholder?:string,
  name: string,
  onChange: any
}

const TimeField: FC<TimeFieldProps> = ({className, touched, errors, value, label,placeholder , name,  onChange }) => {

  return (
    <div className={`${className}`}>
      <label htmlFor={name} className=" c-form-label">{label}</label>
      <Field as="input"
         id={name}
        value={value}
        type="time"
        name={name}
        className={`${touched && errors ? " c-input-error" : " c-input"}`}
        placeholder={placeholder ||`Enter ${label}`}
        onChange={onChange}
      />
  <div className='flex h-6'> <ErrorMessage component={'p'} name={name} className=" c-text-error" /> </div> 
    </div>
  )
}

export default TimeField;