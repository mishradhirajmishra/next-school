import { Field ,ErrorMessage } from 'formik';
import React, { FC } from 'react'

interface NumberFieldProps {
  hideLabel?:boolean,
  disabled?:string | boolean,
  className?:string,
  touched?: boolean | undefined,
  errors?: string | any | undefined,
  value: string | number | undefined,
  label?: string,
  placeholder?:string,
  name: string,
  onChange: any
  onBlur?:any
}

const NumberField: FC<NumberFieldProps> = ({className,hideLabel=false, touched, errors, value, label,placeholder , name,disabled,  onChange ,onBlur}) => {
  return (
    <div className={`${className}`}>
    {hideLabel?<></>:<label htmlFor={name} className=" c-form-label">{label}</label>}
      <input
       id={name}
        value={value}
        type="number"
        name={name}
        className={`${touched && errors ? " c-input-error" : " c-input"}`}
        placeholder={placeholder ||`Enter ${label}`}
        onChange={onChange}       
        onBlur={onBlur}       
      />
     {/* <div className='flex h-6'> <ErrorMessage component={'p'} name={name} className=" c-text-error" /> </div>   */}
    </div>
  )
}

export default NumberField;