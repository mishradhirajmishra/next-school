import { Field, ErrorMessage, } from 'formik';
import React, { FC } from 'react'

interface SelectFieldProps {
  hideLabel?:boolean,
  hideError?:boolean,
  disabled?:string | boolean,
  firstOption?: string,
  className?: string,
  touched?: boolean | undefined,
  errors?: string | any | undefined,
  value: string,
  label: string,
  options: Array<string>,
  placeholder?: string,
  name: string,
  onChange: (option:any)=>void
}

const SelectField: FC<SelectFieldProps> = ({ className,hideLabel,hideError,disabled,firstOption, touched, errors, value, label, placeholder, options, name, onChange }) => {

  return (
    <div className={`${className} c-in`}>
     {hideLabel?<></>: <label htmlFor={name} className=" c-form-label">{label}</label>}
      <Field as="select" type="select" name="cars" id={name} value={value}
        className={`${errors ? "c-input-error py-5" : "c-input"} py-[7px]`}
        onChange={(e:any)=>{onChange(e)}}
        disabled={disabled}
      >
        <option value={""} >{`Select ${firstOption}`}</option>
        {options.map((option, index) => <option key={index} value={option} >{option}</option>)}
      </Field>
      {hideError?<></>:<div className='flex h-6'>{touched && errors && <p className="c-text-error"> {errors}</p>}</div>}

    </div>
  )
}

export default SelectField;