import { Field, ErrorMessage ,} from 'formik';
import React, { FC, useState } from 'react'
import PlusIcon from '../Icons/plus';
 

interface ChipsFieldProps { 
  id?:string,
  className?:string,
  touched: boolean | undefined,
  errors: string| any | undefined,
  value: Array<string>,
  label: string,
  options?: Array<string>
  placeholder?: string,
  name: string,
  onOptionClick: (option: Array<String>) => void  
}

const ChipsField: FC<ChipsFieldProps> = ({id,className, touched, errors, value, label, placeholder, options, name, onOptionClick }) => {
 const [chipVal,setchipVal]=useState("")
 
  const handleKeypress = (e:any) => {     
   if (e.charCode === 13 && e.target.value!="") {
    e.preventDefault();
    value.push(e.target.value)
    onOptionClick([...value])
    setchipVal("")    
  }};

  const handleblur = (e:any) => {
    if (e.target.value!="") {
      e.preventDefault();
      value.push(e.target.value)
      onOptionClick([...value])
      setchipVal("")    
    }};
  return (
    <div className={`${className}`}>
      <label htmlFor={name} className=" c-form-label">{label}</label>
      <div className="flex gap-1 flex-wrap  c-input">
        {value && value.length>0 && value.map((val, index) =>        
          <div key={index+val} className='flex c-chips'>{val} <button type='button' 
          
          onClick={()=>{value=value.filter(x=>val!=x);onOptionClick([...value])}} 
          className='flex ml-1 h-6 c-bg-light-xtra  rounded-full mt-[2px]'>
            <PlusIcon className='fill-white rotate-45'/>
            </button></div> 
        )}
        <Field as="input"    
                value={chipVal}               
                type="text"
                name="newinput"
                className="bg-transparent w-28"
                onKeyPress={handleKeypress}
                onBlur={handleblur}
                onChange={(e:any)=>{
                  setchipVal(e.target.value)
                }}               
                list={id}            
              />
         
  <datalist id={id}>
  {options && options.length && options.map((op,i)=> <option key={i} value={op}/> )}
  
  </datalist>
              
      </div>
      <div className='flex h-6'> <ErrorMessage component={'p'} name={name} className=" c-text-error" /> </div>
    </div>
  )
}

 

export default ChipsField;