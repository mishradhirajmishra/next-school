 "use client"
import React, { FC,  useEffect,  useState } from 'react'
import Dropdown from '../../shared/forms-elements/dropdown'
import { signOut, useSession } from 'next-auth/react'
import Toggletheme from '../../shared/utils/toggletheme'


interface NavbarProps {
  
}

const Navbar: FC<NavbarProps> = ({  }) => {

  const {data:session}=useSession()
 
  return (
    <header className="flex h-12 w-full c-border-b-light">
    <nav className='flex w-full justify-end items-center px-2'>
      <div className='mr-3'>
      <Toggletheme/>
      </div>
    
    {session && <>
      <Dropdown classNameBtn="no-class" dropdownlist={[{text:"Log Out"}]} onOptionClick={(option: any) => { if(option=="Log Out"){  signOut() } }}/>
    </>}

         </nav>
  </header>
  )
}

export default Navbar;