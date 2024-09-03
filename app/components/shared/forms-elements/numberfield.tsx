import { Field ,ErrorMessage } from 'formik';
import React, { FC } from 'react'

interface NumberFieldProps {
  disabled?:boolean,
  hideLabel?:boolean,
  hideError?:boolean,
  className?:string,
  touched: boolean | undefined,
  errors: string |any| undefined,
  value: any,
  label: string,
  placeholder?:string,
  name: string,
  onChange: any
}

const NumberField: FC<NumberFieldProps> = ({className,hideLabel=false,hideError=false, touched, errors, value, label,placeholder , name,disabled,  onChange }) => {

  return (
    <div className={`${className}`}>
        {hideLabel?<></>:<label htmlFor={name} className=" c-form-label">{label}</label>}
      <Field as="input"
       id={name}      
       disabled={disabled}
        value={value}
        type="number"
        name={name}
        className={`${touched && errors ? " c-input-error" : " c-input"}`}
        placeholder={placeholder ||`Enter ${label}`}
        onChange={(e:any)=>{e.target.value =Math.abs(e.target.value); onChange(e)}}
      />
                  {hideError?<></>:<div className='flex h-6'> <ErrorMessage component={'p'} name={name} className=" c-text-error" /> </div> }

    </div>
  )
}

export default NumberField;