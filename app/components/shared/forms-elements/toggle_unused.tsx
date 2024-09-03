import { Field, ErrorMessage ,} from 'formik';
import React, { FC } from 'react'
import CheckBoxIcon from '../Icons/checkbox';
import CheckBoxCheckedIcon from '../Icons/checkboxchecked';
 

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

const ToggleField: FC<CheckBoxFieldProps> = ({className, touched, errors, value, label, placeholder, options, name, onOptionClick }) => {

  return (
    <div className={`${className}`}>
      <label htmlFor={name} className=" c-form-label">{label}</label>
      <div className="flex gap-3 flex-wrap justify-between">
        {options.map((option, index) =>  
          <label htmlFor={option} className={`relative inline-flex items-center mb-5 cursor-pointer`} key={index} >           
              <Field as="input"
                id={option}
                value={option}
                type="checkbox"
                name={name}
                className="sr-only peer"             
                onChange={(e:any)=>{
                  value.find(x=>x==e.target.value) ? onOptionClick([...value.filter(x=>x!=e.target.value)]) : onOptionClick([...value,e.target.value]); 
                }}
                checked={value[index]==option}
              />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-400 dark:text-gray-500">toggle</span>
            </label>
         
        )}
      </div>
      <div className='flex h-6'> <ErrorMessage component={'p'} name={name} className=" c-text-error" /> </div>
    </div>
  )
}

export default ToggleField;