import { Field ,ErrorMessage } from 'formik';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React, { FC } from 'react'

interface FileFieldProps {
  height?:number,
  width?:number,
  src?:any,
  className?:string,
  touched?: boolean | undefined,
  errors?: string |any| undefined,
  value: string,
  label: string,
  placeholder?:string,
  name: string,
  onChange: any
}

const FileField: FC<FileFieldProps> = ({className,height,width,src, touched, errors, value, label,placeholder , name,  onChange }) => {

  return (
    <div className={`${className}`}>
      <label htmlFor={name} className="c-form-label">
        <Image src={src} height={height} width={width} alt={`${name} image`} priority={true} />
      </label>
      <Field as="input"
       hidden={true}
        id={name}
        value={value}
        type="file"
        name={name}
        className={`${touched && errors ? " c-input-error" : " c-input"}`}
        placeholder={placeholder || `Enter ${label}`}
        onChange={onChange}
      />
  <div className='flex h-6'> <ErrorMessage component={'p'} name={name} className=" c-text-error" /> </div> 
    </div>
  )
}

export default FileField;