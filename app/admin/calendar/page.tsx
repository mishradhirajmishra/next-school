
"use client"
import TabBar from "@/app/components/shared/tabs/tabbar"
import Tabcontainer from "@/app/components/shared/tabs/tabcontainer"
import { Form, Formik } from "formik"
import { useState } from "react"
import Swall from "@/app/components/shared/utils/swal"
import TimeOption from "@/app/components/shared/utils/timelist"
import { CreateLeaveApi, DelLeaveApi, UpdateLeaveApi } from "@/app/components/shared/utils/apis"
import Leavecalendar from "@/app/components/backend/masterdata/leavecalendar"
import { LeaveType, Leaveinitial, LeavevalidationSchema } from "@/app/components/shared/model/eventhelper"
import TextField from "@/app/components/shared/forms-elements/textfield"
import SelectField from "@/app/components/shared/forms-elements/select"
import TextAreaField from "@/app/components/shared/forms-elements/textarea"
import DateField from "@/app/components/shared/forms-elements/datefield"
import { addDays, formatDistance, format } from 'date-fns'

const drawerWidth = "w-[750px]"
const validationSchema = LeavevalidationSchema
const initialValue = Leaveinitial
const Page = () => {
  const [type, settype] = useState("new")
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [openDrawer, setOpenDrawer] = useState(false)
  const [activeTab, setActiveTab] = useState(0);
  const [formValues, setformValues] = useState<LeaveType>(initialValue);
  const [newData, setNewData] = useState<LeaveType>(initialValue);
  const deleteEvent = async (_id: string) => {
    let data = await DelLeaveApi(_id)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValues(initialValue)
    setOpenDrawer(false)
  }
  const createEvent = async (tempData: any) => {
    let data = await CreateLeaveApi(tempData)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValues(initialValue)
    setOpenDrawer(false)
  }
  const updateEvent = async (tempData: any) => {
    console.log(tempData)
    let data = await UpdateLeaveApi(tempData)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValues(initialValue)
    setOpenDrawer(false)
  }
 

  const onSubmit = async (values: LeaveType) => {
    if (values._id =="" ) {
      var { e_date: _, _id: _, ...rest } = {...values};
      var tempData: any = [];
      if (values.e_date !== values.date) {
        const diff = formatDistance(new Date(values.e_date), new Date(values.date))
        tempData = Array.from(Array(+diff[0] + 1).keys()).map((x: any, i) => ({ ...rest, date: format(addDays(new Date(rest.date), i), 'dd-MM-yyyy') }))
        createEvent(tempData)
      } else {
        createEvent([{ ...rest }])
      }
    } else {
      
      let { e_date: _, ...rest } = values;
      updateEvent(rest)
    }
  }

  const reciveDataTobeEdited = (data: any) => {
    settype(data.type)
    data.type == "new" ?
     setformValues({ ...formValues, date: data.data, e_date: data.data }) :
      setformValues({ ...data.data, date: format(data.data.date, 'yyyy-MM-dd'), e_date: format(data.data.date, 'yyyy-MM-dd') })
    setOpenDrawer(true)
  }

  return (
    <>
      <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Leave</span>Calendar</h1>
          {/* <button className="btn-outline-light rounded-full" onClick={() => { setOpenDrawer(true); setformValues(initialValue) }}> <PlusIcon />  Add </button> */}
        </div>
        <Leavecalendar newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setformValues(initialValue); setOpenDrawer(false) }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
            <TabBar tabs={["Master Data of Period"]} onOptionClick={(val) => { setActiveTab(val) }} />
            {openDrawer && <Formik onSubmit={onSubmit} initialValues={formValues || initialValue} validationSchema={validationSchema}>
              {({ values, errors, touched, setFieldValue, handleChange }) => <>
                <Form>
                  <Tabcontainer show={activeTab == 0} >
                    <div className="grid grid-cols-3 gap-x-2">
                 
                      <DateField disabled={true}  touched={touched.date} errors={errors.date} value={values.date} label="From" name="date" onChange={handleChange} />
                      <DateField disabled={formValues._id}   touched={touched.e_date} errors={errors.e_date} value={values.e_date} label="To" name="e_date" onChange={handleChange} />
                      <SelectField  firstOption="type" options={["leave", "other"]} touched={touched.type} errors={errors.type} value={values.type} label="type" name="type" onChange={(e: any) => { setFieldValue("type", e.target.value) }} />
                      <TextField className="col-span-3" touched={touched.title} errors={errors.title} value={values.title} label="title" name="title" onChange={handleChange} />
                      <TextAreaField className="col-span-3" touched={touched.description} errors={errors.description} value={values.description} label="description" name="description" onChange={handleChange} />
                    </div>
                  </Tabcontainer>
                  <div className="mx-4 h-16 flex gap-2">
                  {formValues._id != "" && <button onClick={()=>{deleteEvent(formValues._id)}} type="button" className="btn-outline-error w-full">Delete</button>}
                  <button type="submit" className={`btn-outline-success w-full`}>{formValues._id == "" ? "Create" : "Update"}</button>
                   
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

