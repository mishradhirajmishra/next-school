import React, { FC } from 'react'

interface TextAreaFieldProps {
  list?:Array<string>,
  hideLabel?:boolean,
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

const TextAreaField: FC<TextAreaFieldProps> = ({className, touched, errors,hideLabel=false, value, label,placeholder , name,rows=4,  onChange }) => {

  return (
    <div className={`${className}`}>
      {hideLabel?<></>:<label htmlFor={name} className=" c-form-label">{label}</label>}
      <textarea
       
        id={name}
        value={value}       
        rows={rows}   
        name={name}
        className={`${touched && errors ? "c-input-error" : "c-input"}`}
        placeholder={placeholder ||`Enter ${label}`}
        onChange={onChange}
      />
     </div>
  )
}

export default TextAreaField;