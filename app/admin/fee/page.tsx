"use client"
import TabBar from "@/app/components/shared/tabs/tabbar"
import Tabcontainer from "@/app/components/shared/tabs/tabcontainer"
import {  Form, Formik } from "formik"
import {  useEffect, useState } from "react"
import PlusIcon from "@/app/components/shared/Icons/plus"
import Swall from "@/app/components/shared/utils/swal"
import {  CreateUpdateFeeApi, } from "@/app/components/shared/utils/apis"
import { FeeType, Feeinit, FeevalidationSchema } from "@/app/components/shared/model/feehelper"
import TextField from "@/app/components/shared/forms-elements/textfield"
import RadioField from "@/app/components/shared/forms-elements/radiofield"
import monthGroup from "@/app/components/shared/utils/monthGroup"
import SelectField from "@/app/components/shared/forms-elements/select"
import monthlist from "@/app/components/shared/utils/monthlist"
import NumberField from "@/app/components/shared/forms-elements/numberfield"
import AllFee from "@/app/components/backend/masterdata/allfee"
import DateField from "@/app/components/shared/forms-elements/datefield"
import { format } from "path"
import { formatDate } from "date-fns"
import ToggleSingleField from "@/app/components/shared/forms-elements/togglesingle"

const drawerWidth = "w-[750px]" 


const Page = () => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [openDrawer, setOpenDrawer] = useState(false)
  const [activeTab, setActiveTab] = useState(0);
  const [formValues, setformValues] = useState<FeeType>(Feeinit);
  const [newData, setNewData] = useState<FeeType>(Feeinit);
 
 useEffect(()=>{
  var today = new Date();
// var lastDayOfMonth = new Date(today.getFullYear(), 0+1, 0);
// console.log("lastDayOfMonth",formatDate(lastDayOfMonth, 'yyyy-MM-dd'))
 
 },[])
  const onSubmit = async (values: any) => {
    let data = await CreateUpdateFeeApi(values)
    setNewData(data.data)  
    setformValues(Feeinit)
    setOpenDrawer(false)
  }
  const reciveDataTobeEdited = (data: FeeType) => {
    setformValues(data)
    setOpenDrawer(true)
  }
  return (
    <>
     <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Fee Mast</span>er Data</h1>
          <button className="btn-outline-light rounded-full" onClick={() => { setOpenDrawer(true); setformValues(Feeinit) }}> <PlusIcon />  Add </button>
        </div>
        <AllFee newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false) }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
            <TabBar tabs={["Master Data of Fee"]} onOptionClick={(val) => { setActiveTab(val) }} />
            {openDrawer && <Formik onSubmit={onSubmit} initialValues={formValues || Feeinit} validationSchema={FeevalidationSchema} >
              {({ values, errors, touched, setFieldValue, handleChange }) => <>
                <Form>             
                  <Tabcontainer show={activeTab == 0} >       
                  <div className="grid grid-cols-12 gap-x-2">
                   <TextField className="col-span-9" touched={touched.title} errors={errors.title} value={values.title} label="Fee Name" name="title" onChange={handleChange}/>
                   <TextField className="col-span-3" touched={touched.amount} errors={errors.amount} value={values.amount} label="amount" name="amount" onChange={handleChange}/>
                   <SelectField className="col-span-3" options={monthlist.sort((a: any, b: any) => a.order - b.order).map((x:any)=>x.name)} firstOption={"Fee Collecting Month"} errors={errors.collecting_month} value={values.collecting_month} label="Fee Collecting Month" name="collecting_month" onChange={(e:any)=>{
                    setFieldValue("collecting_month",e.target.value)
                    setFieldValue("last_date_of_collection",formatDate(new Date(new Date().getFullYear(), +monthlist.find((x:any)=>x.name==e.target.value).value+1, 0), 'yyyy-MM-dd'))            
  }}  />
                   <DateField className="col-span-3" touched={touched.last_date_of_collection} errors={errors.last_date_of_collection} value={values.last_date_of_collection} label="Last Date Of Collection" name="last_date_of_collection" onChange={handleChange}/>
                   {values.late_fee_applicable=="Yes" &&<>
                   <NumberField     className="col-span-3" touched={touched.late_fee_amount} errors={errors.late_fee_amount} value={values.late_fee_amount} label="Late Fee Amount" name="late_fee_amount" onChange={handleChange}/>
                   <NumberField   className="col-span-3" touched={touched.late_fee_reoccur_days} errors={errors.late_fee_reoccur_days} value={values.late_fee_reoccur_days} label="Late Fee Reoccuring in Days" name="late_fee_reoccur_days"  onChange={handleChange}/>
                   </> }
                   <span className="col-span-12">
                   <ToggleSingleField className="c-form-label"  value={values.discount_applicable=="Yes"?true:false} label="Discount Applicable" name="discount_applicable" onOptionClick={(val: boolean) => {val? setFieldValue("discount_applicable", "Yes"):setFieldValue("discount_applicable", "No"); }} />
                    </span>
                    <span className="col-span-12">
                   <ToggleSingleField  className="c-form-label" value={values.late_fee_applicable=="Yes"?true:false} label="Late Fee Applicable" name="late_fee_applicable" onOptionClick={(val: boolean) => {val? setFieldValue("late_fee_applicable", "Yes"):setFieldValue("late_fee_applicable", "No");  }} />
                    </span>
                    <span className="col-span-12">
                   <ToggleSingleField option={["Active","Inactive"]} className="c-form-label" value={values.status=="Active"?true:false} label="Status" name="status" onOptionClick={(val: boolean) => {val? setFieldValue("status", "Active"):setFieldValue("status", "Inactive");  }} />
                    </span>
                   <span className="col-span-12">
                   <ToggleSingleField  className="c-form-label" value={values.optional=="Yes"?true:false} label="Optional" name="optional" onOptionClick={(val: boolean) => {val? setFieldValue("optional", "Yes"):setFieldValue("optional", "No");  }} />
                    </span>
                    </div>
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

