"use client"
import { Field, ErrorMessage, } from 'formik';
import React, { FC, useState } from 'react'
interface OptionList { status?: boolean; name: string; value: string;}
interface SelectArryFieldProps {
  hideLabel?:boolean,
  hideError?:boolean,
  disabled?:string | boolean,
  firstOption?: string,
  className?: string,
  errors?: string | any | undefined,
  value?: string,
  label?: string,
  options: Array<OptionList>,
  placeholder?: string,
  name: string,
  onChange: any
}

const SelectArryField: FC<SelectArryFieldProps> = ({ className,hideError=false,hideLabel=false,disabled,firstOption,  errors, value, label, placeholder, options, name, onChange }) => {
    const [touched,settouched]=useState(false)
  return (
    <div className={`${className} c-in`}>
      {hideLabel?<></>:<label htmlFor={name} className=" c-form-label">{label}</label>}
      <select  name="cars" id={name} value={value}
        className={`${touched && errors ? "c-input-error py-5" : "c-input"} py-[7px]`}
        onChange={onChange}
        onBlur={() => {settouched(true)}}        
      >
         <option value={""} >{`Select ${firstOption}`}</option>
        {options.map((option, index) => <option key={index} disabled={option.status} value={option.value} >{option.name}</option>)}
      </select>
 
    </div>
  )
}

export default SelectArryField;