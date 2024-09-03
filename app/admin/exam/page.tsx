"use client"
import TabBar from "@/app/components/shared/tabs/tabbar"
import Tabcontainer from "@/app/components/shared/tabs/tabcontainer"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import PlusIcon from "@/app/components/shared/Icons/plus"
import Swall from "@/app/components/shared/utils/swal"
import { CreateUpdateExamApi, GetAllRoomApi, GetAllSectionSubjectApiForExam, GetLessonQuestionForSubjectApi, GetSyllabuForSectionApi, GetTimeoptionApi, UpdateExamQuestionPaperApi, UpdateExamTimetableApi } from "@/app/components/shared/utils/apis"
import TextField from "@/app/components/shared/forms-elements/textfield"
import ToggleSingleField from "@/app/components/shared/forms-elements/togglesingle"
import { ExamShareType, ExamType, Examinit, ExamvalidationSchema, IncludeInit, IncludeType, TimeTableType, examSeatingInit, timeTableInit } from "@/app/components/shared/model/examhelper"
import { SectionSubjectType, sectionSubjectinit } from "@/app/components/shared/model/feehelper"
import { Expendrow, GetEndTimeList, generateExamPaperPDF, getRunningYear } from "@/app/components/shared/utils/helperfunction"
import AllExam from "@/app/components/backend/main/alltexam"
import DateField from "@/app/components/shared/forms-elements/datefield-html"
import SelectArryField from "@/app/components/shared/forms-elements/selectArray-html"
import { SelectOptionType, SelectOptioninit } from "@/app/components/shared/model/timeoptionhelper"
import TextAreaField from "@/app/components/shared/forms-elements/textarea-html"
import NumberField from "@/app/components/shared/forms-elements/numberfield-html"
import Breadcrumb from "@/app/components/shared/utils/breadcrumb"
import { Lesson, lessoninit, lessonPlaninit, LessonPlanType, Question, questioninit, Syllabus } from "@/app/components/shared/model/lessonplanhelper"
import ExpendIcon from "@/app/components/shared/Icons/expend"
import PdfIcon from "@/app/components/shared/Icons/pdf"
const drawerWidth = "w-[750px]"


const Page = () => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [openDrawer, setOpenDrawer] = useState(false)
  const [type, setType] = useState("exam");
  const [formValues, setformValues] = useState<ExamType>(Examinit);
  const [activeTab, setActiveTab] = useState(0);
  const [exam, setExam] = useState<ExamType>(Examinit);
  const [lessonsSyllabus, setLessonsSyllabus] = useState<Array<LessonPlanType>>([lessonPlaninit]);
  const [lessonsQuestion, setLessonsQuestion] = useState<Array<Lesson>>([lessoninit]);
  const [questionList, setQuestionList] = useState<Array<Question>>([questioninit]);
  const [include, setInclude] = useState<IncludeType>(IncludeInit);
  const [timeTable, setTimeTable] = useState<TimeTableType>(timeTableInit);
  const [newData, setNewData] = useState<ExamType>(Examinit);
  const [sectionWiseSubject, setSectionWiseSubject] = useState<Array<SectionSubjectType>>([sectionSubjectinit])
  const [allTimeoption, setallTimeoption] = useState<Array<SelectOptionType>>([SelectOptioninit])
  const initiateToStart=()=>{
    setExam(Examinit);
    setInclude(IncludeInit);
    setTimeTable(timeTableInit);
    setQuestionList([questioninit]);
    setLessonsQuestion([lessoninit]);
    setformValues(Examinit);
    setLessonsSyllabus([lessonPlaninit])
    setallTimeoption([SelectOptioninit])
  }


  useEffect(() => { getTimeoption() }, [])
  const getTimeoption = async () => {
    let data = await GetTimeoptionApi()
    const newData = data.data.filter((x: any) => x.hide == false)
    setallTimeoption(newData);
  }
 


  useEffect(() => { GetAllSectionSubject() }, [])
  const GetAllSectionSubject = async () => {
    const data = await GetAllSectionSubjectApiForExam();
   
    setSectionWiseSubject(data)
  }

  const onSubmit = async (values: ExamType) => {
    const body = { ...values, status: "Started", running_year: getRunningYear(), include: sectionWiseSubject }
    let data = await CreateUpdateExamApi(body)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    initiateToStart()
    setOpenDrawer(false)
  }


  const reciveDataTobeEdited = (data?: ExamShareType) => {
    if (data && data.type) { setType(data.type) }
    if (data && data.type == "exam" && data.exam != undefined) {
      console.log(data.exam.exam_seating?.length)
      setformValues(data.exam) 
      // exam_seating
    }
    if (data && data.type == "time-table" && data.exam != undefined) {
      if (data.include?.class, data.include?.section) { GetSyllabuForSection(data.include?.class, data.include?.section) }
      setExam(data.exam)
      if (data.include) {
        setInclude(
          { ...data.include, timeTable: data.include.timeTable.map((x: TimeTableType) => { x.start_time_List = allTimeoption; x.end_time_list = GetEndTimeList(allTimeoption, x.start_time); return x }) })
      }
    }
    if (data && data.type == "question-paper" && data.exam != undefined) {
      //  console.log(data)
      if (data.include?.class, data.include?.section) {
        GetLessonQuestionForSubject(data.include?.class, data.include?.section, data.timeTable?.subject_id)
      }
      setExam(data.exam)
      if (data.include) {
        setInclude(
          { ...data.include, timeTable: data.include.timeTable.map((x: TimeTableType) => { x.start_time_List = allTimeoption; x.end_time_list = GetEndTimeList(allTimeoption, x.start_time); return x }) })
      }
      if (data.timeTable) {
        setTimeTable(data.timeTable)
      }
    }
    setOpenDrawer(true)
  }
  const GetLessonQuestionForSubject = async (class_id: string, section_id: string, subject_id: any) => {
    let data = await GetLessonQuestionForSubjectApi(class_id, section_id, subject_id)
    console.log(class_id, section_id, subject_id)
 if(data !=null){
    let questionList: any[] = []
    let lesson = data.lesson.map((x: any) => { x.expend = false; questionList = [...questionList, ...x.question]; return x })
    setQuestionList(questionList);
    setLessonsQuestion(lesson)
 }
  }

  const GetSyllabuForSection = async (class_id: string, section_id: string) => {
    let data = await GetSyllabuForSectionApi(class_id, section_id)
    let newData = data.map((lp: LessonPlanType) => {
      return { subject: lp.subject, lesson: lp.lesson.map((l: Lesson) => { return { _id: l._id, title: l.title, syllabus: l.syllabus.map((s: Syllabus) => s.title.join(" ")).join(" ") } }) }
    })
    setLessonsSyllabus(newData)
  }
  const updateTimetable = async () => {
    const body = { exam_id: exam._id, include_id: include._id, timeTable: include.timeTable }
    let data = await UpdateExamTimetableApi(body)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    initiateToStart()
    setOpenDrawer(false)
  }
  const updateExamQuestion = async () => {
    const body = { exam_id: exam._id, include_id: include._id, timeTable_id: timeTable?._id, question_paper: timeTable.question_paper }
    console.log(body)
    let data = await UpdateExamQuestionPaperApi(body)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    initiateToStart()
    setOpenDrawer(false)
  }
  const calculateTotalMarks=()=>{
    return  timeTable.question_paper.reduce((previousValue: number, currentValue: any) => {
      return previousValue + +currentValue.marks
    }, 0) 
  }

 
  return (
    <>
      <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Ex</span>am</h1>
          <button className="btn-outline-light rounded-full" onClick={() => { setOpenDrawer(true); initiateToStart() }}> <PlusIcon />  Add </button>
        </div>
        <AllExam newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false);initiateToStart() }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          {type == "exam" && <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
           <TabBar tabs={["Exam"]} onOptionClick={(val) => { setActiveTab(val) }} />
            {openDrawer && <Formik onSubmit={onSubmit} initialValues={formValues || Examinit} validationSchema={ExamvalidationSchema}>
              {({ values, errors, touched, setFieldValue, handleChange }) => <>
                <Form>
                  <Tabcontainer show={true} >
                    <TextField touched={touched.title} errors={errors.title} value={values.title} label="Exam Title" name="title" onChange={handleChange} />
                    <ToggleSingleField className="c-form-label" value={values.include_in_marksheet == "Yes" ? true : false} label="Include In Marksheet" name="include_in_marksheet" onOptionClick={(val: boolean) => { val ? setFieldValue("include_in_marksheet", "Yes") : setFieldValue("include_in_marksheet", "No"); }} />
                  </Tabcontainer>
  
                  <div className="mx-4 h-16">
                    <button type="submit" className="btn-outline-success w-full">{formValues._id == "" ? "Add" : "Update"}</button>
                  </div>
                </Form>
              </>}
            </Formik>
            }
          </div>}
          {type == "time-table" && <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
            <TabBar tabs={["Time Table"]} onOptionClick={(val) => {  }} />
            <Tabcontainer show={true} >
              {include.class_name != undefined && include.section_name != undefined &&
                <Breadcrumb options={[include?.class_name, include?.section_name, exam.title]} />}

              {include.timeTable.map((tt: TimeTableType, i: number) =>
                <div className="grid grid-cols-12 gap-x-2 c-border-b-dark mb-3 " key={i}>
                  <span className="or-divider col-span-12">{tt.subject}</span>
                  <DateField className="col-span-2" hideLabel={true} value={tt.date} name="date" onChange={(e: any) => {
                    include.timeTable[i].date = e.target.value
                    setInclude({ ...include, timeTable: include.timeTable });
                  }} />
                  {tt.start_time_List && <SelectArryField className="col-span-4" firstOption="Start Time" options={tt.start_time_List} hideLabel={true} value={tt.start_time} name="start_time" onChange={(e: any) => {
                    include.timeTable[i].start_time = e.target.value;
                    include.timeTable[i].end_time = "";
                    include.timeTable[i].end_time_list = GetEndTimeList(tt.start_time_List, e.target.value)
                    setInclude({ ...include, timeTable: include.timeTable });
                  }} />}
                  {tt.end_time_list && <SelectArryField className="col-span-2" firstOption="End Time" options={tt.end_time_list} hideLabel={true} value={tt.end_time} name="end_time" onChange={(e: any) => {
                    include.timeTable[i].end_time = e.target.value
                    setInclude({ ...include, timeTable: include.timeTable });
                  }} />}
                  <NumberField hideLabel={true} className="col-span-2" value={tt.max_mark}  placeholder="Max Mark " name="max_mark" onChange={(e: any) => {
                    include.timeTable[i].max_mark = e.target.value
                    setInclude({ ...include, timeTable: include.timeTable });
                  }} />
              <NumberField hideLabel={true} className="col-span-2" value={tt.min_mark}  placeholder="Min Mark " name="min_mark" onChange={(e: any) => {
                    include.timeTable[i].min_mark = e.target.value
                    setInclude({ ...include, timeTable: include.timeTable });
                  }} />
                  <TextAreaField hideLabel={true} className="col-span-9 mt-2" value={tt.syllabus} label="syllabus" name="syllabus"
                    placeholder={`Enter Syllabus of ${tt.subject}`}
                    onChange={(e: any) => {
                      include.timeTable[i].syllabus = e.target.value
                      setInclude({ ...include, timeTable: include.timeTable });
                    }} />
                  <div className="c-input col-span-3 relative mt-1">
                    <ul>
                      {lessonsSyllabus && lessonsSyllabus.length && lessonsSyllabus
                        .find(x => x.subject == tt.subject_id)?.lesson
                        .map(x =>
                          <li key={x.title} className="c-input"
                            onClick={() => {
                              include.timeTable[i].syllabus = include.timeTable[i].syllabus + " " + x.syllabus
                              setInclude({ ...include, timeTable: include.timeTable });
                            }}
                          >
                            {x.title}
                          </li>
                        )}
                    </ul>
                  </div>



                </div>
              )}

            </Tabcontainer>
 
            <div className="mx-4 h-16">
              <button type="button" onClick={() => { updateTimetable() }} className="btn-outline-success w-full">Update</button>
            </div>
          </div>
          }
          {type == "question-paper" && <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
            <TabBar tabs={["Question Paper", "Question List"]} onOptionClick={(val) => { setActiveTab(val) }} />
            <Tabcontainer show={activeTab == 0} >
              {include.class_name != undefined && include.section_name != undefined &&
                <Breadcrumb options={[include?.class_name, include?.section_name, exam.title, timeTable.subject]} />}
              <p className="text-right -mt-5"> 
               <span className="c-text-dark">Max Mark: {timeTable.max_mark}</span><br/>
               <span className="c-text-dark">Total Mark: {calculateTotalMarks()}</span>
               </p>
              {questionList.filter(x => timeTable.question_paper.find(y => y._id == x._id)).map((ques: Question, i: number) =>
                <div key={i}>
                  {ques.title != "" ? <div key={i} className="mt-5" >
                    <div className="grid grid-cols-12 gap-1">
                      <div className="col-span-10" >
                        <span className="capitalize c-text-success ">{i + 1}</span>- <span className="text-wrap"> {ques.title}</span>
                      </div>
                      <div className="col-span-2">
                      <button className="btn-outline-light float-end rounded-full p-0" onClick={() => {
                          setTimeTable({ ...timeTable, question_paper: timeTable.question_paper.filter(x => x._id != ques?._id) })
                        }}><PlusIcon className="fill-svg-error rotate-45" /></button>
                        <div className="w-12">
                        <NumberField hideLabel={true} value={timeTable.question_paper.find(y => y._id == ques._id)?.marks} label="marks" name="marks" onChange={(e:any)=>{
                           setTimeTable({ ...timeTable, question_paper: timeTable.question_paper.map(x => { if(x._id == ques?._id){x.marks=e.target.value;return x}else{return x}}) })
                      }}/>
                       </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      {ques.body &&
                        <div>
                          <table className="w-full">
                            <tbody >
                              {ques.body.map((row: any, j: number) =>
                                <tr key={j} className={`${ques.type == "plain" ? "bg-transparent" : ""}`}>
                                  {row && row.length && row.map((col: any, k: number) => <td key={j + k} className={`${ques.type == "plain" ? "" : "c-border-dark"} p-0 text-wrap`}>
                                    {col}
                                  </td>)}
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      }

                    </div>
                  </div> : <>No Question Available</>}
                </div>
              )}

            </Tabcontainer>

            {activeTab == 0 && <div className="mx-4 h-16">
              <button type="button" onClick={() => { updateExamQuestion() }} className="btn-outline-success w-1/2">Update</button>
              <button type="button" onClick={() => {generateExamPaperPDF(include,exam,timeTable,
                questionList.filter(x => timeTable.question_paper.find(y => y._id == x._id)).map((q:Question)=>{
                  //@ts-ignore
                   q.marks=timeTable.question_paper.find(y => y._id == q._id)?.marks;                
                  return q})
                ) }} className="btn-outline-dark w-1/2"><PdfIcon className="fill-svg-dark" /> download</button>
            </div>}
            <Tabcontainer show={activeTab == 1} >
              {include.class_name != undefined && include.section_name != undefined &&
                <Breadcrumb options={[include?.class_name, include?.section_name, exam.title, timeTable.subject]} />}

              <table>

                {lessonsQuestion && lessonsQuestion.length && lessonsQuestion[0].title !="" && lessonsQuestion.map((les: Lesson, ind: number) =>
                  <tbody key={ind}>
                    <tr >
                      <td className='cursor-pointer w-14' onClick={() => {
                        //@ts-ignore
                        setLessonsQuestion(Expendrow(les._id, lessonsQuestion))
                      }}><ExpendIcon className={`${les.expend ? "rotate-90 " : ""} fill-svg-light duration-300 m-auto`} />
                      </td>
                      <td>{les.title}</td>
                    </tr>
                    {les.expend && <tr className='fade-in nested'>
                      <td colSpan={2}>
                        {les.question.map((ques: Question, i: number) =>
                          <div key={i}>
                            {ques.title != "" ? <div key={i} className="mt-5" >
                              <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-11" >
                                  <span className="capitalize c-text-success ">{i + 1}</span>- <span className="text-wrap"> {ques.title}</span>
                                </div>
                                <div className="col-span-1">
                                  <button className="btn-outline-light rounded-full p-0" onClick={() => {
                                    if (timeTable.question_paper.find((x: any) => x._id == ques?._id) == undefined) {
                                      let data = { _id: ques?._id, marks: ques.marks }
                                      //@ts-ignore
                                      setTimeTable({ ...timeTable, question_paper: [...timeTable.question_paper, data] })
                                      seAlertData({ showSwall: Math.random(), className: "success", message: "Added Successfully" })
                                    } else {
                                      seAlertData({ showSwall: Math.random(), className: "warn", message: "Already Added" })
                                    }
                                  }}><PlusIcon /></button>
                                  <span className="c-text-success float-end ">{ques.marks}</span>
                                </div>
                              </div>


                              <div className="mt-2">
                                {ques.body &&
                                  <div>
                                    <table className="w-full">
                                      <tbody >
                                        {ques.body.map((row: any, j: number) =>
                                          <tr key={j} className={`${ques.type == "plain" ? "bg-transparent" : ""}`}>
                                            {row && row.length && row.map((col: any, k: number) => <td key={j + k} className={`${ques.type == "plain" ? "" : "c-border-dark"} p-0 text-wrap`}>
                                              {col}
                                            </td>)}
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                }

                              </div>
                            </div> : <>No Question Available</>}
                          </div>
                        )}

                      </td>

                    </tr>}
                  </tbody>
                )}
              </table>
            </Tabcontainer>
          </div>
          }


        </div>
      </aside>
    </>
  )
}

export default Page

