"use client"
import TextField from "@/app/components/shared/forms-elements/textfield"
import TabBar from "@/app/components/shared/tabs/tabbar"
import Tabcontainer from "@/app/components/shared/tabs/tabcontainer"
import { FieldArray, Form, Formik } from "formik"
import { useState } from "react"
import PlusIcon from "@/app/components/shared/Icons/plus"
import Swall from "@/app/components/shared/utils/swal"
import AllLessonSyllabus from "@/app/components/backend/main/alllessonsyllabus"
import { Lesson, LessonPlanType, lessonPlaninit, LessonPlanvalidationSchema, Syllabus } from "@/app/components/shared/model/lessonplanhelper"
import Breadcrumb from "@/app/components/shared/utils/breadcrumb"
import DateField from "@/app/components/shared/forms-elements/datefield"
import { format } from "date-fns"
import { CreateUpdateLessonPlanApi, UpdateLessonSyllabusApi } from "@/app/components/shared/utils/apis"
import ChipsField from "@/app/components/shared/forms-elements/chipsfield"

const drawerWidth = "w-[750px]"


const Page = () => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [type, settype] = useState("lesson")
  const [openDrawer, setOpenDrawer] = useState(false)
  const [formValuesLessonPlan, setformValuesLessonPlan] = useState<LessonPlanType>(lessonPlaninit);
  const [newData, setNewData] = useState<LessonPlanType>(lessonPlaninit);

  const onSubmitLesson = async (values: any) => {
    console.log(values)
    let data = await CreateUpdateLessonPlanApi(values)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValuesLessonPlan(lessonPlaninit)
    setOpenDrawer(false)
  }

  const onSubmitSyllabus = async (values: any) => {
    let body = { LessonPlan_id: formValuesLessonPlan._id, lesson_id: formValuesLessonPlan.lesson[0]._id, syllabus: values.syllabus }
    let data = await UpdateLessonSyllabusApi(body)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValuesLessonPlan(lessonPlaninit)
    setOpenDrawer(false)
  }

  const reciveDataTobeEdited = (data: LessonPlanType) => {
    if (data.type) { settype(data.type) }
    setformValuesLessonPlan(data)
    setOpenDrawer(true)
  }


  return (
    <>
      <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Lesson</span> Plan</h1>
          {/* <button className="btn-outline-light rounded-full" onClick={() => { setformValuesLessonPlan(lessonPlaninit); setOpenDrawer(true) }}> <PlusIcon />  Add </button> */}
        </div>
        <AllLessonSyllabus newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false) }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
            {type == "lesson" && <>
              <TabBar tabs={["Lesson"]} onOptionClick={() => { }} />
              {openDrawer && <Formik onSubmit={onSubmitLesson} initialValues={formValuesLessonPlan}
                // validationSchema={LessonPlanvalidationSchema}
              >
                {({ values, errors, touched, setFieldValue, handleChange }) => <>
                  <Form>

                    {/* =========GENERAL=========== */}
                    <Tabcontainer show={true} >
                 
                      {formValuesLessonPlan.class_name != undefined && formValuesLessonPlan.section_name != undefined && formValuesLessonPlan.subject_name != undefined &&
                        <Breadcrumb options={[formValuesLessonPlan.class_name, formValuesLessonPlan.section_name, formValuesLessonPlan.subject_name]} />
                        }
                        <div className="mt-5">
                      <FieldArray name="lesson">
                        {({ push, remove, form: { values: { lesson } } }) =>
                          <>
                            {lesson && lesson.length > 0 && lesson.map((les: Lesson, i: number) =>
                              <div key={i} className="grid grid-cols-12 gap-x-2 c-border-b-dark mb-3">
                                <TextField className="col-span-5" touched={Boolean(touched.lesson && touched.lesson[i])} errors={errors.lesson && errors.lesson[i]} value={les.title} label="Lesson  Title" name={`lesson[${i}].title`} onChange={handleChange} />
                                <DateField className="col-span-3" touched={Boolean(touched.lesson && touched.lesson[i])} errors={errors.lesson && errors.lesson[i]} value={les.s_date} label="Start Date" name={`lesson[${i}].s_date`} min={format(new Date(), "yyyy-MM-dd")}
                                  onChange={(e: any) => { handleChange(e); setFieldValue(`lesson[${i}].e_date`, "") }}
                                />
                                <DateField className="col-span-3" touched={Boolean(touched.lesson && touched.lesson[i])} errors={errors.lesson && errors.lesson[i]} value={les.e_date} label="End Date" name={`lesson[${i}].e_date`} onChange={handleChange} min={les.s_date} />
                                <button disabled={i == 0 && lesson.length == 1} className="btn-outline-error  col-span-1  w-12 mt-6" type="button" onClick={() => { remove(i) }}> <PlusIcon className="fill-svg-error rotate-45 p-0" /> </button>
                              </div>
                            )}
                            <button className="btn-outline-success rounded-full" type="button" onClick={() => { push(lessonPlaninit.lesson[0]) }}> <PlusIcon className="fill-svg-success" /> More Lesson</button>
                          </>
                        }
                      </FieldArray>
                      </div>
                    </Tabcontainer>
                    <div className="mx-4 h-16">
                      {/* <button type="submit" className="btn-outline-success w-full">Update</button> */}
                      <button type="submit" className="btn-outline-success w-full">{formValuesLessonPlan._id == "" ? "Add" : "Update"}</button>
                    </div>
                  </Form>
                </>}
              </Formik>}
            </>}
            {type == "syllabus" && <>
              <TabBar tabs={["Syllabus"]} onOptionClick={() => { }} />
              {openDrawer && <Formik onSubmit={onSubmitSyllabus} initialValues={formValuesLessonPlan.lesson[0]}
              >
                {({ values, errors, touched, setFieldValue, handleChange }) => <>
                  <Form>

                    {/* =========GENERAL=========== */}
                    <Tabcontainer show={true} >
          
                      {formValuesLessonPlan.class_name != undefined && formValuesLessonPlan.section_name != undefined && formValuesLessonPlan.subject_name != undefined &&

                        <Breadcrumb options={[formValuesLessonPlan.class_name, formValuesLessonPlan.section_name, formValuesLessonPlan.subject_name]} />
                      }
                      <div className="flex justify-between  mt-3">
                        <span className="capitalize">{formValuesLessonPlan.lesson[0].title}</span>
                        <span className="c-text-success text-sm">
                          ( {format(new Date(formValuesLessonPlan.lesson[0].s_date), "dd-MM-yyyy")} - {format(new Date(formValuesLessonPlan.lesson[0].e_date), "dd-MM-yyyy")} )</span>
                      </div>

                      <FieldArray name="syllabus">
                        {({ push, remove, form: { values: { syllabus } } }) =>
                          <>
                            {syllabus && syllabus.length > 0 && syllabus.map((les: Syllabus, i: number) =>
                              <div key={i} className="grid grid-cols-12 gap-x-2 c-border-b-dark mb-3 mt-5">
                                <ChipsField className="col-span-8" touched={Boolean(touched.syllabus && touched.syllabus[i])} errors={errors.syllabus && errors.syllabus[i]} value={les.title.filter(x=>x!="")} label="Syllabus  Title" name={`syllabus[${i}].title`} onOptionClick={(val) => {
                                   setFieldValue(`syllabus[${i}].title`, val) 
                                   console.log(val)
                                   }} />
                                <div className="col-span-3">
                                <DateField className="col-span-3" touched={Boolean(touched.syllabus && touched.syllabus[i])} errors={errors.syllabus && errors.syllabus[i]} value={les.s_date} label="Start Date" name={`syllabus[${i}].s_date`} min={formValuesLessonPlan.lesson[0].s_date} max={formValuesLessonPlan.lesson[0].e_date}
                                  onChange={(e: any) => { handleChange(e); setFieldValue(`lesson[${i}].e_date`, "") }}
                                />
                                <DateField className="col-span-3" touched={Boolean(touched.syllabus && touched.syllabus[i])} errors={errors.syllabus && errors.syllabus[i]} value={les.e_date} label="End Date" name={`syllabus[${i}].e_date`} onChange={handleChange} min={les.s_date} max={formValuesLessonPlan.lesson[0].e_date} />
                                </div>
                                <button disabled={i == 0 && syllabus.length == 1} className="btn-outline-error  col-span-1  w-12 mt-6" type="button" onClick={() => { remove(i) }}> <PlusIcon className="fill-svg-error rotate-45 p-0" /> </button>
                              </div>
                            )}
                            <button className="btn-outline-success rounded-full" type="button" onClick={() => { push(lessonPlaninit.lesson[0].syllabus[0]) }}> <PlusIcon className="fill-svg-success" /> More Syllabus</button>
                          </>
                        }
                      </FieldArray>
                    </Tabcontainer>
                    <div className="mx-4 h-16">
                      <button type="submit" className="btn-outline-success w-full">{formValuesLessonPlan._id == "" ? "Add" : "Update"}</button>
                    </div>
                  </Form>
                </>}
              </Formik>}
            </>}
            {type == "view-syllabus" && <>
              <TabBar tabs={["Syllabus"]} onOptionClick={() => { }} />
              <Tabcontainer show={true} >
                {openDrawer &&
                  <div>
                    {formValuesLessonPlan.class_name != undefined && formValuesLessonPlan.section_name != undefined && formValuesLessonPlan.subject_name != undefined &&

                      <Breadcrumb options={[formValuesLessonPlan.class_name, formValuesLessonPlan.section_name, formValuesLessonPlan.subject_name]} />
                    }
                    <div className="flex justify-between  mt-3">
                      <span className="capitalize">{formValuesLessonPlan.lesson[0].title}</span>
                      <span className="c-text-success text-sm">
                        ( {format(new Date(formValuesLessonPlan.lesson[0].s_date), "dd-MM-yyyy")} - {format(new Date(formValuesLessonPlan.lesson[0].e_date), "dd-MM-yyyy")} )
                        </span>
                       </div>
                       <table>
                        <thead>
                          <tr><th>Syllabus</th><th>Date</th><th>Status</th><th>Completion Date</th></tr>
                        </thead>
                        <tbody>
                       {formValuesLessonPlan.lesson[0].syllabus.map((slb:Syllabus,i:number)=>
                       <tr key={i}>
                        <td className="text-wrap">
                          {slb.title.map(x=><span key={x} className="mr-2">{x} </span>)}              
                          </td>
                        <td className="text-sm">{format(new Date(slb.s_date), "dd-MM-yyyy")} - {format(new Date(slb.e_date), "dd-MM-yyyy")}</td>
                        <td>{slb.c_date}</td>
                        <td>{slb.status}</td>
                       </tr>   ) }
                       </tbody>
                       </table>



                  </div>

                }
              </Tabcontainer>
            </>}
          </div>
        </div>
      </aside>
    </>
  )
}

export default Page



