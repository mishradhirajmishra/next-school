"use client"
import TextAreaField from "@/app/components/shared/forms-elements/textarea"
import TextField from "@/app/components/shared/forms-elements/textfield"
import TabBar from "@/app/components/shared/tabs/tabbar"
import Tabcontainer from "@/app/components/shared/tabs/tabcontainer"
import { Form, Formik } from "formik"
import { useState } from "react"
import PlusIcon from "@/app/components/shared/Icons/plus"
import Swall from "@/app/components/shared/utils/swal"
import { CreateUpdateMentinenceApi, CreateUpdateVehicleApi } from "@/app/components/shared/utils/apis"
import DateField from "@/app/components/shared/forms-elements/datefield"
import RadioField from "@/app/components/shared/forms-elements/radiofield"
import AllVehicle from "@/app/components/backend/main/allvehicle"
import { Mentinance, MentinanceInit, Vehicle, VehicleInit } from "@/app/components/shared/model/transporthelper"
import NumberField from "@/app/components/shared/forms-elements/numberfield-html"


const drawerWidth = "w-[750px]"



const Page = () => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [type, setType] = useState("vehicle")
  const [activeTab, setActiveTab] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false)
  const [formValues, setformValues] = useState<Vehicle>(VehicleInit);
  const [newData, setNewData] = useState<Vehicle>(VehicleInit);
  const ruleList = ["Monthly", "Daily", "Per Trip",]

  const onSubmitMentinance = async (values: Mentinance) => {
    let body ={vehicle_id:formValues._id,mentinance:values}
    let data = await CreateUpdateMentinenceApi(body)   
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValues(VehicleInit)
    setOpenDrawer(false)
  }
  const onSubmit = async (values: Vehicle) => {
    let data = await CreateUpdateVehicleApi(values)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValues(VehicleInit)
    setOpenDrawer(false)
  }
  const reciveDataTobeEdited = (type: string, data: Vehicle) => {
    console.log(type)
    setType(type)
    setformValues(data)
    setOpenDrawer(true)
  }
  return (
    <>
      <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Vehi</span>cle</h1>
          <button type="button" className="btn-outline-light rounded-full" onClick={() => { setOpenDrawer(true); setformValues(VehicleInit) }}> <PlusIcon />  Add </button>
        </div>
        <AllVehicle newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false); }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
            {type == "vehicle" && <>
              <TabBar tabs={["General Detail", "Other Detail"]} onOptionClick={(val) => { setActiveTab(val) }} />
              {openDrawer && <Formik onSubmit={onSubmit} initialValues={formValues || VehicleInit} >
                {({ values, errors, touched, setFieldValue, handleChange }) => <>
                  <Form>
                    <Tabcontainer show={activeTab == 0} >
                      <div className="grid grid-cols-12 gap-x-2">
                        <NumberField className="col-span-2" touched={touched.vehicle_no} errors={errors.vehicle_no} value={values.vehicle_no} label="Vehicle No" name="vehicle_no" onChange={handleChange} />
                        <NumberField className="col-span-2" touched={touched.registration_no} errors={errors.registration_no} value={values.registration_no} label="Registration No" name="registration_no" onChange={handleChange} />
                        <NumberField className="col-span-2" touched={touched.seating_capacity} errors={errors.seating_capacity} value={values.seating_capacity} label="Seating Capacity" name="seating_capacity" onChange={handleChange} />
                        <TextField className="col-span-6" touched={touched.nick_name} errors={errors.nick_name} value={values.nick_name} label="Nick Name" name="nick_name" onChange={handleChange} />
                        <TextAreaField rows={2} className="col-span-12" touched={touched.detail} errors={errors.detail} value={values.detail} label="Detail" name="detail" onChange={handleChange} />
                        <DateField className="col-span-4" touched={touched.join_date} errors={errors.join_date} value={values.join_date} label="Join Date" name="join_date" onChange={handleChange} />
                        <DateField className="col-span-4" touched={touched.left_date} errors={errors.left_date} value={values.left_date} label="Left Date" name="left_date" onChange={handleChange} />
                        <RadioField className="col-span-12" options={["Active", "Suspended", "Treminated"]} touched={touched.status} errors={errors.status} value={values.status} label="Status" name="status" onOptionClick={(val) => { setFieldValue("status", val) }} />
                      </div>

                    </Tabcontainer>
                    <Tabcontainer show={activeTab == 1} >
                      <div className="grid grid-cols-12 gap-x-2">
                        <RadioField className="col-span-12" options={["Private", "Contract Basis"]} touched={touched.type} errors={errors.type} value={values.type} label="Type" name="type" onOptionClick={(val) => {
                          setFieldValue("type", val)
                          if (val == "Contract Basis") { setFieldValue("charge", ""); }

                        }
                        } />
                        {values.type == "Contract Basis" && <RadioField className="col-span-12" options={ruleList} touched={touched.vehicle_charge_rule} errors={errors.vehicle_charge_rule} value={values.vehicle_charge_rule} label="Vehicle Charge Rule" name="vehicle_charge_rule" onOptionClick={(val) => { setFieldValue("vehicle_charge_rule", val) }} />}
                        {values.type == "Contract Basis" && <NumberField className="col-span-4" touched={touched.charge} errors={errors.charge} value={values.charge} label={"Vehicle Charge " + values.vehicle_charge_rule} name="charge" onChange={handleChange} />}
                      </div>
                    </Tabcontainer>
                    <div className="mx-4 h-16">
                      <button type="submit" className="btn-outline-success w-full">{formValues._id == "" ? "Add" : "Update"}</button>
                    </div>
                  </Form>
                </>}
              </Formik>}
            </>}
            {type == "mentinence" && <>
              <TabBar tabs={["Mentinence"]} onOptionClick={(val) => { setActiveTab(val) }} />
              {openDrawer && <Formik onSubmit={onSubmitMentinance} initialValues={formValues.mentinance[0] || MentinanceInit} >
                {({ values, errors, touched, setFieldValue, handleChange }) => <>
                  <Form>
                    <Tabcontainer show={true} >
                      <div className="grid grid-cols-12 gap-x-2">
                        <TextField className="col-span-12" touched={touched.name} errors={errors.name} value={values.name} label="name" name="name" onChange={handleChange} />
                        <TextAreaField className="col-span-12" rows={2} touched={touched.comment} errors={errors.comment} value={values.comment} label="comment" name="comment" onChange={handleChange} />
                        <DateField className="col-span-6" touched={touched.date} errors={errors.date} value={values.date} label="date" name="date" onChange={handleChange} />
                        <NumberField className="col-span-6" touched={touched.amount} errors={errors.amount} value={values.amount} label="amount" name="amount" onChange={handleChange} />
                      </div>


                    </Tabcontainer>

                    <div className="mx-4 h-16">
                      <button type="submit" className="btn-outline-success w-full">{formValues._id == "" ? "Add" : "Update"}</button>
                    </div>Care
                  </Form>
                </>}
              </Formik>}
            </>}
          </div>
        </div>
      </aside>
    </>
  )
}

export default Page
