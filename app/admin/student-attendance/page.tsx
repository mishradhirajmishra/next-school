"use client"

import { useState } from "react"
import { Studentinitial, StudentvalidationSchema, StudentType } from "../../components/shared/model/studenthelper"
import AllStudentsAttendance from "@/app/components/backend/main/allstudentsattendance"
const initialValue = Studentinitial

const Page = () => {
  const [newData, setNewData] = useState<StudentType>(initialValue);
  const reciveDataTobeEdited = (data: StudentType) => { }
  return (
    <>
      <div className="flex flex-col w-full overflow-y-auto px-10  ">
        {/* <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Students </span> Attendance</h1>
        </div> */}
        <AllStudentsAttendance newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />
      </div>
    </>
  )
}

export default Page
