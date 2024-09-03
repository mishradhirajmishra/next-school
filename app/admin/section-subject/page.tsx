"use client"
import AllSectionSubject from "@/app/components/backend/main/allsectionsubject"



const Page = () => {
  return (
    <>
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Section </span>Subjects</h1>
        </div>
        <AllSectionSubject />
      </div>
 
    </>
  )
}

export default Page

