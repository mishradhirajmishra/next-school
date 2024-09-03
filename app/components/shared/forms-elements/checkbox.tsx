import { Field, ErrorMessage ,} from 'formik';
import React, { FC } from 'react'
import CheckBoxIcon from '../Icons/checkbox';
import CheckBoxCheckedIcon from '../Icons/checkboxchecked';
import { slugify } from '../utils/helperfunction';
 

interface CheckBoxFieldProps { 
  className?:string,
  touched: boolean | undefined,
  errors: string|Array<string> | undefined,
  value: Array<string>,
  label: string,
  options: Array<string>
  placeholder?: string,
  name: string,
  onOptionClick: (option: Array<String>) => void  
}

const CheckBoxField: FC<CheckBoxFieldProps> = ({className, touched, errors, value, label, placeholder, options, name, onOptionClick }) => {

  return (
    <div className={`${className}`}>
      <label htmlFor={name} className=" c-form-label">{label}</label>
      <div className="flex gap-3 flex-wrap justify-between">
        {options.map((option:string, ind:number) =>  
      <label htmlFor={ slugify(option)} className={`${value.find((x:string)=>x==option)?" c-input-success":" c-input"} ${touched && errors ? " c-input-error" : ""} flex justify-between cursor-pointer w-[49%]`} key={ind} >           
              <Field as="input"
                 id={ slugify(option)}
                value={option}
                type="checkbox"
                name={name}
                className="hidden"
                placeholder={placeholder || `Enter ${label}`}
                onChange={(e:any)=>{
                  value.find(x=>x==e.target.value) ? onOptionClick([...value.filter(x=>x!=e.target.value)]) : onOptionClick([...value,e.target.value]); 
                }}
                checked={value.find((x:string)=>x==option)}
              />
              <span  className={`${value.find((x:string)=>x==option)?"c-text-success":""}`} > {option}  </span>
              <span className={`${value.find((x:string)=>x==option)?"block":"hidden"}`}><CheckBoxCheckedIcon /></span>
              <span className={`${value.find((x:string)=>x==option)?"hidden":"block"}`}><CheckBoxIcon /></span>
            </label>)}
      </div>
      <div className='flex h-6'> <ErrorMessage component={'p'} name={name} className=" c-text-error" /> </div>
    </div>
  )
}

export default CheckBoxField;