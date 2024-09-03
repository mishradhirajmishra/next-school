"use client"
import TextField from "@/app/components/shared/forms-elements/textfield"
import TabBar from "@/app/components/shared/tabs/tabbar"
import Tabcontainer from "@/app/components/shared/tabs/tabcontainer"
import { FieldArray, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import PlusIcon from "@/app/components/shared/Icons/plus"
import { Classinitial, ClassvalidationSchema, ClassType, Section, PeriodType, BasicData, Periodinitial } from "../../components/shared/model/classhelper"
import Swall from "@/app/components/shared/utils/swal"
import SelectArryField from "@/app/components/shared/forms-elements/selectArray"
import AllClass from "@/app/components/backend/main/allclass"
import { CreateUpdateClassOptionApi, CreateUpdateClassPatchApi, CreateUpdateClassPostApi, GetAllPeriodMasterDropDownApi, GetAllRoomApi, GetAllSubjectApi, GetEmployeeDropdownApi, GetClassTeacherAllotedApi, GetPeriodoptionApi, GetTimeoptionApi } from "@/app/components/shared/utils/apis"
import { GetEndTimeList } from "@/app/components/shared/utils/helperfunction"
import { SelectOptionType, SelectOptioninit } from "@/app/components/shared/model/timeoptionhelper"
import SelectField from "@/app/components/shared/forms-elements/select"
import Periodallotmentpreview from "@/app/components/backend/main/periodallotmentpreview"
import Periodheader from "./Periodheader"
import { RoomType, Roominit } from "@/app/components/shared/model/roomhelper"
import Breadcrumb from "@/app/components/shared/utils/breadcrumb"

const drawerWidth = "w-[750px]"
const validationSchema = ClassvalidationSchema

const Page = () => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [class_data, setclass_data] = useState({ _id: "", name: "" })
  const [section_data, setsection_data] = useState({ _id: "", name: "" })
  const [type, settype] = useState("class")
  const [openDrawer, setOpenDrawer] = useState(false)
  const [activeTab, setActiveTab] = useState(0);
  const [formValuesClass, setformValuesClass] = useState<ClassType>(Classinitial);
  const [formValuesPeriod, setformValuesPeriod] = useState<PeriodType>(Periodinitial);
  const [newData, setNewData] = useState<ClassType>(Classinitial);
  const [allPeriodoption, setallPeriodoption] = useState<Array<SelectOptionType>>([SelectOptioninit])
  const [subjectList, setsubjectList] = useState([]);
  const [teacherList, setTeacherList] = useState<any>([]);
  const [roomList, setRoomList] = useState<any>([]);
  const [allTimeoption, setallTimeoption] = useState<Array<SelectOptionType>>([SelectOptioninit])


  useEffect(() => { getTimeoption() }, [])
  const getTimeoption = async () => {
    let data = await GetTimeoptionApi()
    const newData = data.data.filter((x: any) => x.hide == false)
    setallTimeoption(newData);
  }


  useEffect(() => {
    GetClassTeacherAllotedList();
  }, [newData])
  const GetClassTeacherAllotedList = async () => {
    let data = await GetClassTeacherAllotedApi();
    getRoom(data.roomNO)
    getTeacherList(data.classTeacher)
  }

  const getRoom = async (allotedroom: any) => {
    let data = await GetAllRoomApi()
    let newData = data.map((x: any) => { x.value = x.name, x.status = !!allotedroom.find((y: any) => y == x.name); return x })
    setRoomList(newData);
  }


  const getTeacherList = async (allotedClassteacher: String[]) => {
    let data = await GetEmployeeDropdownApi("Teacher")
    setTeacherList(data.data.map((x: any) => { x.value = x._id, x.status = allotedClassteacher.find(y => y == x._id); return x }));
  }

  useEffect(() => { getSubject() }, [newData])
  const getSubject = async () => {
    let data = await GetAllSubjectApi()
    setsubjectList(data.data.map((x: { name: any }) => x.name));
  }

  useEffect(() => { getPeriodList() }, [])
  const getPeriodList = async () => {
    let data = await GetAllPeriodMasterDropDownApi()
    Classinitial.section[0].period = data.data
    setformValuesClass(Classinitial)
  }

  useEffect(() => { getPeriodoption() }, [allPeriodoption.length==0])
  const getPeriodoption = async () => {
    let data = await GetPeriodoptionApi()
    const newData = data.data.filter((x: any) => x.hide == false)
    setallPeriodoption(newData);
  }


  const onSubmitPeriod = async (values: any) => {
    let data = await CreateUpdateClassPatchApi({ class: class_data._id, data: values })
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValuesClass(Classinitial)
    setOpenDrawer(false)
  }

  const onSubmitClass = async (values: any) => {
    let data = await CreateUpdateClassPostApi(values)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValuesClass(Classinitial)
    setOpenDrawer(false)
  }
  const onSubmitPeriodAllotment = async (values: any) => {
    let data = await CreateUpdateClassOptionApi({ class: class_data._id, section: section_data._id, data: values })
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValuesClass(Classinitial)
    setOpenDrawer(false)
  }
  const reciveDataTobeEdited = (data: any, type: string, class_data: BasicData, section_data: BasicData) => {
    settype(type)
    if (type == "allot-period") {
      setTeacherList(teacherList.map((x: any) => { x.value = x._id, x.status = false; return x }));
      setformValuesPeriod(data)
    } else if (type == "manage-period") {
      if(data.period.length==0){
        data.period.push(Classinitial.section[0].period[0])
      }
      // console.log(data.period.length)
      setformValuesClass({ ...data, period: data.period.map((x: any) => { x.start_time_List = allTimeoption; x.end_time_list = GetEndTimeList(allTimeoption, x.start_time); return x }) })
    } else {
      setformValuesClass(data)
    }
    setclass_data(class_data)
    setsection_data(section_data)
    setOpenDrawer(true)
  }


  return (
    <>
      <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Cla</span>ss</h1>
          <button className="btn-outline-light rounded-full" onClick={() => { setformValuesClass(Classinitial); setOpenDrawer(true) }}> <PlusIcon />  Add </button>
        </div>
        <AllClass newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false) }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
            {type == "class" && <>
              <TabBar tabs={["Class & Section"]} onOptionClick={(val) => { setActiveTab(val) }} />
              {openDrawer && <Formik onSubmit={onSubmitClass} initialValues={formValuesClass} validationSchema={ClassvalidationSchema}>
                {({ values, errors, touched, setFieldValue, handleChange }) => <>
                  <Form>
                    {/* =========GENERAL=========== */}
                    <Tabcontainer show={activeTab == 0} >
                      <TextField className="col-span-9" touched={touched.name} errors={errors.name} value={values.name} label="Class Name" name="name" onChange={handleChange} />
                      <div className="or-divider">Section</div>
                      <FieldArray name="section">
                        {({ push, remove, form: { values: { section } } }) =>
                          <>
                            {section && section.length > 0 && section.map((sec: Section, i: number) =>
                              <div key={i} className="grid grid-cols-12 gap-x-2 c-border-b-dark mb-3">
                                <TextField className="col-span-4" touched={Boolean(touched.section && touched.section[i])} errors={errors.section && errors.section[i]} value={sec.name} label="Section  Name" name={`section[${i}].name`} onChange={handleChange} />
                                <SelectArryField options={roomList} firstOption="Room" className="col-span-3" value={sec.room_no} label="Room No" name={`section[${i}].room_no`}
                                  onChange={(e: any) => { setFieldValue(`section[${i}].room_no`, e.target.value) }} />
                                <SelectArryField options={teacherList} firstOption="Teacher" className="col-span-4" errors={errors.section && errors.section[i]} value={sec.class_teacher} label="Class Teacher" name={`section[${i}].class_teacher`} onChange={(e: any) => {
                                  setFieldValue(`section[${i}].class_teacher`, e.target.value)
                                  setTeacherList(teacherList.map((x: any) => { if (x._id == e.target.value) { x.status = true } return x }))
                                }} />

                                <button disabled={i == 0 && section.length == 1} className="btn-outline-error  col-span-1  w-12 mt-6" type="button" onClick={() => { remove(i) }}> <PlusIcon className="fill-svg-error rotate-45 p-0" /> </button>
                              </div>
                            )}
                            <button className="btn-outline-success rounded-full" type="button" onClick={() => { push(Classinitial.section[0]) }}> <PlusIcon className="fill-svg-success" /> More Class</button>
                          </>
                        }
                      </FieldArray>
                    </Tabcontainer>
                    <div className="mx-4 h-16">
                      <button type="submit" className="btn-outline-success w-full">{formValuesClass._id == "" ? "Add" : "Update"}</button>
                    </div>
                  </Form>
                </>}
              </Formik>}
            </>}
            {type == "manage-period" && <>
              <TabBar tabs={[`Period of ${formValuesClass.name}`]} onOptionClick={(val) => { setActiveTab(val) }} />
              {openDrawer && <Formik onSubmit={onSubmitPeriod} initialValues={formValuesClass} validationSchema={validationSchema}>
                {({ values, errors, touched, setFieldValue, handleChange }) => <>
                  <Form>
                    <Tabcontainer show={activeTab == 0} >
                      <FieldArray name="period">
                        {({ push, remove, form: { values: { period } } }) =>
                          <>   {period && period.length > 0 && period.map((per: PeriodType, j: number) =>
                              <div key={j} className="grid grid-cols-12 gap-x-2">
                                {allPeriodoption.length > 1 && <SelectArryField options={allPeriodoption} firstOption="Period" className="col-span-5" value={per.name} label="Period  Name" name={`period[${j}].name`} onChange={(e: any) => { setFieldValue(`period[${j}].name`, e.target.value) }} />}
                                {per.start_time_List && <SelectArryField options={per.start_time_List} firstOption="Start Time" className="col-span-3" value={per.start_time} label="Start Time" name={`period[${j}].start_time`}
                                  onChange={(e: any) => {
                                    setFieldValue(`period[${j}].start_time`, e.target.value)
                                    setFieldValue(`period[${j}].start_time_List`, GetEndTimeList(allTimeoption, e.target.value))
                                  }} />}
                                {per.end_time_list && <SelectArryField options={per.end_time_list} firstOption="End Time" className="col-span-3" value={per.end_time} label="End Time" name={`period[${j}].end_time`} onChange={(e: any) => { setFieldValue(`period[${j}].end_time`, e.target.value) }} />}
                                <button disabled={j == 0 && period.length == 1} className="btn-outline-error  col-span-1 justify-self-end   w-12 mt-6" type="button" onClick={() => { remove(j) }}> <PlusIcon className="fill-svg-error rotate-45 p-0" /> </button>
                              </div>
                            )}
                            <button className="btn-outline-success text-xs py-0 rounded-full" type="button" onClick={() => { push(Classinitial.section[0].period[0]) }}> <PlusIcon className="fill-svg-success" /> More Period</button>

                          </>}
                      </FieldArray>
                    </Tabcontainer>
                    <div className="mx-4 h-16">
                      <button type="submit" className="btn-outline-success w-full">{formValuesClass._id == "" ? "Add" : "Update"}</button>
                    </div>
                  </Form>
                </>}
              </Formik>}
            </>}
            {/* ================ */}
            {type == "allot-period" && <>
              <TabBar tabs={[`All-days wise Period Allotment`, `three-days wise Period Allotment`, `single-days wise Period Allotment`]} onOptionClick={(val) => { setActiveTab(val) }} />
              {openDrawer &&
                <Formik onSubmit={onSubmitPeriodAllotment} initialValues={formValuesPeriod} validationSchema={validationSchema}>
                  {({ values, errors, touched, setFieldValue, handleChange }) => <>
                    <Form>
                      <Tabcontainer show={activeTab == 0} >
                      <Periodheader options={[class_data.name, section_data.name, formValuesPeriod.name]} allTimeoption={allTimeoption} formValuesPeriod={formValuesPeriod}/>
                        <div className="grid grid-cols-4 gap-x-2 c-border-b-dark mb-3">
                          <span className="capitalize c-text-dark  c-input h-10  col-span-1">All-day</span>
                          {subjectList && subjectList.length > 1 && <SelectField hideLabel={true} hideError={true} options={subjectList} firstOption="Subject" touched={touched.monday?.subject} errors={errors.monday?.subject} value={values.monday.subject} label="Subject" name="monday.subject"
                            onChange={(e: any) => {
                              setFieldValue("monday.subject", e.target.value);
                              setFieldValue("tuesday.subject", e.target.value);
                              setFieldValue("wednesday.subject", e.target.value)
                              setFieldValue("thursday.subject", e.target.value)
                              setFieldValue("friday.subject", e.target.value)
                              setFieldValue("saturday.subject", e.target.value)
                            }}
                          />}
                          {/* {JSON.stringify(teacherList)} */}
                          {teacherList && teacherList.length > 1 && <SelectArryField className="col-span-2" hideLabel={true} hideError={true} options={teacherList.filter((teach: any) => teach.intresrted_subject.find((is: any) => is == values.monday.subject))} firstOption="Teacher" errors={errors.monday?.teacher} value={values.monday.teacher} label="Teacher" name="monday.teacher"
                            onChange={(e: any) => {
                              setFieldValue("monday.teacher", e.target.value)
                              setFieldValue("tuesday.teacher", e.target.value)
                              setFieldValue("wednesday.teacher", e.target.value)
                              setFieldValue("thursday.teacher", e.target.value)
                              setFieldValue("friday.teacher", e.target.value)
                              setFieldValue("saturday.teacher", e.target.value)
                            }}
                          />}
                        </div>
                        {values.monday.teacher && activeTab == 0 &&
                          <Periodallotmentpreview start_time={formValuesPeriod.start_time} end_time={formValuesPeriod.end_time} selectedTeacher={[values.monday.teacher].filter((z) => z != "")} teacherList={teacherList} />}
                      </Tabcontainer>

                      <Tabcontainer show={activeTab == 1} >
                      <Periodheader options={[class_data.name, section_data.name, formValuesPeriod.name]} allTimeoption={allTimeoption} formValuesPeriod={formValuesPeriod}/>

                        <div className="grid grid-cols-4 gap-x-2 c-border-b-dark mb-3">
                          <span className="capitalize c-text-dark  c-input h-10  col-span-2"> monday-tuesday-wednesday</span>
                          {subjectList && subjectList.length > 1 && <SelectField hideLabel={true} hideError={true} options={subjectList} firstOption="Subject" touched={touched.monday?.subject} errors={errors.monday?.subject} value={values.monday.subject} label="Subject" name="monday.subject"
                            onChange={(e: any) => {
                              setFieldValue("monday.subject", e.target.value);
                              setFieldValue("tuesday.subject", e.target.value);
                              setFieldValue("wednesday.subject", e.target.value)
                            }}
                          />}
                          {teacherList && teacherList.length > 1 && <SelectArryField hideLabel={true} hideError={true} options={teacherList.filter((teach: any) => teach.intresrted_subject.find((is: any) => is == values.monday.subject))} firstOption="Teacher" errors={errors.monday?.teacher} value={values.monday.teacher} label="Teacher" name="monday.teacher"
                            onChange={(e: any) => {
                              setFieldValue("monday.teacher", e.target.value)
                              setFieldValue("tuesday.teacher", e.target.value)
                              setFieldValue("wednesday.teacher", e.target.value)
                            }}
                          />}

                          <span className="capitalize c-text-dark  c-input h-10  col-span-2">thursday-friday-saturday</span>
                          {subjectList && subjectList.length > 1 && <SelectField hideLabel={true} hideError={true} options={subjectList} firstOption="Subject" touched={touched.thursday?.subject} errors={errors.thursday?.subject} value={values.thursday.subject} label="Subject" name="thursday.subject" onChange={(e: any) => {
                            setFieldValue("thursday.subject", e.target.value)
                            setFieldValue("friday.subject", e.target.value)
                            setFieldValue("saturday.subject", e.target.value)
                          }} />}
                          {teacherList && teacherList.length > 1 && <SelectArryField hideLabel={true} hideError={true} options={teacherList.filter((teach: any) => teach.intresrted_subject.find((is: any) => is == values.thursday.subject))} firstOption="Teacher" errors={errors.thursday?.teacher} value={values.thursday.teacher} label="Teacher" name="thursday.teacher" onChange={(e: any) => {
                            setFieldValue("thursday.teacher", e.target.value)
                            setFieldValue("friday.teacher", e.target.value)
                            setFieldValue("saturday.teacher", e.target.value)
                          }} />}
                        </div>
                        {activeTab == 1 &&
                          <Periodallotmentpreview start_time={formValuesPeriod.start_time} end_time={formValuesPeriod.end_time} selectedTeacher={[values.monday.teacher, values.thursday.teacher].filter((z) => z != "")} teacherList={teacherList} />
                        }
                      </Tabcontainer>
                      <Tabcontainer show={activeTab == 2} >
                      <Periodheader options={[class_data.name, section_data.name, formValuesPeriod.name]} allTimeoption={allTimeoption} formValuesPeriod={formValuesPeriod}/>
                        <div className="grid grid-cols-3 gap-x-2 c-border-b-dark mb-3">
                          <span className="capitalize c-text-dark  c-input h-10  ">monday</span>
                          {subjectList && subjectList.length > 1 && <SelectField hideLabel={true} hideError={true} options={subjectList} firstOption="Subject" touched={touched.monday?.subject} errors={errors.monday?.subject} value={values.monday.subject} label="Subject" name="monday.subject" onChange={(e: any) => { setFieldValue("monday.subject", e.target.value) }} />}
                          {teacherList && teacherList.length > 1 && <SelectArryField hideLabel={true} hideError={true} options={teacherList.filter((teach: any) => teach.intresrted_subject.find((is: any) => is == values.monday.subject))} firstOption="Teacher" errors={errors.monday?.teacher} value={values.monday.teacher} label="Teacher" name="monday.teacher" onChange={(e: any) => { setFieldValue("monday.teacher", e.target.value) }} />}

                          <span className="capitalize c-text-dark  c-input h-10  ">tuesday</span>
                          {subjectList && subjectList.length > 1 && <SelectField hideLabel={true} hideError={true} options={subjectList} firstOption="Subject" touched={touched.tuesday?.subject} errors={errors.tuesday?.subject} value={values.tuesday.subject} label="Subject" name="tuesday.subject" onChange={(e: any) => { setFieldValue("tuesday.subject", e.target.value) }} />}
                          {teacherList && teacherList.length > 1 && <SelectArryField hideLabel={true} hideError={true} options={teacherList.filter((teach: any) => teach.intresrted_subject.find((is: any) => is == values.tuesday.subject))} firstOption="Teacher" errors={errors.tuesday?.teacher} value={values.tuesday.teacher} label="Teacher" name="tuesday.teacher" onChange={(e: any) => { setFieldValue("tuesday.teacher", e.target.value) }} />}

                          <span className="capitalize c-text-dark  c-input h-10  ">wednesday</span>
                          {subjectList && subjectList.length > 1 && <SelectField hideLabel={true} hideError={true} options={subjectList} firstOption="Subject" touched={touched.wednesday?.subject} errors={errors.wednesday?.subject} value={values.wednesday.subject} label="Subject" name="wednesday.subject" onChange={(e: any) => { setFieldValue("wednesday.subject", e.target.value) }} />}
                          {teacherList && teacherList.length > 1 && <SelectArryField hideLabel={true} hideError={true} options={teacherList.filter((teach: any) => teach.intresrted_subject.find((is: any) => is == values.wednesday.subject))} firstOption="Teacher" errors={errors.wednesday?.teacher} value={values.wednesday.teacher} label="Teacher" name="wednesday.teacher" onChange={(e: any) => { setFieldValue("wednesday.teacher", e.target.value) }} />}

                          <span className="capitalize c-text-dark  c-input h-10  ">thursday</span>
                          {subjectList && subjectList.length > 1 && <SelectField hideLabel={true} hideError={true} options={subjectList} firstOption="Subject" touched={touched.thursday?.subject} errors={errors.thursday?.subject} value={values.thursday.subject} label="Subject" name="thursday.subject" onChange={(e: any) => { setFieldValue("thursday.subject", e.target.value) }} />}
                          {teacherList && teacherList.length > 1 && <SelectArryField hideLabel={true} hideError={true} options={teacherList.filter((teach: any) => teach.intresrted_subject.find((is: any) => is == values.thursday.subject))} firstOption="Teacher" errors={errors.thursday?.teacher} value={values.thursday.teacher} label="Teacher" name="thursday.teacher" onChange={(e: any) => { setFieldValue("thursday.teacher", e.target.value) }} />}

                          <span className="capitalize c-text-dark  c-input h-10  ">friday</span>
                          {subjectList && subjectList.length > 1 && <SelectField hideLabel={true} hideError={true} options={subjectList} firstOption="Subject" touched={touched.friday?.subject} errors={errors.friday?.subject} value={values.friday.subject} label="Subject" name="friday.subject" onChange={(e: any) => { setFieldValue("friday.subject", e.target.value) }} />}
                          {teacherList && teacherList.length > 1 && <SelectArryField hideLabel={true} hideError={true} options={teacherList.filter((teach: any) => teach.intresrted_subject.find((is: any) => is == values.friday.subject))} firstOption="Teacher" errors={errors.friday?.teacher} value={values.friday.teacher} label="Teacher" name="friday.teacher" onChange={(e: any) => { setFieldValue("friday.teacher", e.target.value) }} />}

                          <span className="capitalize c-text-dark  c-input h-10  ">saturday</span>
                          {subjectList && subjectList.length > 1 && <SelectField hideLabel={true} hideError={true} options={subjectList} firstOption="Subject" touched={touched.saturday?.subject} errors={errors.saturday?.subject} value={values.saturday.subject} label="Subject" name="saturday.subject" onChange={(e: any) => { setFieldValue("saturday.subject", e.target.value) }} />}
                          {teacherList && teacherList.length > 1 && <SelectArryField hideLabel={true} hideError={true} options={teacherList.filter((teach: any) => teach.intresrted_subject.find((is: any) => is == values.saturday.subject))} firstOption="Teacher" errors={errors.saturday?.teacher} value={values.saturday.teacher} label="Teacher" name="saturday.teacher" onChange={(e: any) => { setFieldValue("saturday.teacher", e.target.value) }} />}

                        </div>
                        {activeTab == 2 &&
                          <Periodallotmentpreview start_time={formValuesPeriod.start_time} end_time={formValuesPeriod.end_time} selectedTeacher={[values.monday.teacher, values.tuesday.teacher, values.wednesday.teacher, values.thursday.teacher, values.friday.teacher, values.saturday.teacher].filter((z) => z != "")} teacherList={teacherList} />
                        }
                      </Tabcontainer>

                      <div className="mx-4 h-16">
                        <button type="submit" className="btn-outline-success w-full">{formValuesPeriod._id == "" ? "Add" : "Update"}</button>
                      </div>
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

