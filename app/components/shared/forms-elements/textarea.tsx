import { Field ,ErrorMessage } from 'formik';
import React, { FC } from 'react'

interface TextAreaFieldProps {
  className?:string,
  touched?: boolean | undefined,
  errors?: string |any| undefined,
  value: string,
  label?: string,
  placeholder?:string,
  name: string,
  rows?:number,
  onChange: any
}

const TextAreaField: FC<TextAreaFieldProps> = ({className, touched, errors, value, label,placeholder , name,rows=4,  onChange }) => {

  return (
    <div className={`${className}`}>
      <label htmlFor={name} className="c-form-label">{label}</label>
      <Field as="textarea"
        id={name}
        value={value}
        type="text"
        rows={rows}   
        name={name}
        className={`${touched && errors ? "c-input-error" : "c-input"}`}
        placeholder={placeholder ||`Enter ${label}`}
        onChange={onChange}
      />
    <div className='flex h-6'> <ErrorMessage component={'p'} name={name} className=" c-text-error" /> </div> 
    </div>
  )
}

export default TextAreaField;