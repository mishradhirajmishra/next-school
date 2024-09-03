"use client"
import TabBar from "@/app/components/shared/tabs/tabbar"
import Tabcontainer from "@/app/components/shared/tabs/tabcontainer"
import { FieldArray, Form, Formik } from "formik"
import { useState } from "react"
import Swall from "@/app/components/shared/utils/swal"
import { Question, LessonPlanQuestionShare, LessonPlanQuestionShareinit, questioninit } from "@/app/components/shared/model/lessonplanhelper"
import TextAreaField from "@/app/components/shared/forms-elements/textarea-html"
import NumberField from "@/app/components/shared/forms-elements/numberfield"
import PlusIcon from "@/app/components/shared/Icons/plus"
import Breadcrumb from "@/app/components/shared/utils/breadcrumb"
import { UpdateLessonQuestionApi } from "@/app/components/shared/utils/apis"
import AllLessonQuestion from "@/app/components/backend/main/alllessonquestion"
import TextField from "@/app/components/shared/forms-elements/textfield"
import ToggleSingleField from "@/app/components/shared/forms-elements/togglesingle"
import { generateQuestionPaper } from "@/app/components/shared/utils/helperfunction"
const drawerWidth = "w-[750px]"


const Page = () => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [activeTab, setActiveTab] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false)
  const [formValuesLessonQuestion, setformValuesLessonQuestion] = useState<LessonPlanQuestionShare>(LessonPlanQuestionShareinit);
  const [newData, setNewData] = useState<LessonPlanQuestionShare>(LessonPlanQuestionShareinit);

  const onSubmitLessonQuestion = async (values: LessonPlanQuestionShare) => {
    let body = { lesson_plan_id: values.lesson_plan_id, lesson_id: values.lesson._id, question: values.question }
    let data = await UpdateLessonQuestionApi(body)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValuesLessonQuestion(LessonPlanQuestionShareinit)
    setOpenDrawer(false)
  }

  const reciveDataTobeEdited = (data: LessonPlanQuestionShare) => {
     if (data.type) { data.type=="question"? setActiveTab(0):setActiveTab(1)}
    setformValuesLessonQuestion(data)
    setOpenDrawer(true)
  }
  return (
    <>
      <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Lesson</span> Question</h1>
          {/* <button className="btn-outline-light rounded-full" onClick={() => { setformValuesLessonQuestion(LessonPlanQuestionShareinit); setOpenDrawer(true) }}> <PlusIcon />  Add </button> */}
        </div>
        <AllLessonQuestion newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false) }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
           
              <TabBar tabs={["Question","Preview"]} onOptionClick={(val) => { setActiveTab(val) }} />
              {openDrawer &&
               <Formik onSubmit={onSubmitLessonQuestion} initialValues={formValuesLessonQuestion}>
                {({ values, errors, touched, setFieldValue, handleChange }) => <>
                  <Form>
                    <Tabcontainer show={activeTab==0} >
                    {formValuesLessonQuestion.class_name != undefined && formValuesLessonQuestion.section_name != undefined && formValuesLessonQuestion.subject_name != undefined &&
                      <Breadcrumb options={[formValuesLessonQuestion.class_name, formValuesLessonQuestion.section_name, formValuesLessonQuestion.subject_name]} />
                    }
                     <span className="capitalize c-text-success">{formValuesLessonQuestion.lesson.title}</span>
                  
                      <FieldArray name="question" >
                        {({ push, remove, form: { values: { question } } }) =>
                          <>
                            {question && question.length > 0 && question.map((ques: Question, i: number) =>
                              <div key={i} className="grid grid-cols-12 gap-x-2 c-border-b-dark pb-4 pt-6">
                                <TextAreaField rows={2} className="col-span-10 mb-2" touched={Boolean(touched.question && touched.question[i])} errors={errors.question && errors.question[i]} value={ques.title} label="Question" name={`question[${i}].title`} onChange={handleChange} />
                             
                                <div className="col-span-2">
                                  <button disabled={i == 0 && question.length == 1} className="btn-outline-error  w-12 -mt-4 float-end" type="button" onClick={() => { remove(i) }}> <PlusIcon className="fill-svg-error rotate-45 p-0" /> </button>
                                  <NumberField hideError={true} touched={Boolean(touched.question && touched.question[i])} errors={errors.question && errors.question[i]} value={ques.marks} label="marks" name={`question[${i}].marks`} onChange={handleChange} />
                                </div>
                                <div className="col-span-12 ">
                                  {ques.body && ques.body.length ?
                                    <div>
                                      <div className="grid grid-cols-12 gap-x-2">
                                      <div className="col-span-6 c-base-input"> 
                                     <ToggleSingleField id={"abc"+i} option={["table","plain"]} className="c-form-label mt-2" value={question[i].type == "plain" ? false : true} label="Option List Display in" name="type" onOptionClick={(val: boolean) => { val ? setFieldValue(`question[${i}].type`,"table" ) : setFieldValue(`question[${i}].type`,"plain" ); }} />
                                      </div>
                                      <div className="col-span-6 ">
                                       <span className="float-end  col-span-8 c-base-input w-40 flex"><span> Column :</span>
                                        <button className="flex h-6 c-bg-light-xtra  rounded-full mx-2" type="button"
                                          onClick={() => {  setFieldValue(`question[${i}].body`, ques.body.map((x: any) => { return [...x,""] })) }}
                                         >
                                          <PlusIcon className="fill-svg-success" />  
                                        </button>
                                        <button className="flex h-6 c-bg-light-xtra  rounded-full" type="button"
                                          onClick={() => { setFieldValue(`question[${i}].body`, ques.body.map((x: any) => { x.pop(); return x })) }} >
                                          <PlusIcon className="fill-svg-error rotate-45" />
                                        </button>
                                      </span>
                                       </div>
                                      </div>
                                      <table className="w-full">
                                        <tbody >
                                          {ques.body.map((row: any, j: number) =>
                                            <tr key={j}>
                                              {row && row.length && row.map((col: any, k: number) => <td key={j + k} className="p-0">
                                                <TextField hideLabel={true} hideError={true} className="col-span-12 mb-1" touched={Boolean(touched.question && touched.question[i])} errors={errors.question && errors.question[i]} value={col} label="Option" name={`question[${i}].body[${j}][${k}]`} onChange={handleChange} />
                                              </td>)}
                                              <td className="p-0 w-16 pr-1">
                                                <button className="flex ml-1 h-6 c-bg-light-xtra  rounded-full  float-end" type="button"
                                                  onClick={() => { setFieldValue(`question[${i}].body`, ques.body.map((x: any, l: number) => { if (l != j) { return x } }).filter((x: any) => x != undefined)) }}>
                                                  <PlusIcon className="fill-svg-error rotate-45 p-0" />
                                                </button>
                                                {ques.body.length == j + 1 && <button className="flex h-6 c-bg-light-xtra  rounded-full float-end" type="button"
                                                  onClick={() => {
                                               
                                                     setFieldValue(`question[${i}].body[${j + 1}]`, values.question[i].body[j])

                                                      }} >
                                                  <PlusIcon className="fill-svg-success" />
                                                </button>}
                                              </td>
                                            </tr>
                                          )}
                                        </tbody>
                                      </table>
                                    </div> : <></>
                                  }
                                </div>
                              </div>
                            )}

                            <button className="btn-outline-success rounded-full  mt-1" type="button" onClick={() => {
                              push({ ...questioninit, body: new Array(2).fill("opt").map(() => new Array(2).fill("")) })
                            }}> <PlusIcon className="fill-svg-success" /> More Question</button>
                          </>
                        }
                      </FieldArray>
                    </Tabcontainer>
                  { activeTab==0 &&  <div className="mx-4 h-16">
                      <button type="submit" className="btn-outline-success w-full">Update</button>
                      {/* <button type="submit" className="btn-outline-success w-full">{formValuesLessonQuestion. == "" ? "Add" : "Update"}</button> */}
                    </div>}
                  </Form>
                </>}
              </Formik>}
           
             
        
              <Tabcontainer show={activeTab==1} >
                {openDrawer &&
                  <div>
                    {formValuesLessonQuestion.class_name != undefined && formValuesLessonQuestion.section_name != undefined && formValuesLessonQuestion.subject_name != undefined &&
                      <Breadcrumb options={[formValuesLessonQuestion.class_name, formValuesLessonQuestion.section_name, formValuesLessonQuestion.subject_name]} />
                    }
                    <div >
                      <span className="capitalize mt-3 mb-5 c-text-success">{formValuesLessonQuestion.lesson.title}</span>
                      <button className="btn-outline-error " onClick={()=>{generateQuestionPaper(formValuesLessonQuestion)}}>pdf</button>
                      {formValuesLessonQuestion.lesson.question && formValuesLessonQuestion.lesson.question.length ? <>
                        {formValuesLessonQuestion.lesson.question.map((ques: Question, i: number) =>
                          <div key={i} className="mt-5" >
                            <p> <span className="capitalize text-wrap mt-3 mb-5 c-text-success">{i + 1}</span>- {ques.title}</p>
                            <div className="mt-2">
                              {ques.body && 
                                <div>
                                  <table className="w-full">
                                    <tbody >
                                      {ques.body.map((row: any, j: number) =>
                                        <tr key={j} className={`${ques.type=="plain"?"bg-transparent":""}`}>
                                          {row && row.length && row.map((col: any, k: number) => <td key={j + k} className={`${ques.type=="plain"?"":"c-border-dark"} p-0 text-wrap`}>
                                            {col}
                                          </td>)}
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              }
     
                            </div>
                          </div>
                        )}
                      </> : <></>
                      }
                    </div>
                    <div>

                    </div>
                  </div>
                  
                }
              </Tabcontainer>
          
          </div>
        </div>
      </aside>
    </>
  )
}

export default Page



