 
import React, { FC } from 'react' 
import Image from 'next/image';
 
interface IMGRProps { 
  src: string,
  className?: string,
  alt?: string,
  onClick?: any  
}

const IMGRBLOB: FC<IMGRProps> = ({className,src,alt="image",onClick }) => {

  return (
    <Image className={`${className} object-contain`}
    src={src}
    alt={alt}
    fill
    sizes="100vh"                 
    onClick={onClick}
    priority={true}  
  />
  )
}

export default IMGRBLOB;