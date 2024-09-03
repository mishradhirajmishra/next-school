"use client"
import { useEffect, useState } from "react"
import { Periodinitial,  PeriodType, PeriodvalidationSchema } from "../../components/shared/model/classhelper"
import Swall from "@/app/components/shared/utils/swal" 
import TimeOption from "@/app/components/shared/utils/timelist" 
import { CreateUpdateAllPeriodMasterApi, GetPeriodoptionApi, GetTimeoptionApi } from "@/app/components/shared/utils/apis"
import { SelectOptionType, SelectOptioninit } from "@/app/components/shared/model/timeoptionhelper"
import AllTeacherPeriodAlloted from "@/app/components/backend/masterdata/allteacherperiodalloted"

const drawerWidth = "w-[750px]"
const validationSchema = PeriodvalidationSchema
const initialValue = Periodinitial
const initialPeriodOptionValue = SelectOptioninit

const Page = () => {
  const stimeList = TimeOption.filter((x:any) => x.hide == false)
  const [etimeList,setetimeList] = useState(TimeOption.filter((x:any) => x.hide == false))
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [openDrawer, setOpenDrawer] = useState(false)
  const [activeTab, setActiveTab] = useState(0);
  const [formValues, setformValues] = useState<PeriodType>(initialValue);
  const [allPeriodoption, setallPeriodoption] = useState<Array<SelectOptionType>>([initialPeriodOptionValue])
  const [allTimeoptionStart, setallTimeoptionStart] = useState<Array<SelectOptionType>>([initialPeriodOptionValue])
  const [allTimeoptionEnd, setallTimeoptionEnd] = useState<Array<SelectOptionType>>([initialPeriodOptionValue])
  const [newData, setNewData] = useState<PeriodType>(initialValue);

  useEffect(() => {getPeriodoption()}, [allPeriodoption.length==0])
  const getPeriodoption = async () => {
    let data = await GetPeriodoptionApi()
      const newData = data.data.filter((x: any) => x.hide ==false)    
      setallPeriodoption(newData); 
  }

  useEffect(() => { getTimeoption()}, [allTimeoptionStart.length==0])
  const getTimeoption = async () => {
    let data = await GetTimeoptionApi()
    const newData = data.data.filter((x: any) => x.hide ==false)  
    setallTimeoptionStart(newData); 
     setallTimeoptionEnd(newData); 
  }

  const onSubmit = async (values: any) => {
    let data = await CreateUpdateAllPeriodMasterApi(values)
    setNewData(data.data)  
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValues(initialValue)
    setOpenDrawer(false)
  }
  const reciveDataTobeEdited = (data: PeriodType) => {
    setformValues(data)
    setOpenDrawer(true)
  }
  return (
    <>
     <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">All Period </span> Alloted</h1>
          {/* <button className="btn-outline-light rounded-full" onClick={() => { setOpenDrawer(true); setformValues(initialValue) }}> <PlusIcon />  Add </button> */}
        </div>
        <AllTeacherPeriodAlloted />
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false) }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}>             
          </div>
        </div>
      </aside>
    </>
  )
}

export default Page

