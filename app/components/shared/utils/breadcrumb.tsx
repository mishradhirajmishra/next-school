import { Field, ErrorMessage, } from 'formik';
import React, { FC } from 'react'
import CheckBoxIcon from '../Icons/checkbox';
import CheckBoxCheckedIcon from '../Icons/checkboxchecked';
import DoubleArrowRightIcon from '../Icons/doubleArrowRight';


interface BreadcrumbProps {
  options: Array<string>
}

const Breadcrumb: FC<BreadcrumbProps> = ({ options }) => {

  return (

    <div className="flex gap-4">
      {options && options.map((op: string,i:number) => <span className='¸' key={i}>
        <span className={`uppercase c-text-dark ${options.length==i+1 && "c-text-success"}`}>{op}</span>
       {options.length-1 !==i && <DoubleArrowRightIcon   />}
      </span>)}
    </div>

  )
}

export default Breadcrumb;