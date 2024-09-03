"use client"
import TextAreaField from "@/app/components/shared/forms-elements/textarea"
import TextField from "@/app/components/shared/forms-elements/textfield"
import TabBar from "@/app/components/shared/tabs/tabbar"
import Tabcontainer from "@/app/components/shared/tabs/tabcontainer"
import { FieldArray, Form, Formik } from "formik"
import { useState } from "react"
import PlusIcon from "@/app/components/shared/Icons/plus"
import Swall from "@/app/components/shared/utils/swal"
import { CreateUpdateMentinenceApi, CreateUpdateRouteApi } from "@/app/components/shared/utils/apis"
 
import { Mentinance,  Route, RouteInit,  } from "@/app/components/shared/model/transporthelper"
import NumberField from "@/app/components/shared/forms-elements/numberfield-html"
import AllRoute from "@/app/components/backend/main/allroute"


const drawerWidth = "w-[750px]"



const Page = () => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
 
  const [activeTab, setActiveTab] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false)
  const [formValues, setformValues] = useState<Route>(RouteInit);
  const [newData, setNewData] = useState<Route>(RouteInit);


  const onSubmitMentinance = async (values: Mentinance) => {
    let body ={vehicle_id:formValues._id,mentinance:values}
    let data = await CreateUpdateMentinenceApi(body)   
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValues(RouteInit)
    setOpenDrawer(false)
  }
  const onSubmit = async (values: Route) => {
    let data = await CreateUpdateRouteApi(values)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValues(RouteInit)
    setOpenDrawer(false)
  }
  const reciveDataTobeEdited = (data: Route) => { 
    setformValues(data)
    setOpenDrawer(true)
  }
  return (
    <>
      <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Rou</span>te</h1>
          <button type="button" className="btn-outline-light rounded-full" onClick={() => { setOpenDrawer(true); setformValues(RouteInit) }}> <PlusIcon />  Add </button>
        </div>
        <AllRoute newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false); }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
 
              <TabBar tabs={["General Detail", "Stoppage"]} onOptionClick={(val) => { setActiveTab(val) }} />
              {openDrawer && <Formik onSubmit={onSubmit} initialValues={formValues || RouteInit} >
                {({ values, errors, touched, setFieldValue, handleChange }) => <>
                  <Form>
                    <Tabcontainer show={activeTab == 0} >
                      <div className="grid grid-cols-12 gap-x-2">
                        
                   <TextField className="col-span-6" touched={touched.name} errors={errors.name} value={values.name} label="Route Name" name="name" onChange={handleChange} />
                        <TextAreaField rows={2} className="col-span-12" touched={touched.description} errors={errors.description} value={values.description} label="Description" name="description" onChange={handleChange} />
             </div>

                    </Tabcontainer>
                    <Tabcontainer show={activeTab == 1} >
                      <div className="">
                      <FieldArray name="stopage">
                      {({ push, remove, form: { values: { stopage } } }) =>
                        <>
                          {stopage && stopage.length > 0 && stopage.map((person: any, i: number) =>
                            <div key={i} className="grid grid-cols-12 gap-x-2 c-border-b-dark mb-3">
                              <TextField className="col-span-4" touched={Boolean(touched.stopage && touched.stopage[i])} errors={errors.stopage && errors.stopage[i]} value={person.name} label="Name" name={`stopage[${i}].name`} onChange={handleChange} />
                              <TextField className="col-span-8" touched={Boolean(touched.stopage && touched.stopage[i])} errors={errors.stopage && errors.stopage[i]} value={person.comment} label="Comment" name={`stopage[${i}].comment`} onChange={handleChange} />
                              <NumberField className="col-span-3" touched={Boolean(touched.stopage && touched.stopage[i])} errors={errors.stopage && errors.stopage[i]} value={person.longitude} label="Longitude" name={`stopage[${i}].longitude`} onChange={handleChange} />
                              <NumberField className="col-span-3" touched={Boolean(touched.stopage && touched.stopage[i])} errors={errors.stopage && errors.stopage[i]} value={person.latitude} label="Latitude" name={`stopage[${i}].latitude`} onChange={handleChange} />
                             
                              <TextField className="col-span-3" touched={Boolean(touched.stopage && touched.stopage[i])} errors={errors.stopage && errors.stopage[i]} value={person.distance_in_km} label="Distance (in Km)" name={`stopage[${i}].distance_in_km`} onChange={handleChange} />
                              <TextField className="col-span-2" touched={Boolean(touched.stopage && touched.stopage[i])} errors={errors.stopage && errors.stopage[i]} value={person.stop_no} label="Stop No" name={`stopage[${i}].stop_no`} onChange={handleChange} />
 
                             
                             <button disabled={i == 0 && stopage.length == 1} className="btn-outline-error  col-span-1  w-12 mt-6" type="button" onClick={() => { remove(i) }}> <PlusIcon className="fill-svg-error rotate-45 p-0" /> </button>

                            </div>

                          )}
                          <button className="btn-outline-success rounded-full" type="button" onClick={() => { push({ name: "", relation: "", mobile: "", }) }}> <PlusIcon className="fill-svg-success" /> More Stopage</button>
                        </>
                      }
                    </FieldArray>
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
