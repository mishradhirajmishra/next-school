"use client"
import TabBar from "@/app/components/shared/tabs/tabbar"
import Tabcontainer from "@/app/components/shared/tabs/tabcontainer"
import { FieldArray, Form, Formik } from "formik"
import { useState } from "react"
import Swall from "@/app/components/shared/utils/swal"
import { CreateUpdateSettingApi, CreateUpdateTransportSettingApi } from "@/app/components/shared/utils/apis" 
import TextField from "@/app/components/shared/forms-elements/textfield"
import { SettingType, Settinginit } from "@/app/components/shared/model/settinghelper"
import NumberField from "@/app/components/shared/forms-elements/numberfield"
import SelectField from "@/app/components/shared/forms-elements/select"
import Setting from "@/app/components/backend/masterdata/setting"
import IMGR from "@/app/components/shared/images/imgr"
import PlusIcon from "@/app/components/shared/Icons/plus"
import RadioField from "@/app/components/shared/forms-elements/radiofield"
import {   TransportSetting, TransportSettingInit } from "@/app/components/shared/model/transporthelper"
 
import AllTransportSetting from "@/app/components/backend/masterdata/transportsetting"
const drawerWidth = "w-[750px]"

const Page = () => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [openDrawer, setOpenDrawer] = useState(false)
  const [activeTab, setActiveTab] = useState(0);
  const [formValues, setformValues] = useState<TransportSetting>(TransportSettingInit);
  const [newData, setNewData] = useState<any>();
  const ruleList=[
    "Monthly",
    "Daily",
    "Per Trip",
  ]
  const salary_rule_list=[
    "Based on Total working day of Month",
    "Based on Total day of Month",
  ]
  const onSubmit = async (values: TransportSetting) => {  
    let data = await CreateUpdateTransportSettingApi(values)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValues(TransportSettingInit)
    setOpenDrawer(false)
  }
  const reciveDataTobeEdited = (data: TransportSetting) => {
    setformValues(data)
    setOpenDrawer(true)
  }
  return (
    <>
      <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Transport </span>Setting</h1>
          {/* <button className="btn-outline-light rounded-full" onClick={() => { setOpenDrawer(true); setformValues(Settinginit) }}> <PlusIcon />  Add </button> */}
        </div>
       <AllTransportSetting newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />  
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false) }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
            <TabBar tabs={["Vehicle Charge Setting","Driver Charge Setting","Casual Leave","Salary Calculation"]} onOptionClick={(val) => { setActiveTab(val) }} />
            {openDrawer && <Formik onSubmit={onSubmit} initialValues={formValues || Settinginit} >
              {({ values, errors, touched, setFieldValue, handleChange }) => <>
                <Form>


                    <Tabcontainer  show={activeTab == 0} >
                    <div className="grid grid-cols-12 gap-x-2">
                      <RadioField className="col-span-12" options={ruleList} touched={touched.vehicle_charge_rule} errors={errors.vehicle_charge_rule} value={values.vehicle_charge_rule} label="Vehicle Charge Rule" name="vehicle_charge_rule" onOptionClick={(val)=>{setFieldValue("vehicle_charge_rule",val)}}  />
                      <NumberField className="col-span-4" touched={touched.vehicle_charge} errors={errors.vehicle_charge} value={values.vehicle_charge} label={"Vehicle Charge "+ values.vehicle_charge_rule} name="vehicle_charge" onChange={handleChange}/>
                   </div>
                    </Tabcontainer>
                    <Tabcontainer  show={activeTab == 1} >
                    <div className="grid grid-cols-12 gap-x-2">
                      <RadioField className="col-span-12" options={ruleList} touched={touched.driver_salary_rule} errors={errors.driver_salary_rule} value={values.driver_salary_rule} label="Driver Salary  Rule" name="driver_salary_rule" onOptionClick={(val)=>{setFieldValue("driver_salary_rule",val)}}  />
                      <NumberField className="col-span-4" touched={touched.driver_salary} errors={errors.driver_salary} value={values.driver_salary} label={"Driver Salary "+ values.driver_salary_rule} name="driver_salary" onChange={handleChange}/>
                   </div>
                    </Tabcontainer>
                    <Tabcontainer  show={activeTab == 2} >
                    <div className="grid grid-cols-3 gap-x-2">
                      <NumberField touched={touched.cl_male} errors={errors.cl_male} value={values.cl_male} name="cl_male" label="Casual Leave For Male" onChange={handleChange}/>
                      <NumberField touched={touched.cl_female} errors={errors.cl_female} value={values.cl_female} name="cl_female" label="Casual Leave For Female" onChange={handleChange}/>
                      <NumberField touched={touched.max_cl_per_month} errors={errors.max_cl_per_month} value={values.max_cl_per_month} label="Max Allowed CL per Month" name="max_cl_per_month" onChange={handleChange}/>
                      </div>
                    </Tabcontainer>
                    <Tabcontainer  show={activeTab == 3} >
                   <RadioField options={salary_rule_list} full_width_option={true} touched={touched.salary_leave_rule} errors={errors.salary_leave_rule} value={values.salary_leave_rule} label="Salary Calculation Rule For Single day used in leave" name="salary_leave_rule" onOptionClick={(val) => { setFieldValue("salary_leave_rule", val) }} />
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

