"use client"
import { useState } from "react" 
import Swall from "@/app/components/shared/utils/swal" 
import AllEmployeeAttendance from "@/app/components/backend/main/allemployeeattendance"
import { EmployeeAttendanceType, EmployeeAttendanceinitial } from "@/app/components/shared/model/employeehelper"
 
const drawerWidth = "w-[750px]" 
const initialValue = EmployeeAttendanceinitial 
 

const Page = () => {
 
  const [newData, setNewData] = useState<EmployeeAttendanceType>(initialValue);
 
 

 
  const reciveDataTobeEdited = (data: EmployeeAttendanceType) => {
  }
 


  return (
    <>
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 "> 
        <AllEmployeeAttendance newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />
      </div>
   
    </>
  )
}

export default Page
