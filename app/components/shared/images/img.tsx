import { Field, ErrorMessage ,} from 'formik';
import React, { FC } from 'react'
import CheckBoxIcon from '../Icons/checkbox';
import CheckBoxCheckedIcon from '../Icons/checkboxchecked';
import Image from 'next/image';
import { ImageSorce } from '../utils/helperfunction';
 

interface IMGProps { 
  src: string,
  className?: string,
  alt?: string,
  height:number,
  width:number,
  onClick?: any  
}

const IMG: FC<IMGProps> = ({className,src,alt="image",height,width,onClick }) => {

  return (
    <Image className={`${className} object-contain`}
    src={ImageSorce(src)}
    alt={alt}
    height={height}
    width={width}
    priority={true}                
    onClick={onClick}
  />
  )
}

export default IMG;