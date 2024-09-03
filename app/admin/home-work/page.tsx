"use client"
import TextAreaField from "@/app/components/shared/forms-elements/textarea"
import TextField from "@/app/components/shared/forms-elements/textfield"
import TabBar from "@/app/components/shared/tabs/tabbar"
import Tabcontainer from "@/app/components/shared/tabs/tabcontainer"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import PlusIcon from "@/app/components/shared/Icons/plus"
import Swall from "@/app/components/shared/utils/swal"
import {  CreateUpdateHomeWorkApi, GetTeacherPeriodAllotedApi } from "@/app/components/shared/utils/apis"
import { PeriodPreviewType, PeriodPreviewinitial} from "@/app/components/shared/model/classhelper"
import { CHWorkType, CHWorkinit, ClassWorkvalidationSchema } from "@/app/components/shared/model/classhomeworkhelper"
import timelist from "@/app/components/shared/utils/timelist"
import { useSession } from "next-auth/react"
import CheckBoxIcon from "@/app/components/shared/Icons/checkbox"
import CheckBoxCheckedIcon from "@/app/components/shared/Icons/checkboxchecked"
import DateField from "@/app/components/shared/forms-elements/datefield"
import RadioField from "@/app/components/shared/forms-elements/radiofield"
import { MediaPopup } from "@/app/components/shared/utils/mediaPopup"
import { MediaType, Mediainit } from "@/app/components/shared/model/mediahelper"
import Image from "next/image"
import { ImageSorce } from "@/app/components/shared/utils/helperfunction"
import DayList from "@/app/components/shared/utils/daylist"
import {addDays, format} from 'date-fns';
import AllHomeWork from "@/app/components/backend/main/allhomework"
import IMGR from "@/app/components/shared/images/imgr"
 
 
const drawerWidth = "w-[750px]"
const initialValue = CHWorkinit
const allTimeoption = timelist
 

const Page = () => {
  const { data: session, status } = useSession()
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [minDate, setMinDate] = useState("")
  const [openDrawer, setOpenDrawer] = useState(false)
  const [formValues, setformValues] = useState<CHWorkType>(initialValue);
  const [periodAlloted, setPeriodAlloted] = useState<Array<PeriodPreviewType>>([PeriodPreviewinitial])
  const [mediaData, setMediaData] = useState<MediaType>(Mediainit)
  const [newData, setNewData] = useState<CHWorkType>(initialValue);

  useEffect(() => { GetTeacherPeriodAlloted() }, [session])
  const GetTeacherPeriodAlloted = async () => {
    let data = await GetTeacherPeriodAllotedApi()
    const newData = data.filter((x: any) => x.teacher == session?.user._id)    
    setPeriodAlloted(newData);
  }




  const onSubmit = async (values: any) => {   
    let data = await CreateUpdateHomeWorkApi(values)   
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValues(initialValue)
    setOpenDrawer(false)
  }

  const handleMedia = (media: any, setFieldValue: any) => {
    setFieldValue("attachment", media.file_name)
  }
  const reciveDataTobeEdited = (data: CHWorkType) => {
  //   periodAlloted.map((x:PeriodPreviewType)=>{
  //     if(x.class_id==data.class_id && x.section_id==data.section_id && x.period_id==data.period_id && x.subject==data.subject){
  //    x.selected=true
  //   }else{x.selected=false}
  // })
    setformValues(data)
    setOpenDrawer(true)
  }
  return (
    <>
      <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Home</span>-Work</h1>
          <button type="button" className="btn-outline-light rounded-full" onClick={() => { setOpenDrawer(true) }}> <PlusIcon />  Add </button>
        </div>
      <AllHomeWork newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} /> 
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false);setMediaData(Mediainit) }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
            <TabBar tabs={["Class Work"]} onOptionClick={(val) => { }} />
            {openDrawer && <Formik onSubmit={onSubmit} initialValues={formValues || initialValue} validationSchema={ClassWorkvalidationSchema}>
              {({ values, errors, touched, setFieldValue, handleChange }) => <>
              <MediaPopup mediaData={mediaData} getMedia={(val) => { handleMedia(val, setFieldValue) }} />
                <Form>
                  <Tabcontainer show={true} >                 
                    {periodAlloted && periodAlloted.length && values._id=="" &&
                    <>
                      <label className=" c-form-label">Select Period</label>
                      <div className="overflow-y-auto h-48 overflow-x-hidden">
                        <table >          
                          <tbody >
                            {periodAlloted.map((pr: PeriodPreviewType,i:number) =>
                              <tr key={i} className={`${pr.selected?"c-text-success c-border-success":""} cursor-pointer`}   onClick={()=>{
                              const dayDffrance =  DayList.find((x:any)=>x.name==pr.day).value -  new Date().getDay()
                               if(dayDffrance <0){
                                setMinDate(format(addDays(new Date(), dayDffrance+7), 'yyyy-MM-dd'))
                                setFieldValue("date",format(addDays(new Date(), dayDffrance+7), 'yyyy-MM-dd'))
                               }else{
                                setMinDate(format(addDays(new Date(), dayDffrance+7), 'yyyy-MM-dd'))
                                setFieldValue("date",format(addDays(new Date(), dayDffrance), 'yyyy-MM-dd'))                                
                               }             
                                setFieldValue("class_id",pr.class_id)
                                setFieldValue("section_id",pr.section_id)
                                setFieldValue("period_id",pr.period_id)
                                setFieldValue("subject",pr.subject)
                                setFieldValue("class_id",pr.class_id)
                                setFieldValue("teacher",pr.teacher)
                                setPeriodAlloted(periodAlloted.map((x:any,j:number)=>{periodAlloted[j].selected=false;periodAlloted[i].selected=true;return x}
                                ))}}>
                                <td>
                                 {pr.selected?<CheckBoxCheckedIcon />:<CheckBoxIcon />}
                                </td>
                                <td >{pr.class}</td>
                                <td >{pr.section}</td>
                                <td>{pr.period}</td>
                                <td>{allTimeoption.find((t: any) => t.value == pr.start_time)?.name} - {allTimeoption.find((t: any) => t.value == pr.end_time)?.name}</td>
                                <td>{pr.day}</td>
                                <td>{pr.subject}</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      </>
                    }
                    <br/>
                    <div className="grid grid-cols-3 gap-x-2">
                      <div className="col-span-2">
                    <DateField disabled={values._id!=""} touched={touched.date} errors={errors.date} step={7} min={minDate} value={values.date} label="date" name="date" onChange={handleChange}/>
                     <TextField touched={touched.title} errors={errors.title} value={values.title} label="title" name="title" onChange={handleChange}/>

                     </div>
                     <div className="c-input col-span-1   relative">
                        <IMGR className='p-2'
                          src={values.attachment}
                          alt="attachment"                      
                          onClick={() => {
                            //@ts-ignore
                           setMediaData({ ...mediaData, showMediaPopup: Math.random(), related_employee_id: session?.user._id, description: values.title + " class work attachment", type: "attachment" }) 
                          }
                            }
                        />
                      </div>
                     </div>
                     <TextAreaField touched={touched.description} errors={errors.description} value={values.description} label="description" name="description" onChange={handleChange}/>
                    <RadioField options={["published", "Draft"]} touched={touched.status} errors={errors.status} value={values.status} label="status" name="status" onOptionClick={(val) => { setFieldValue("status", val) }} />
                  </Tabcontainer>
                  <div className="mx-4 h-16">
                    <button  disabled={formValues._id == "" && !periodAlloted.find((x:any)=>x.selected)}  type="submit" className="btn-outline-success w-full">{formValues._id == "" ? "Add" : "Update"}</button>
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
