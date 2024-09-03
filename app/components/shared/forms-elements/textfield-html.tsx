 
import React, { FC } from 'react'
interface TextFieldProps {
  disabled?:string | boolean,
  className?:string,
  touched?: boolean | undefined,
  errors?: string | any | undefined,
  value: string,
  label?: string,
  placeholder?:string,
  name: string,
  onChange: any
}

const TextField: FC<TextFieldProps> = ({className, touched, errors, value, label,placeholder , name,disabled,  onChange }) => {

  return (
    <div className={`${className}`}>
      {/* <label htmlFor={name} className="c-form-label">{label}</label> */}
      <input
        id={name}
        value={value}
        type="text"
        name={name}
        className={`${touched && errors ? " c-input-error" : " c-input"}`}
        placeholder={placeholder ||`Enter ${label}`}
        onChange={onChange}
         
      />
  {/* <div className='flex h-6'> <ErrorMessage component={'p'} name={name} className=" c-text-error" /> </div>  */}
    </div>
  )
}

export default TextField;