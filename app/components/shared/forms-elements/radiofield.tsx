 
import { Field, ErrorMessage ,} from 'formik';
import React, { FC } from 'react'
import CheckBoxIcon from '../Icons/checkbox';
import CheckBoxCheckedIcon from '../Icons/checkboxchecked';
 
interface RadioFieldProps { 
  touched: boolean | undefined,
  className?:string,
  errors: string | undefined,
  value: string,
  label: string,
  options: Array<string>
  placeholder?: string,
  name: string,
  full_width_option?: boolean,
  onOptionClick: (option: String) => void  
}

const RadioField: FC<RadioFieldProps> = ({className, touched, errors, value, label, placeholder, options, name,full_width_option=false, onOptionClick }) => {

  return (
    <div className={`${className} block`}>
      <label htmlFor={name} className=" c-form-label">{label} </label>
      <div className="flex gap-3 flex-wrap justify-between ">
        {options.map((option, index) =>
          <label htmlFor={option+name} className={`${value==option?" c-input-success":" c-input"} ${touched && errors ? " c-input-error" : ""} flex justify-between cursor-pointer ${full_width_option? "w-[100%]"  : (options.length==2 || options.length==4)? "w-[49%]" : "w-[32%]"}  `} key={index} >           
              <Field as="input"              
                id={option+name}
                value={option}
                type="checkbox"
                name={name}
                className="hidden"
                placeholder={placeholder || `Enter ${label}`}
                onChange={(e:any)=>{onOptionClick(e.target.value)}}
                checked={value==option}
              />
              <span  className={`${value==option?" c-text-success":""}`} > {option}</span>
              <span className={`${value==option?"block":"hidden"}`}><CheckBoxCheckedIcon /></span>
              <span className={`${value==option?"hidden":"block"}`}><CheckBoxIcon /></span>
            </label>
         
        )}
      </div>
      <div className='flex h-6'> <ErrorMessage component={'p'} name={name} className=" c-text-error" /> </div>
    </div>
  )
}

export default RadioField;