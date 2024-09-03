import { Field, ErrorMessage } from 'formik';
import React, { FC } from 'react'

interface EmailFieldProps {
  className?:string,
  touched: boolean | undefined,
  errors: string | undefined,
  value: string,
  label: string,
  placeholder?: string,
  options: Array<string>
  name: string,
  onOptionClick: (option: String) => void   
}

const BtnGroup: FC<EmailFieldProps> = ({className, touched, errors, value, label, placeholder, name, options, onOptionClick }) => {
 return (
  <div className={`${className}`}>
      {/* <label htmlFor={name} className=" c-form-label">{label}</label>
      {options.map((option, index) =>
        <button 
        onClick={() => { onOptionClick(option) }}
         key={index} 
         type="button"
         className={`${touched && errors ? " c-input-error" : " c-input w-auto"}`}
         >
          {option}
        </button>
      )}
      <div className='flex h-6'> <ErrorMessage component={'p'} name={name} className=" c-text-error" /> </div> */}
    </div>
  )
}

export default BtnGroup;
