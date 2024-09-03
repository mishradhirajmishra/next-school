;
import React, { FC } from 'react'
import Image from 'next/image';
import { ImageSorce } from '../utils/helperfunction';
 

interface IMGRProps { 
  src: string,
  className?: string,
  alt?: string,
  onClick?: any  
}

const IMGR: FC<IMGRProps> = ({className,src,alt="image",onClick }) => {

  return (
    <Image className={`${className} object-contain`}
    src={ImageSorce(src)}
    alt={alt}
    fill
    sizes="100vh"                 
    onClick={onClick}
    priority={true}  
  />
  )
}

export default IMGR;