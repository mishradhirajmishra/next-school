"use client"

import AllExamMarks from "@/app/components/backend/main/allexammarks"

 


const Page = () => {
 
  return (
    <>
 
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Exam </span> Marks</h1>
         </div>
        <AllExamMarks  />
      </div>
 
    </>
  )
}

export default Page

