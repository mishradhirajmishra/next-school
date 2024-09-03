import { Field, ErrorMessage } from 'formik';
import React, { FC } from 'react'

interface TextFieldProps {
  className?: string;
  id?: any;
  value: boolean;
  option?: Array<String>;
  label: string;
  name: string;
  onOptionClick: (option: boolean) => void
}

const ToggleSingleField: FC<TextFieldProps> = ({ className,option=["Yes","No"],id, value, label, name, onOptionClick }) => {
  return (
    <>
    <label htmlFor={id} className='flex justify-between'> 
    <span  className={`${className?className:"c-text-dark"}  cursor-pointer`}>{label}</span>
    <span  className={`relative inline-flex items-center  cursor-pointer`} >
      <Field as="input"
        id={id}
        value={value}
        type="checkbox"
        name={name}
        className="sr-only peer"
        checked={value}
        onChange={(e: any) => { onOptionClick(!value) }}
      />
       <span className={`${!value?"c-text-success":""} mr-5 capitalize`}>{option[1]}</span>
      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div> 
      <span className={`${value?"c-text-success":""} ml-5 capitalize`}>{option[0]}</span>
    </span>
    </label>
    </>
  )
}

export default ToggleSingleField;