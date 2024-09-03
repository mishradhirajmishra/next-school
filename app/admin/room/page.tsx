"use client"
import TabBar from "@/app/components/shared/tabs/tabbar"
import Tabcontainer from "@/app/components/shared/tabs/tabcontainer"
import { Form, Formik } from "formik"
import { useState } from "react"
import PlusIcon from "@/app/components/shared/Icons/plus"
import Swall from "@/app/components/shared/utils/swal"
import { CreateUpdateRoomApi, CreateUpdateSubjectApi } from "@/app/components/shared/utils/apis"
 
import TextField from "@/app/components/shared/forms-elements/textfield"
import ToggleSingleField from "@/app/components/shared/forms-elements/togglesingle"
import AllRoom from "@/app/components/backend/masterdata/allroom"
import { RoomType, Roominit, RoomvalidationSchema } from "@/app/components/shared/model/roomhelper"
import RadioField from "@/app/components/shared/forms-elements/radiofield"
import NumberField from "@/app/components/shared/forms-elements/numberfield"
const drawerWidth = "w-[750px]"


const Page = () => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [openDrawer, setOpenDrawer] = useState(false)
  const [activeTab, setActiveTab] = useState(0);
  const [formValues, setformValues] = useState<RoomType>(Roominit);
  const [newData, setNewData] = useState<RoomType>(Roominit);

  const onSubmit = async (values: RoomType) => { 
    let data = await CreateUpdateRoomApi(values)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValues(Roominit)
    setOpenDrawer(false)
  }
  const reciveDataTobeEdited = (data: RoomType) => {
    setformValues(data)
    setOpenDrawer(true)
  }
  return (
    <>
      <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Ro</span>om</h1>
          <button className="btn-outline-light rounded-full" onClick={() => { setOpenDrawer(true); setformValues(Roominit) }}> <PlusIcon />  Add </button>
        </div>
        <AllRoom newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false) }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
            <TabBar tabs={["Subject"]} onOptionClick={(val) => { setActiveTab(val) }} />
            {openDrawer && <Formik onSubmit={onSubmit} initialValues={formValues || Roominit} validationSchema={RoomvalidationSchema}>
              {({ values, errors, touched, setFieldValue, handleChange }) => <>
                <Form>
                  <Tabcontainer show={activeTab == 0} >
                    <TextField touched={touched.name} errors={errors.name} value={values.name} label="name" name="name" onChange={handleChange} />
                     <RadioField options={["Class Room","Other"]} touched={touched.type} errors={errors.type} value={values.type} label="Type" name="type" onOptionClick={(val)=>{setFieldValue("type",val)}}  />
                     <NumberField touched={touched.seat_capcity} errors={errors.seat_capcity} value={values.seat_capcity} label="Seat Capcity" name="seat_capcity" onChange={handleChange}/>
                     
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

