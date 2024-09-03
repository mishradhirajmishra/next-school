 
import React, { FC } from 'react'

interface SelectFieldProps {
  hideLabel?:boolean,
  hideError?:boolean,
  disabled?: boolean,
  firstOption?: string,
  className?: string,
  touched?: boolean | undefined,
  errors?: string | any | undefined,
  value: string,
  label?: string,
  options: Array<string>,
  placeholder?: string,
  name: string,
  onChange: any
}

const SelectField: FC<SelectFieldProps> = ({ className,hideLabel,hideError,disabled=false,firstOption, touched, errors, value, label, placeholder, options, name, onChange }) => {

  return (
    <div className={`${className} c-in`}>
     {hideLabel?<></>: <label htmlFor={name} className=" c-form-label">{label}</label>}
      <select disabled={disabled}   id={name} value={value}
        className={`${errors ? "c-input-error py-5" : "c-input"} py-[7px]`}
        onChange={onChange}    
      >
        {/* <option value={""} >{`Select ${firstOption}`}</option> */}
        {options.map((option, index) => <option key={index} value={option} >{option}</option>)}
      </select>
      {/* {hideError?<></>:<div className='flex h-6'>{touched && errors && <p className="c-text-error"> {errors}</p>}</div>} */}

    </div>
  )
}

export default SelectField;