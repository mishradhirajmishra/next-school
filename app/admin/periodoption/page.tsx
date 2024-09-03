import AllPeriodOption from "@/app/components/backend/masterdata/allperiodoption"

const Page = () => {
  return (
 <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Period</span>option</h1>
         </div>
        <AllPeriodOption/>
      </div>
 

  )
}

export default Page

