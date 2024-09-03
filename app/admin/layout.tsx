"use client" 
import { useEffect, useState } from "react";
import Sidebar from "../components/backend/dashboard/main-sidebar";
import Navbar from "../components/backend/dashboard/navbar"; 
import { useSession } from "next-auth/react";

export default function Layout({ children, }: { children: React.ReactNode }) { 
  const [open, setOpen] = useState(true)

  return (
    <AuthGaurd>
    <div className='flex min-h-screen overflow-x-hidden'>
      <Sidebar onOptionClick={(val)=>{setOpen(val)}}/>
      <div className="flex flex-col w-full">
       <Navbar/>
      <main className={`${open?"w-[calc(100vw-288px)]":"w-[calc(100vw-64px)]"} h-[calc(100vh-48px)] flex `}>   
        {children}   
      </main>
      </div>
    </div>
    </AuthGaurd>
  )
}

const AuthGaurd= ({ children, }: { children: React.ReactNode })=> {
  // const { data: session, status } = useSession()
  // useEffect(()=>{
  //   setTimeout(()=>{
  //     console.log("=========",session,status)
  //   },6000)
  // },[])
  // if (status === "authenticated") {
  //   location.replace('/login')
  // }
  
  // const session= await getServerSession(authOptions);
  // if(session==null){
  //   redirect('/login')
  //  }else{
  //   redirect('/admin/admin-dashboard')
  // }

  return <>{children}</>
}