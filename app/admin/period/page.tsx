"use client"
import TabBar from "@/app/components/shared/tabs/tabbar"
import Tabcontainer from "@/app/components/shared/tabs/tabcontainer"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import PlusIcon from "@/app/components/shared/Icons/plus"
import { Periodinitial, PeriodType, PeriodvalidationSchema } from "../../components/shared/model/classhelper"
import Swall from "@/app/components/shared/utils/swal"
import SelectArryField from "@/app/components/shared/forms-elements/selectArray"
import { GetEndTimeList } from "@/app/components/shared/utils/helperfunction"
import AllPeriod from "@/app/components/backend/masterdata/allperiod"
import { CreateUpdateAllPeriodMasterApi, GetPeriodoptionApi, GetTimeoptionApi } from "@/app/components/shared/utils/apis"
import { SelectOptionType, SelectOptioninit } from "@/app/components/shared/model/timeoptionhelper"
const drawerWidth = "w-[750px]"

const Page = () => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [openDrawer, setOpenDrawer] = useState(false)
  const [activeTab, setActiveTab] = useState(0);
  const [formValues, setformValues] = useState<PeriodType>(Periodinitial);
  const [allPeriodoption, setallPeriodoption] = useState<Array<SelectOptionType>>([SelectOptioninit])
  const [newData, setNewData] = useState<PeriodType>(Periodinitial);
  const [allTimeoption, setallTimeoption] = useState<Array<SelectOptionType>>([SelectOptioninit])

  useEffect(() => { getTimeoption() }, [])
  const getTimeoption = async () => {
    let data = await GetTimeoptionApi()
    const newData = data.data.filter((x: any) => x.hide == false) 

    setallTimeoption(newData);
  }

  useEffect(() => { getPeriodoption() }, [allPeriodoption.length==0])
  const getPeriodoption = async () => {
    let data = await GetPeriodoptionApi()
    const newData = data.data.filter((x: any) => x.hide == false)
    setallPeriodoption(newData);
  }

  const onSubmit = async (values: any) => {
    // console.log(values)
    let data = await CreateUpdateAllPeriodMasterApi(values)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValues(Periodinitial)
    setOpenDrawer(false)
  }
  const reciveDataTobeEdited = (data: PeriodType) => {
    setformValues({ ...data, start_time_List: allTimeoption, end_time_list: GetEndTimeList(allTimeoption, data.start_time) })
    setOpenDrawer(true)
  }
  return (
    <>
      <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Per</span>iod</h1>
          <button className="btn-outline-light rounded-full" onClick={() => { setOpenDrawer(true);
             setformValues(Periodinitial)
             setformValues({ ...Periodinitial, start_time_List: allTimeoption, end_time_list: GetEndTimeList(allTimeoption, Periodinitial.start_time) }) 
             
             }}> <PlusIcon />  Add </button>
        </div>
        <AllPeriod newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false) }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
            <TabBar tabs={["Master Data of Period"]} onOptionClick={(val) => { setActiveTab(val) }} />
            {openDrawer && <Formik onSubmit={onSubmit} initialValues={formValues} validationSchema={PeriodvalidationSchema}>
              {({ values, errors, touched, setFieldValue, handleChange }) => <>
                <Form>
                  <Tabcontainer show={activeTab == 0} >
                    <div className="grid grid-cols-12 gap-x-2">
                      {allPeriodoption.length > 1 && <SelectArryField options={allPeriodoption} className="col-span-5" errors={errors.name} value={values.name} label="Period  Name" name="name"
                        onChange={(e: any) => { setFieldValue("name", e.target.value) }}
                      />}
                      {values.start_time_List && <SelectArryField className="col-span-3 mt-6" firstOption="Start Time" options={values.start_time_List} hideLabel={true} value={values.start_time} label="Start Time" name="start_time" onChange={(e: any) => {
                        setFieldValue("end_time_list", GetEndTimeList(allTimeoption, e.target.value));
                        setFieldValue("start_time", e.target.value);
                      }} />}
                      {values.end_time_list && <SelectArryField className="col-span-3  mt-6" firstOption="End Time" options={values.end_time_list} hideLabel={true} value={values.end_time} label="End Time" name="end_time" onChange={(e: any) => {
                        setFieldValue("end_time", e.target.value);
                      }} />}  </div>
                  </Tabcontainer>
                  <div className="mx-4 h-16">
                    <button type="submit" className="btn-outline-success w-full">{formValues._id == "" ? "Add" : "Update"}</button>
                  </div>
                </Form>
              </>}
            </Formik>}
          </div>
        </div>
      </aside>
    </>
  )
}

export default Page

