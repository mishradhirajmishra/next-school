import { Field, ErrorMessage } from 'formik';
import React, { FC } from 'react'

interface DateFieldProps {
  min?: string,
  max?: string,
  step?: number,
  disabled?: string | boolean,
  className?: string,
  touched?: boolean | undefined,
  errors?: string | any | undefined,
  value: string,
  label: string,
  placeholder?: string,
  name: string,
  onChange: any
}

const DateField: FC<DateFieldProps> = ({ className, disabled, touched, errors, value, label, placeholder, name, min, max, step, onChange }) => {

  return (
    <div className={`${className}`}>
      <label htmlFor={name} className=" c-form-label">{label}</label>
      <Field as="input"
        id={name}
        value={value}
        type="date"
        step={step}
        min={min}
        max={max}
        name={name}
        className={`${touched && errors ? " c-input-error" : " c-input"}`}
        placeholder={placeholder || `Enter ${label}`}
        onChange={onChange}
        disabled={disabled}
      />
      <div className='flex h-6'> <ErrorMessage component={'p'} name={name} className=" c-text-error" /> </div>
    </div>
  )
}

export default DateField;