"use client"
import DateField from "@/app/components/shared/forms-elements/datefield"
import EmailField from "@/app/components/shared/forms-elements/emailfield"
import NumberField from "@/app/components/shared/forms-elements/numberfield"
import RadioField from "@/app/components/shared/forms-elements/radiofield"
import SelectField from "@/app/components/shared/forms-elements/select"
import TextField from "@/app/components/shared/forms-elements/textfield"
import TabBar from "@/app/components/shared/tabs/tabbar"
import Tabcontainer from "@/app/components/shared/tabs/tabcontainer"
import { FieldArray, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import PlusIcon from "@/app/components/shared/Icons/plus"
import ChipsField from "@/app/components/shared/forms-elements/chipsfield"
import { Studentinitial, StudentvalidationSchema, StudentType } from "../../components/shared/model/studenthelper"
import Swall from "@/app/components/shared/utils/swal"
import ToggleSingleField from "@/app/components/shared/forms-elements/togglesingle"
import AllStudents from "@/app/components/backend/main/allstudents"
import { CalculatePercentage, ImageSorce } from "@/app/components/shared/utils/helperfunction"
import { CreateUpdateStudentApi, GetAllClassApi, GetAllFeeApi, GetAllSubjectApi } from "@/app/components/shared/utils/apis"
import SelectArryField from "@/app/components/shared/forms-elements/selectArray"
import { ClassOptionType, ClassOptioninitial} from "@/app/components/shared/model/classhelper"
import { MediaPopup } from "@/app/components/shared/utils/mediaPopup"
import { MediaType, Mediainit } from "@/app/components/shared/model/mediahelper"
import Image from "next/image"
import LanguageOption from "@/app/components/shared/utils/languagelist"
import { useSession } from "next-auth/react"
import { FeeType, Feeinit } from "@/app/components/shared/model/feehelper"
import IMGR from "@/app/components/shared/images/imgr"

const drawerWidth = "w-[750px]"
const validationSchema = StudentvalidationSchema
const initialValue = Studentinitial
const imageInit = Mediainit;
const classOptioninitial = ClassOptioninitial
const languageOption = LanguageOption

const Page = () => {
  const { data: session, status } = useSession() 
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [openDrawer, setOpenDrawer] = useState(false)
  const [activeTab, setActiveTab] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [formValues, setformValues] = useState<StudentType>(initialValue);
  const [newData, setNewData] = useState<StudentType>(initialValue);
  const [allClassOpt, setallClassOpt] = useState<Array<ClassOptionType>>([classOptioninitial])
  const [selectedClassOpt, setselectedClassOpt] = useState<ClassOptionType>(classOptioninitial)
  const [mediaData, setMediaData] = useState<MediaType>(imageInit)
  const [subjectList, setsubjectList] = useState([]);
  const [feeList, setFeeList] = useState<Array<FeeType>>([Feeinit])

  useEffect(() => { getFee() }, [newData])
  const getFee = async () => {
    let data = await GetAllFeeApi();
    setFeeList(data.filter((x:FeeType)=>x.optional=="Yes"))
  }

  useEffect(() => { getSubject() }, [newData])
  const getSubject = async () => {
    let data = await GetAllSubjectApi()
    // console.log(data.data.map((x: { name: any }) => x.name))
    setsubjectList(data.data);
  }

  useEffect(() => { getClass() }, [newData])
  const getClass = async () => {
    const data = await GetAllClassApi()
    setallClassOpt(data.data.map((x: any) => {
      x.value = x._id;
      if (x.section.length > 0) { x.section = x.section.map((y: any) => { y.value = y._id; return y }) }
      return x
    }));
  }

  const onSubmit = async (values: any) => {
    let data = await CreateUpdateStudentApi(values)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValues(initialValue)
    setOpenDrawer(false)
  } 
  const reciveDataTobeEdited = (data: StudentType) => {
     let allsection = allClassOpt.find(x => x._id == data.class)
    if (allsection) { setselectedClassOpt(allsection) }
    console.log(data.class)
    setformValues(data)
    setOpenDrawer(true)
  }
  const handleMedia = (media: any, setFieldValue: any) => {
    if (media.type == "profile_image") {
      setFieldValue("profile_image", media.file_name)
    } else if (media.type == "certificate") {
      setFieldValue(`edu_detail[${selectedImageIndex}].certificate`, media.file_name)
    } else if (media.type == "tc_image") {
      setFieldValue(`tc_image`, media.file_name)
    } else if (media.type == "addhar_image") {
      setFieldValue(`addhar_image`, media.file_name)
    }
  }


  return (
    <>
      <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Stu</span>dents</h1>
          <button disabled={session?.user.role!="Admin"} className="btn-outline-light rounded-full" onClick={() => { setOpenDrawer(true);setformValues(initialValue) }}> <PlusIcon />  Add </button>
        </div>
        <AllStudents newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false);setMediaData(Mediainit) }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
            <TabBar tabs={["General Detail", "Other Detail", "Guardian Detail", "Family Detail", "Address", "Education"]} onOptionClick={(val) => { setActiveTab(val) }} />
            {openDrawer && <Formik onSubmit={onSubmit} initialValues={formValues || initialValue} validationSchema={validationSchema} enableReinitialize={true}>
              {({ values, errors, touched, setFieldValue, handleChange }) => <>
                <MediaPopup mediaData={mediaData} getMedia={(val) => { handleMedia(val, setFieldValue) }} />
                <Form>
                  {/* =========GENERAL=========== */}
                  <Tabcontainer show={activeTab == 0} >                  
                    <div className="grid grid-cols-12 gap-x-2">
                      <TextField className="col-span-9" touched={touched.name} errors={errors.name} value={values.name} label="Name" name="name" onChange={handleChange} />
                      <div className="c-input col-span-3 row-span-2 relative">
                      <label  className="c-form-label">Profile Image</label>
                      <IMGR  className='p-2'
                          src={values.profile_image}
                          alt="Profile Image"                 
                                                 
                          onClick={() => {
                            values._id==""? seAlertData({ showSwall: Math.random(), className: "warn", message: "Image upload allowed while updating student" })
                             : setMediaData({ ...mediaData, showMediaPopup: Math.random(), related_student_id: values._id, description: values.name + " profile immage", type: "profile_image" }) }
                            }
                        />
                      </div>

                      <EmailField className="col-span-9" touched={touched.email} errors={errors.email} value={values.email} label="Email" name="email" onChange={handleChange} />
                      <NumberField className="col-span-4" touched={touched.mobile} errors={errors.mobile} value={values.mobile} label="Mobile" name="mobile" onChange={handleChange} />
                      <DateField className="col-span-4" touched={touched.dob} errors={errors.dob} value={values.dob} label="Date of Birth" name="dob" onChange={handleChange} />
                      <TextField className="col-span-4" touched={touched.stu_id} errors={errors.stu_id} value={values.stu_id} label="Student ID" name="stu_id" onChange={handleChange} />
                      <TextField className="col-span-4" touched={touched.sr_no} errors={errors.sr_no} value={values.sr_no} label="Serial No" name="sr_no" onChange={handleChange} />
                      <TextField className="col-span-4" touched={touched.roll_no} errors={errors.roll_no} value={values.roll_no} label="Roll No" name="roll_no" onChange={handleChange} />
                      <NumberField className="col-span-4" touched={touched.admission_no} errors={errors.admission_no} value={values.admission_no} label="Admission No" name="admission_no" onChange={handleChange} />
                      <DateField className="col-span-4" touched={touched.admission_date} errors={errors.admission_date} value={values.admission_date} label="Admission Date" name="admission_date" onChange={handleChange} />
                      <SelectArryField options={allClassOpt} className="col-span-4" firstOption="Class" errors={errors.class} value={values.class} label="class" name="class" onChange={(e: any) => {
                        setFieldValue("class", e.target.value)
                        let allsection = allClassOpt.find(x => x._id == e.target.value)
                        if (allsection) { setselectedClassOpt(allsection) }
                        console.log("class", allsection?.section)
                      }} />
                      <SelectArryField options={selectedClassOpt.section} className="col-span-4" firstOption="Section" errors={errors.section} value={values.section} label="section" name="section" onChange={(e: any) => { setFieldValue("section", e.target.value) }} />

                    </div>
                    <RadioField options={["Male", "Female"]} touched={touched.gender} errors={errors.gender} value={values.gender} label="Gender" name="gender" onOptionClick={(val) => { setFieldValue("gender", val) }} />
                    {/* <PasswordField touched={touched.password} errors={errors.password} value={values.password} label="Password" name="password" onChange={handleChange}/> */}
                  </Tabcontainer>

                  <Tabcontainer show={activeTab == 1} >
                    <ChipsField id="languageOption" options={languageOption.map(x => x.value)} touched={touched.known_language} errors={errors.known_language} value={values.known_language} label="known Language" name="known_language" onOptionClick={(val) => { setFieldValue("known_language", val) }} />
                    <ChipsField id="optional_fee" options={feeList.map((x: { title: any }) => x.title)} touched={touched.optional_fee} errors={errors.optional_fee} value={values.optional_fee} label="Optional Fee" name="optional_fee" onOptionClick={(val) => { setFieldValue("optional_fee", val) }} />
                    <RadioField options={["General", "OBC", "SC","ST"]} touched={touched.caste_based_group} errors={errors.caste_based_group} value={values.caste_based_group} label="Caste Based Group" name="caste_based_group" onOptionClick={(val) => { setFieldValue("caste_based_group", val) }} />
                    <div className="grid grid-cols-12 gap-x-2">
                      <TextField className="col-span-3" touched={touched.nationality} errors={errors.nationality} value={values.nationality} label="Nationality" name="nationality" onChange={handleChange} />
                      <TextField className="col-span-3" touched={touched.religion} errors={errors.religion} value={values.religion} label="religion" name="religion" onChange={handleChange} />
                      <TextField className="col-span-3" touched={touched.mother_tongue} errors={errors.mother_tongue} value={values.mother_tongue} label="Mother Tongue" name="mother_tongue" onChange={handleChange} />
                      <NumberField className="col-span-3" touched={touched.distance_from_school} errors={errors.distance_from_school} value={values.distance_from_school} label="Distance From School in Km" name="distance_from_school" onChange={handleChange} />
                      <NumberField className="col-span-6" touched={touched.addhar_no} errors={errors.addhar_no} value={values.addhar_no} label="Addhar No" name="addhar_no" onChange={handleChange} />
                      <TextField className="col-span-6" touched={touched.tc_comment} errors={errors.tc_comment} value={values.tc_comment} label="Tc Comment" name="tc_comment" onChange={handleChange} />
                      <div className="c-input col-span-6 h-[200px] relative">
                      <label  className="c-form-label">Addhar Image</label>
                        <IMGR className='p-2'
                          src={values.addhar_image}
                          alt="addhar Image"
                           onClick={() => {    values._id==""? seAlertData({ showSwall: Math.random(), className: "warn", message: "Image upload allowed while updating student" })
                          : setMediaData({ ...mediaData, showMediaPopup: Math.random(), related_student_id: values._id, description: values.name + " addhar immage", type: "addhar_image" }) }}
                        />


                      </div>
                      <div className="c-input col-span-6  h-[200px] relative">
                      <label  className="c-form-label">Tc Immage</label>
                        <IMGR className='p-2'
                          src={values.tc_image}
                          alt="tc immage"
                         
                          onClick={() => { setMediaData({ ...mediaData, showMediaPopup: Math.random(), related_student_id: values._id, description: values.name + " tc immage", type: "tc_image" }) }}
                        />



                      </div>
                   
                      <NumberField className="col-span-2 mt-5" touched={touched.fee_discount} errors={errors.fee_discount} value={values.fee_discount} label="Fee Discount (%)" name="fee_discount" onChange={handleChange}/>
                       <NumberField className="col-span-4 mt-5" touched={touched.pen_no} errors={errors.pen_no} value={values.pen_no} label="PEN No" name="pen_no" onChange={handleChange}/>
                       
                      <div className="col-span-1 mt-[50px] -ml-8 z-10"></div>
                       
                    </div>
                  </Tabcontainer>
                  <Tabcontainer show={activeTab == 2} >
                    <div className="grid grid-cols-12 gap-x-2">
                      <TextField className="col-span-8" touched={touched.guardian?.name} errors={errors.guardian?.name} value={values.guardian.name} label="Name" name="guardian.name" onChange={handleChange} />
                      <SelectField className="col-span-4" options={["Father", "Mother", "Husband", "Wife", "Brother", "Sister"]} touched={touched.guardian?.relation} errors={errors.guardian?.relation} value={values.guardian.relation} label="Relation" name="guardian.relation"
                        onChange={(e: any) => { setFieldValue(`guardian.relation`, e.target.value) }} />
                      <TextField className="col-span-4" touched={touched.guardian?.mobile} errors={errors.guardian?.mobile} value={values.guardian.mobile} label="Mobile No" name="guardian.mobile" onChange={handleChange} />
                      <TextField className="col-span-4" touched={touched.guardian?.anual_income} errors={errors.guardian?.anual_income} value={values.guardian.anual_income} label="Anual Income" name="guardian.anual_income" onChange={handleChange} />
                      <NumberField className="col-span-4" touched={touched.guardian?.addhar} errors={errors.guardian?.addhar} value={values.guardian.addhar} label="Addhar No" name="guardian.addhar" onChange={handleChange} />
                      <TextField className="col-span-6" touched={touched.guardian?.education} errors={errors.guardian?.education} value={values.guardian.education} label="Education Detail" name="guardian.education" onChange={handleChange} />
                      <TextField className="col-span-6" touched={touched.guardian?.occupation} errors={errors.guardian?.occupation} value={values.guardian.occupation} label="Occupation" name="guardian.occupation" onChange={handleChange} />
                    </div>
                  </Tabcontainer>
                  <Tabcontainer show={activeTab == 3} >
                    <FieldArray name="family_detail">
                      {({ push, remove, form: { values: { family_detail } } }) =>
                        <>
                          {family_detail && family_detail.length > 0 && family_detail.map((person: any, i: number) =>
                            <div key={i} className="grid grid-cols-12 gap-x-2 c-border-b-dark mb-3">
                              <TextField className="col-span-4" touched={Boolean(touched.family_detail && touched.family_detail[i])} errors={errors.family_detail && errors.family_detail[i]} value={person.name} label="Member Name" name={`family_detail[${i}].name`} onChange={handleChange} />
                              <NumberField className="col-span-4" touched={Boolean(touched.family_detail && touched.family_detail[i])} errors={errors.family_detail && errors.family_detail[i]} value={person.mobile} label="Mobile No" name={`family_detail[${i}].mobile`} onChange={handleChange} />

                              <SelectField firstOption="Relation" className="col-span-3" options={["Father", "Mother", "Husband", "Wife", "Brother", "Sister"]} touched={Boolean(touched.family_detail && touched.family_detail[i])} errors={errors.family_detail && errors.family_detail[i]} value={person.relation} label="relation" name={`family_detail[${i}].relation`}
                                onChange={(e: any) => { setFieldValue(`family_detail[${i}].relation`, e.target.value) }} />
                              <button disabled={i == 0 && family_detail.length == 1} className="btn-outline-error  col-span-1  w-12 mt-7" type="button" onClick={() => { remove(i) }}> <PlusIcon className="fill-svg-error rotate-45 p-0" /> </button>
                            </div>
                          )}
                          <button className="btn-outline-success rounded-full" type="button" onClick={() => { push({ name: "", relation: "", mobile: "", }) }}> <PlusIcon className="fill-svg-success" /> More Member</button>
                        </>
                      }
                    </FieldArray>
                  </Tabcontainer>
                  <Tabcontainer show={activeTab == 4} >
                    <div className="or-divider">Residential Address</div>
                    <div className="grid grid-cols-2 gap-x-2">
                      <TextField className="col-span-1" touched={touched.r_address?.line_1} errors={errors.r_address?.line_1} value={values.r_address.line_1} label="Line 1" name="r_address.line_1"
                        onChange={(e: any) => { setFieldValue("r_address.line_1", e.target.value); if (values.r_p_same) { setFieldValue("p_address.line_1", e.target.value) } }} />
                      <TextField className="col-span-1" touched={touched.r_address?.line_2} errors={errors.r_address?.line_2} value={values.r_address.line_2} label="Line 2" name="r_address.line_2"
                        onChange={(e: any) => { setFieldValue("r_address.line_2", e.target.value); if (values.r_p_same) { setFieldValue("p_address.line_2", e.target.value) } }} />
                      <TextField touched={touched.r_address?.city} errors={errors.r_address?.city} value={values.r_address.city} label="City" name="r_address.city"
                        onChange={(e: any) => { setFieldValue("r_address.city", e.target.value); if (values.r_p_same) { setFieldValue("p_address.city", e.target.value) } }} />
                      <TextField touched={touched.r_address?.state} errors={errors.r_address?.state} value={values.r_address.state} label="State" name="r_address.state"
                        onChange={(e: any) => { setFieldValue("r_address.state", e.target.value); if (values.r_p_same) { setFieldValue("p_address.state", e.target.value) } }} />
                      <TextField touched={touched.r_address?.country} errors={errors.r_address?.country} value={values.r_address.country} label="Country" name="r_address.country"
                        onChange={(e: any) => { setFieldValue("r_address.country", e.target.value); if (values.r_p_same) { setFieldValue("p_address.country", e.target.value) } }} />
                      <NumberField touched={touched.r_address?.pin_no} errors={errors.r_address?.pin_no} value={values.r_address.pin_no} label="Pin No" name="r_address.pin_no"
                        onChange={(e: any) => { setFieldValue("r_address.pin_no", e.target.value); if (values.r_p_same) { setFieldValue("p_address.pin_no", e.target.value) } }} />
                    </div>
                    <ToggleSingleField value={values.r_p_same} label="Both Address are Same" name="r_p_same" onOptionClick={(val: boolean) => {
                      setFieldValue("r_p_same", val);
                      if (val) {
                        setFieldValue("p_address.line_1", values.r_address.line_1)
                        setFieldValue("p_address.line_2", values.r_address.line_2)
                        setFieldValue("p_address.city", values.r_address.city)
                        setFieldValue("p_address.state", values.r_address.state)
                        setFieldValue("p_address.country", values.r_address.country)
                        setFieldValue("p_address.pin_no", values.r_address.pin_no)
                      } else {
                        setFieldValue("p_address.line_1", "")
                        setFieldValue("p_address.line_2", "")
                        setFieldValue("p_address.city", "")
                        setFieldValue("p_address.state", "")
                        setFieldValue("p_address.country", "")
                        setFieldValue("p_address.pin_no", "")
                      }
                    }}
                    />

                    <div className="or-divider">permanent Address</div>
                    <div className="grid grid-cols-2 gap-x-2">
                      <TextField disabled={values.r_p_same} className="col-span-1" touched={touched.p_address?.line_1} errors={errors.p_address?.line_1} value={values.p_address.line_1} label="Line 1" name="p_address.line_1" onChange={handleChange} />
                      <TextField disabled={values.r_p_same} className="col-span-1" touched={touched.p_address?.line_2} errors={errors.p_address?.line_2} value={values.p_address.line_2} label="Line 2" name="p_address.line_2" onChange={handleChange} />
                      <TextField disabled={values.r_p_same} touched={touched.p_address?.city} errors={errors.p_address?.city} value={values.p_address.city} label="City" name="p_address.city" onChange={handleChange} />
                      <TextField disabled={values.r_p_same} touched={touched.p_address?.state} errors={errors.p_address?.state} value={values.p_address.state} label="State" name="p_address.state" onChange={handleChange} />
                      <TextField disabled={values.r_p_same} touched={touched.p_address?.country} errors={errors.p_address?.country} value={values.p_address.country} label="Country" name="p_address.country" onChange={handleChange} />
                      <NumberField disabled={values.r_p_same} touched={touched.p_address?.pin_no} errors={errors.p_address?.pin_no} value={values.p_address.pin_no} label="Pin No" name="p_address.pin_no" onChange={handleChange} />
                    </div>
                    <div className="or-divider"></div>
                  </Tabcontainer>

                  <Tabcontainer show={activeTab == 5} >
                    <FieldArray name="edu_detail">
                      {({ push, remove, form: { values: { edu_detail } } }) =>
                        <>
                          {edu_detail && edu_detail.length > 0 && edu_detail.map((person: any, i: number) =>
                            <div key={i} className="grid grid-cols-10 gap-x-2 c-border-b-dark mb-3">
                              <TextField className="col-span-6" touched={Boolean(touched.edu_detail && touched.edu_detail[i])} errors={errors.edu_detail && errors.edu_detail[i]} value={edu_detail[i].organization_name} label="Institute Name" name={`edu_detail[${i}].organization_name`} onChange={handleChange} />

                              <div className="c-input col-span-4 row-span-2 relative">
                              <label  className="c-form-label">Certificate</label>
                                <IMGR className='p-2'
                                  src={edu_detail[i].certificate || "certificate.png"}
                                  alt="Certificate"
                                  onClick={() => {   values._id==""? seAlertData({ showSwall: Math.random(), className: "warn", message: "Image upload allowed while updating student" })
                                  : setSelectedImageIndex(i); setMediaData({ ...mediaData, showMediaPopup: Math.random(), related_student_id: values._id, description: values.name + " certificate", type: "certificate" }) }}
                                />

                                {/* <TextField className="col-span-12" touched={Boolean(touched.edu_detail && touched.edu_detail[i])} errors={errors.edu_detail && errors.edu_detail[i]} value={person.certificate} label="certificate" name={`edu_detail[${i}].certificate`} onChange={handleChange} /> */}
                              </div>
                              <TextField className="col-span-6" touched={Boolean(touched.edu_detail && touched.edu_detail[i])} errors={errors.edu_detail && errors.edu_detail[i]} value={person.board} label="Board Name" name={`edu_detail[${i}].board`} onChange={handleChange} />

                              <NumberField className="col-span-2" placeholder="T-Mark" touched={Boolean(touched.edu_detail && touched.edu_detail[i])} errors={errors.edu_detail && errors.edu_detail[i]} value={person.t_mark} label="Total Mark" name={`edu_detail[${i}].t_mark`} onChange={handleChange} />
                              <NumberField className="col-span-2" placeholder="O-Mark" touched={Boolean(touched.edu_detail && touched.edu_detail[i])} errors={errors.edu_detail && errors.edu_detail[i]} value={person.o_mark} label="Obtain Mark" name={`edu_detail[${i}].o_mark`} onChange={handleChange} />
                              <div className="c-input col-span-2 h-10 mt-6">
                                <span className="flex justify-between"><span>{CalculatePercentage(person.o_mark, person.t_mark)}</span><span> %</span></span>
                              </div>
                              {/* <NumberField disabled={true} className="col-span-1" touched={Boolean(touched.edu_detail && touched.edu_detail[i])} errors={errors.edu_detail && errors.edu_detail[i]} value={person.percentage} label="Percentage" name={`edu_detail[${i}].percentage`} onChange={handleChange} /> */}
                              <SelectField options={["A", "B", "C", "D", "E"]} className="col-span-2" touched={Boolean(touched.edu_detail && touched.edu_detail[i])} errors={errors.edu_detail && errors.edu_detail[i]} value={person.grade} label="Grade" name={`edu_detail[${i}].grade`}
                                onChange={(e: any) => { setFieldValue(`edu_detail[${i}].grade`, e.target.value) }} />
                              <SelectField options={["2010", "2011", "2012", "2013", "2014"]} className="col-span-2" touched={Boolean(touched.edu_detail && touched.edu_detail[i])} errors={errors.edu_detail && errors.edu_detail[i]} value={person.p_year} label="Passing Year" name={`edu_detail[${i}].p_year`}
                                onChange={(e: any) => { setFieldValue(`edu_detail[${i}].p_year`, e.target.value) }} />
 
                              <ChipsField id="subjectList" options={subjectList.map((x: { name: any }) => x.name)} className="col-span-9" touched={Boolean(touched.edu_detail && touched.edu_detail[i])} errors={errors.edu_detail && errors.edu_detail[i]} value={person.subjects} label="subjects" name={`edu_detail[${i}].subjects`} onOptionClick={(val) => { setFieldValue(`edu_detail[${i}].subjects`, val) }} />
                              <button disabled={i == 0 && edu_detail.length == 1} className="btn-outline-error col-span-1  w-12 mt-6 justify-self-end" type="button" onClick={() => { remove(i) }}> <PlusIcon className="fill-svg-error rotate-45 p-0" /> </button>


                            </div>
                          )}
                          <button className="btn-outline-success  rounded-full" type="button" onClick={() => { push(initialValue.edu_detail[0]) }}> <PlusIcon className="fill-svg-success" />  Add More Education </button>
                        </>
                      }
                    </FieldArray>
                  </Tabcontainer>
                  <div className="mx-4 h-16">
                    <button disabled={session?.user.role!="Admin"} type="submit" className="btn-outline-success w-full">{formValues._id == "" ? "Add" : "Update"}</button>
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
