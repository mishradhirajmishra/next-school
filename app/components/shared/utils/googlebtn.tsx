import Image from 'next/image';
import React, { FC } from 'react'

interface GooglebtnProps { }
const Googlebtn: FC<GooglebtnProps> = ({ }) => {
  return (
    <button type="button" className="w-full  btn-outline-light p-[5px]">
      <Image src={"/icon/g-icon.svg"} width="16" height="17" alt='google icon'     priority={true} />
      Sign in with Google
    </button>
  )
}

export default Googlebtn;          