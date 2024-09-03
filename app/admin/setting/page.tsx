"use client"
import TabBar from "@/app/components/shared/tabs/tabbar"
import Tabcontainer from "@/app/components/shared/tabs/tabcontainer"
import { FieldArray, Form, Formik } from "formik"
import { useState } from "react"
import Swall from "@/app/components/shared/utils/swal"
import { CreateUpdateSettingApi } from "@/app/components/shared/utils/apis" 
import TextField from "@/app/components/shared/forms-elements/textfield"
import { SettingType, Settinginit } from "@/app/components/shared/model/settinghelper"
import NumberField from "@/app/components/shared/forms-elements/numberfield"
import SelectField from "@/app/components/shared/forms-elements/select"
import Setting from "@/app/components/backend/masterdata/setting"
import IMGR from "@/app/components/shared/images/imgr"
import PlusIcon from "@/app/components/shared/Icons/plus"
import RadioField from "@/app/components/shared/forms-elements/radiofield"
const drawerWidth = "w-[750px]"

const Page = () => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [openDrawer, setOpenDrawer] = useState(false)
  const [activeTab, setActiveTab] = useState(0);
  const [formValues, setformValues] = useState<SettingType>(Settinginit);
  const [newData, setNewData] = useState<any>();
  const rule_list=[
    "Must score Min Mark in each subject in Total",
    "Must score Min Mark in each subject in Each Exam",
    "Must score Min Mark in each subject in Grand Total"
  ]
  const salary_rule_list=[
    "Based on Total working day of Month",
    "Based on Total day of Month",
  ]
  const onSubmit = async (values: SettingType) => {  
    let data = await CreateUpdateSettingApi(values)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValues(Settinginit)
    setOpenDrawer(false)
  }
  const reciveDataTobeEdited = (data: SettingType) => {
    setformValues(data)
    setOpenDrawer(true)
  }
  return (
    <>
      <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Set</span>ting</h1>
          {/* <button className="btn-outline-light rounded-full" onClick={() => { setOpenDrawer(true); setformValues(Settinginit) }}> <PlusIcon />  Add </button> */}
        </div>
       <Setting newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />  
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false) }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
            <TabBar tabs={["Setting","Result Setting","Pass Rule","Casual Leave","Salary Calculation"]} onOptionClick={(val) => { setActiveTab(val) }} />
            {openDrawer && <Formik onSubmit={onSubmit} initialValues={formValues || Settinginit} >
              {({ values, errors, touched, setFieldValue, handleChange }) => <>
                <Form>
                  <Tabcontainer show={activeTab == 0} >
                  <div className="grid grid-cols-12 gap-x-2">
                    <TextField className="col-span-9" touched={touched.school_name} errors={errors.school_name} value={values.school_name} label="School Name" name="school_name" onChange={handleChange}/>
                   <div className="c-input  col-span-3 row-span-2 relative">
                      <label  className="c-form-label">School Logo</label>
                      <IMGR  className='p-2'
                          src={values.logo}
                          alt="Profile Image"                    
                          // onClick={() => {
                          //   values._id==""? seAlertData({ showSwall: Math.random(), className: "warn", message: "Image upload allowed while updating student" })
                          //    : setMediaData({ ...mediaData, showMediaPopup: Math.random(), related_student_id: values._id, description: values.name + " profile immage", type: "profile_image" }) }
                          //   }
                        />
                      </div>
                      <SelectField className="col-span-9" options={["2024-2025","2025-2026","2026-2027"]} firstOption={"Running Year"} errors={errors.running_year} value={values.running_year} label="Running Year" name="running_year" onChange={(e:any)=>{setFieldValue("running_year",e.target.value)}}  />

                    <div className="col-span-12 or-divider">Address</div>
         
                      <TextField  className="col-span-6" touched={touched.address?.line_1} errors={errors.address?.line_1} value={values.address.line_1} label="Line 1" name="address.line_1" onChange={handleChange} />

                      <TextField  className="col-span-6" touched={touched.address?.line_2} errors={errors.address?.line_2} value={values.address.line_2} label="Line 2" name="address.line_2" onChange={handleChange} />
                      <TextField className="col-span-3"  touched={touched.address?.city} errors={errors.address?.city} value={values.address.city} label="City" name="address.city" onChange={handleChange} />
                      <TextField className="col-span-3"  touched={touched.address?.state} errors={errors.address?.state} value={values.address.state} label="State" name="address.state" onChange={handleChange} />
                      <TextField className="col-span-3" touched={touched.address?.country} errors={errors.address?.country} value={values.address.country} label="Country" name="address.country" onChange={handleChange} />
                      <NumberField className="col-span-3" touched={touched.address?.pin_no} errors={errors.address?.pin_no} value={values.address.pin_no} label="Pin No" name="address.pin_no" onChange={handleChange} />
                    </div>
                    </Tabcontainer>
                    <Tabcontainer show={activeTab == 1} >
                    <FieldArray name="result">
                      {({ push, remove, form: { values: { result } } }) =>
                        <>
                          {result && result.length > 0 && result.map((res: any, i: number) =>
                            <div key={i} className="grid grid-cols-12 gap-x-2 c-border-b-dark mb-3">
                               <NumberField className="col-span-2" touched={Boolean(touched.result && touched.result[i])} errors={errors.result && errors.result} value={res.percentage_from} label="From % " name={`result[${i}].percentage_from`} onChange={handleChange} />
                               <NumberField className="col-span-2" touched={Boolean(touched.result && touched.result[i])} errors={errors.result && errors.result} value={res.percentage_to} label="To % " name={`result[${i}].percentage_to`} onChange={handleChange} />
                               <TextField className="col-span-3" touched={Boolean(touched.result && touched.result[i])} errors={errors.result && errors.result} value={res.division} label="Division" name={`result[${i}].division`} onChange={handleChange} />
                               <TextField className="col-span-1" touched={Boolean(touched.result && touched.result[i])} errors={errors.result && errors.result} value={res.grade} label="Grade" name={`result[${i}].grade`} onChange={handleChange} />
                               <TextField className="col-span-3" touched={Boolean(touched.result && touched.result[i])} errors={errors.result && errors.result} value={res.remarks} label="Remarks" name={`result[${i}].remarks`} onChange={handleChange} />
                               <button disabled={i == 0 && result.length == 1} className="btn-outline-error  col-span-1  w-12 mt-7" type="button" onClick={() => { remove(i) }}> <PlusIcon className="fill-svg-error rotate-45 p-0" /> </button>
                            </div>

                          )}
                          <button className="btn-outline-success rounded-full" type="button" onClick={() => { push({ percentage_from: "",percentage_to: "",division: "",grade: "",remarks:"" }) }}> <PlusIcon className="fill-svg-success" /> More</button>
                        </>
                      }
                    </FieldArray>

                   </Tabcontainer>
                   <Tabcontainer  show={activeTab == 2} >
                   <RadioField options={rule_list} full_width_option={true} touched={touched.pass_rule} errors={errors.pass_rule} value={values.pass_rule} label="Pass Rule" name="pass_rule" onOptionClick={(val) => { setFieldValue("pass_rule", val) }} />
                    </Tabcontainer>
                    <Tabcontainer  show={activeTab == 3} >
                    <div className="grid grid-cols-3 gap-x-2">
                      <NumberField touched={touched.cl_male} errors={errors.cl_male} value={values.cl_male} name="cl_male" label="Casual Leave For Male" onChange={handleChange}/>
                      <NumberField touched={touched.cl_female} errors={errors.cl_female} value={values.cl_female} name="cl_female" label="Casual Leave For Female" onChange={handleChange}/>
                      <NumberField touched={touched.max_cl_per_month} errors={errors.max_cl_per_month} value={values.max_cl_per_month} label="Max Allowed CL per Month" name="max_cl_per_month" onChange={handleChange}/>
                      </div>
                    </Tabcontainer>
                    <Tabcontainer  show={activeTab == 4} >
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

