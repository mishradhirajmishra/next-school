"use client"
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react'
import LightModeIcon from '../Icons/light-mode';
import DarkModeIcon from '../Icons/dark-mode';

interface TogglethemeProps {

}

const Toggletheme: FC<TogglethemeProps> = ({ }) => {
  const [mode, setamode] = useState("light");
  // useEffect(() => {
  //   window.matchMedia('(prefers-color-scheme: dark)').matches ? document.documentElement.classList.replace("light", "dark") : document.documentElement.classList.replace("dark", "light");
  // }, []);


  const toggleMode = (val: string) => {
    console.log("============",val)
    switch (val) {
      case "dark": document.documentElement.classList.replace("light", "dark"); break;
      case "light": document.documentElement.classList.replace("dark", "light"); break;
      case "normal": window.matchMedia('(prefers-color-scheme: dark)').matches ? document.documentElement.classList.replace("light", "dark") : document.documentElement.classList.replace("dark", "light"); break;
    }
    setamode(val)
  }

  return (

    <div className="inline-flex rounded-md shadow-sm " role="group">
     {mode=="dark"?  <button type="button" className="" onClick={() => { toggleMode("light") }}>
        <LightModeIcon/>
    
      </button>:
      <button type="button" className="" onClick={() => { toggleMode("dark") }}>
     <DarkModeIcon/>
      </button>}
      {/* <button type="button" className="" onClick={() => { toggleMode("normal") }} >
        <Image src={"/icon/system.svg"} height={15} width={15} alt='light icon' priority={true} />
      </button> */}
    </div>

  );
}

export default Toggletheme;