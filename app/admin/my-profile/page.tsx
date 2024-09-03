"use client"
import CheckBoxField from "@/app/components/shared/forms-elements/checkbox"
import DateField from "@/app/components/shared/forms-elements/datefield"
import EmailField from "@/app/components/shared/forms-elements/emailfield"
import NumberField from "@/app/components/shared/forms-elements/numberfield"
import RadioField from "@/app/components/shared/forms-elements/radiofield"
import SelectField from "@/app/components/shared/forms-elements/select"
import TextAreaField from "@/app/components/shared/forms-elements/textarea"
import TextField from "@/app/components/shared/forms-elements/textfield"
import TabBar from "@/app/components/shared/tabs/tabbar"
import Tabcontainer from "@/app/components/shared/tabs/tabcontainer"
import { FieldArray, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import PlusIcon from "@/app/components/shared/Icons/plus"
import ChipsField from "@/app/components/shared/forms-elements/chipsfield"
import { Employeainitial, EmployeevalidationSchema, EmployeType } from "../../components/shared/model/employeehelper"
import Swall from "@/app/components/shared/utils/swal"
import ToggleSingleField from "@/app/components/shared/forms-elements/togglesingle"
import { CalculatePercentage } from "@/app/components/shared/utils/helperfunction"
import AllEmployee from "@/app/components/backend/main/allemployee"
import { CreateUpdateEmployeeApi, GetAllSubjectApi } from "@/app/components/shared/utils/apis"
import { MediaPopup } from "@/app/components/shared/utils/mediaPopup"
import { MediaType, Mediainit } from "@/app/components/shared/model/mediahelper"
import IMGR from "@/app/components/shared/images/imgr"
import MyProfile from "@/app/components/backend/main/myprofile"
const drawerWidth = "w-[750px]"

const Page = () => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [openDrawer, setOpenDrawer] = useState(false)
  const [activeTab, setActiveTab] = useState(0);
  const [formValues, setformValues] = useState<EmployeType>(Employeainitial);
  const [newData, setNewData] = useState<EmployeType>(Employeainitial);
  const [subjectList, setsubjectList] = useState([]);
  const [mediaData, setMediaData] = useState<MediaType>(Mediainit)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => { getSubject() }, [newData])
  const getSubject = async () => {
    let data = await GetAllSubjectApi()
    const newData = data.data
    setsubjectList(newData.map((x: { name: any }) => x.name));
  }
  
  const onSubmit = async (values: any) => {
    // let data = await CreateUpdateEmployeeApi(values)
    // setNewData(data.data)
    // seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    // setformValues(Employeainitial)
    // setOpenDrawer(false)
  }
  const reciveDataTobeEdited = (data: EmployeType) => {
    setformValues(data)
    setOpenDrawer(true)
  }

  const handleMedia = (media: any, setFieldValue: any) => {
    // if (media.type == "profile_image") {
    //   setFieldValue("profile_image", media.file_name)
    // } else if (media.type == "edu_detail_certificate") {
    //   setFieldValue(`edu_detail[${selectedImageIndex}].certificate`, media.file_name)
    // } else if (media.type == "exp_detail_certificate") {
    //   setFieldValue(`exp_detail[${selectedImageIndex}].certificate`, media.file_name)
    // }
  }
  return (
    <>
      <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">My</span>Profile</h1>
          <button className="btn-outline-light rounded-full" onClick={() => { setOpenDrawer(true); setformValues(Employeainitial) }}> <PlusIcon />  Add </button>
        </div>
        <MyProfile newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false); setMediaData(Mediainit) }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
            <TabBar tabs={["General Detail", "Other Detail", "Family Detail", "Address", "Salary", "Education", "Experience"]} onOptionClick={(val) => { setActiveTab(val) }}  />
            {openDrawer && <Formik onSubmit={onSubmit} initialValues={formValues || Employeainitial} validationSchema={EmployeevalidationSchema}>
              {({ values, errors, touched, setFieldValue, handleChange }) => <>
                <MediaPopup mediaData={mediaData} getMedia={(val) => { handleMedia(val, setFieldValue) }} />
                <Form>
                  {/* =========GENERAL=========== */}
                  <Tabcontainer show={activeTab == 0} >

                    <div className="grid grid-cols-12 gap-x-2">
                      <TextField className="col-span-9" touched={touched.name} errors={errors.name} value={values.name} label="Name" name="name" onChange={handleChange} />

                      <div className="c-input col-span-3 row-span-2 relative">
                        <IMGR className='p-1'
                          alt="profile image"
                          src={values.profile_image}
                          onClick={() => {
                            values._id == "" ? seAlertData({ showSwall: Math.random(), className: "warn", message: "Image upload allowed while updating student" })
                              : setMediaData({ ...mediaData, showMediaPopup: Math.random(), related_student_id: values._id, description: values.name + " profile immage", type: "profile_image" })
                          }
                          }
                        />
                      </div>
                      <EmailField className="col-span-9" touched={touched.email} errors={errors.email} value={values.email} label="Email" name="email" onChange={handleChange} />
                      <TextField className="col-span-4" touched={touched.reg_no} errors={errors.reg_no} value={values.reg_no} label="Registration No" name="reg_no" onChange={handleChange} />
                      <TextField className="col-span-4" touched={touched.emp_id} errors={errors.emp_id} value={values.emp_id} label="Employee Id" name="emp_id" onChange={handleChange} />

                      <NumberField className="col-span-4" touched={touched.addhar_no} errors={errors.addhar_no} value={values.addhar_no} label="Addhar No" name="addhar_no" onChange={handleChange} />
                      <NumberField className="col-span-3" touched={touched.mobile} errors={errors.mobile} value={values.mobile} label="mobile" name="mobile" onChange={handleChange} />

                      <DateField className="col-span-3" touched={touched.dob} errors={errors.dob} value={values.dob} label="Date of Birth" name="dob" onChange={handleChange} />

                      <DateField className="col-span-3" touched={touched.join_date} errors={errors.join_date} value={values.join_date} label="Join Date" name="join_date" onChange={handleChange} />
                      <DateField className="col-span-3" touched={touched.left_date} errors={errors.left_date} value={values.left_date} label="Left Date" name="left_date" onChange={handleChange} />
                    </div>
                    <RadioField options={["Male", "Female"]} touched={touched.gender} errors={errors.gender} value={values.gender} label="Gender" name="gender" onOptionClick={(val) => { setFieldValue("gender", val) }} />
                    {/* <PasswordField touched={touched.password} errors={errors.password} value={values.password} label="Password" name="password" onChange={handleChange}/> */}
                    <RadioField options={["Admin", "Teacher", "Principal", "Accountant"]} touched={touched.role} errors={errors.role} value={values.role} label="role" name="role" onOptionClick={(val) => { setFieldValue("role", val) }} />
                    <RadioField options={["Active", "Inactive", "Left"]} touched={touched.status} errors={errors.status} value={values.status} label="status" name="status" onOptionClick={(val) => { setFieldValue("status", val) }} />
                  </Tabcontainer>
                  <Tabcontainer show={activeTab == 1} >
                    <CheckBoxField options={["Director Office", "Principal Office", "Academics", "Administration", "Finance", "Other"]} touched={touched.related_to} errors={errors.related_to} value={values.related_to} label="Related To" name="related_to" onOptionClick={(val) => { setFieldValue("related_to", val) }} />
                    <TextField touched={touched.remarks_text} errors={errors.remarks_text} value={values.remarks_text} label="Remarks Text" name="remarks_text" onChange={handleChange} />
                    <ChipsField id="subjectList1" options={subjectList} touched={touched.intresrted_subject} errors={errors.intresrted_subject} value={values.intresrted_subject} label="Intresrted Subject" name="intresrted_subject" onOptionClick={(val) => { setFieldValue(`intresrted_subject`, val) }} />
                    <RadioField options={["Permanent", "Regular", "Probation", "Temporary", "ADHOC", "Contract"]} touched={touched.emp_type} errors={errors.emp_type} value={values.emp_type} label="Employee Type" name="emp_type" onOptionClick={(val) => { setFieldValue("emp_type", val) }} />
                  </Tabcontainer>
                  <Tabcontainer show={activeTab == 2} >
                    <FieldArray name="family_detail">
                      {({ push, remove, form: { values: { family_detail } } }) =>
                        <>
                          {family_detail && family_detail.length > 0 && family_detail.map((person: any, i: number) =>
                            <div key={i} className="grid grid-cols-12 gap-x-2 c-border-b-dark mb-3">
                              <TextField className="col-span-4" touched={Boolean(touched.family_detail && touched.family_detail[i])} errors={errors.family_detail && errors.family_detail[i]} value={person.name} label="name" name={`family_detail[${i}].name`} onChange={handleChange} />
                              <NumberField className="col-span-4" touched={Boolean(touched.family_detail && touched.family_detail[i])} errors={errors.family_detail && errors.family_detail} value={person.mobile} label="mobile no" name={`family_detail[${i}].mobile`} onChange={handleChange} />
                              <SelectField firstOption="Relation" className="col-span-3" options={["Father", "Mother", "Husband", "Wife", "Brother", "Sister"]} touched={Boolean(touched.family_detail && touched.family_detail[i])} errors={errors.family_detail && errors.family_detail[i]} value={person.relation} label="relation" name={`family_detail[${i}].relation`} onChange={(e: any) => { setFieldValue(`family_detail[${i}].relation`, e.target.value) }} />
                              <button disabled={i == 0 && family_detail.length == 1} className="btn-outline-error  col-span-1  w-12 mt-7" type="button" onClick={() => { remove(i) }}> <PlusIcon className="fill-svg-error rotate-45 p-0" /> </button>

                            </div>

                          )}
                          <button className="btn-outline-success rounded-full" type="button" onClick={() => { push({ name: "", relation: "", mobile: "", }) }}> <PlusIcon className="fill-svg-success" /> More Member</button>
                        </>
                      }
                    </FieldArray>
                  </Tabcontainer>
                  <Tabcontainer show={activeTab == 3} >
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
                  </Tabcontainer>
                  <Tabcontainer show={activeTab == 4} >
                    <div className="grid grid-cols-12 gap-x-2">
                    <div className="or-divider col-span-12">Account Detail</div>
                      <NumberField className="col-span-4" touched={touched.bank_detail?.ac_number} errors={errors.bank_detail?.ac_number} value={values.bank_detail.ac_number} label="Ac Number" name="bank_detail.ac_number" onChange={handleChange} />
                      <TextField className="col-span-8" touched={touched.bank_detail?.ac_name} errors={errors.bank_detail?.ac_name} value={values.bank_detail.ac_name} label="Acccount Holder Name" name="bank_detail.ac_name" onChange={handleChange} />
                      <TextField className="col-span-4" touched={touched.bank_detail?.bank_name} errors={errors.bank_detail?.bank_name} value={values.bank_detail.bank_name} label="Bank Name" name="bank_detail.bank_name" onChange={handleChange} />
                      <TextField className="col-span-4" touched={touched.bank_detail?.ifsc_code} errors={errors.bank_detail?.ifsc_code} value={values.bank_detail.ifsc_code} label="IFSC Code" name="bank_detail.ifsc_code" onChange={handleChange} />
                      <TextField className="col-span-4" touched={touched.bank_detail?.pan_no} errors={errors.bank_detail?.pan_no} value={values.bank_detail.pan_no} label="PAN No" name="bank_detail.pan_no" onChange={handleChange} />

                      <RadioField className="col-span-12" options={["Current", "Saving", "Salary"]} touched={touched.bank_detail?.ac_type} errors={errors.bank_detail?.ac_type} value={values.bank_detail.ac_type} label="Acccount Type" name="bank_detail.ac_type" onOptionClick={(val) => { setFieldValue("bank_detail.ac_type", val) }} />
   
                    </div>
                    <div className="grid grid-cols-12 gap-x-2">
                    <div className="or-divider col-span-12">Salary Detail</div>
                      <NumberField className="col-span-4" touched={touched.salary_pm} errors={errors.salary_pm} value={values.salary_pm} label="Salary Per Month" name="salary_pm" onChange={handleChange}/>
                      </div>
                      <div className="or-divider col-span-12">Earned Leave</div>
                      <FieldArray name="el">
                      {({ push, remove, form: { values: { el } } }) =>
                        <>
                          {el && el.length > 0 && el.map((le:any, i: number) =>
                            <div key={i} className="grid grid-cols-12 gap-x-2 c-border-b-dark mb-3">                 
                              <NumberField className="col-span-2" placeholder="T-Mark" touched={Boolean(touched.el && touched.el[i])} errors={errors.el && errors.el[i]} value={le.no_days} label="No Of Days" name={`el[${i}].no_days`} onChange={handleChange} />
                              <TextField className="col-span-9" placeholder="O-Mark" touched={Boolean(touched.el && touched.el[i])} errors={errors.el && errors.el[i]} value={le.remark} label="Remark" name={`el[${i}].remark`} onChange={handleChange} />
                               <button disabled={i == 0 && el.length == 1} className="btn-outline-error col-span-1  w-12 mt-6 justify-self-end" type="button" onClick={() => { remove(i) }}> <PlusIcon className="fill-svg-error rotate-45 p-0" /> </button>


                            </div>
                          )}
                          <button className="btn-outline-success  rounded-full" type="button" onClick={() => { push(Employeainitial.el[0]) }}> <PlusIcon className="fill-svg-success" />More </button>
                        </>
                      }
                    </FieldArray>
    
                  </Tabcontainer>
                  <Tabcontainer show={activeTab == 5} >
                    <FieldArray name="edu_detail">
                      {({ push, remove, form: { values: { edu_detail } } }) =>
                        <>
                          {edu_detail && edu_detail.length > 0 && edu_detail.map((person: any, i: number) =>
                            <div key={i} className="grid grid-cols-10 gap-x-2 c-border-b-dark mb-3">
                              <TextField className="col-span-6" touched={Boolean(touched.edu_detail && touched.edu_detail[i])} errors={errors.edu_detail && errors.edu_detail[i]} value={person.organization_name} label="organization Name" name={`edu_detail[${i}].organization_name`} onChange={handleChange} />

                              <div className="c-input col-span-4 row-span-2 relative">
                                <IMGR className='p-1'
                                  src={edu_detail[i].certificate || "certificate.png"}
                                  alt="Certificate"
                                  onClick={() => {
                                    values._id == "" ? seAlertData({ showSwall: Math.random(), className: "warn", message: "Image upload allowed while updating student" })
                                    : setSelectedImageIndex(i); setMediaData({ ...mediaData, showMediaPopup: Math.random(), related_student_id: values._id, description: values.name + " certificate", type: "edu_detail_certificate" })
                                  }}
                                />
                              </div>
                              <TextField className="col-span-6" touched={Boolean(touched.edu_detail && touched.edu_detail[i])} errors={errors.edu_detail && errors.edu_detail[i]} value={person.board} label="Board Name" name={`edu_detail[${i}].board`} onChange={handleChange} />

                              <NumberField className="col-span-2" placeholder="T-Mark" touched={Boolean(touched.edu_detail && touched.edu_detail[i])} errors={errors.edu_detail && errors.edu_detail[i]} value={person.t_mark} label="Total Mark" name={`edu_detail[${i}].t_mark`} onChange={handleChange} />
                              <NumberField className="col-span-2" placeholder="O-Mark" touched={Boolean(touched.edu_detail && touched.edu_detail[i])} errors={errors.edu_detail && errors.edu_detail[i]} value={person.o_mark} label="Obtain Mark" name={`edu_detail[${i}].o_mark`} onChange={handleChange} />
                              <div className="c-input col-span-2 h-10 mt-6">
                                <span className="flex justify-between"><span>{CalculatePercentage(person.o_mark, person.t_mark)}</span><span> %</span></span>
                              </div>
                              {/* <NumberField disabled={true} className="col-span-1" touched={Boolean(touched.edu_detail && touched.edu_detail[i])} errors={errors.edu_detail && errors.edu_detail[i]} value={person.percentage} label="Percentage" name={`edu_detail[${i}].percentage`} onChange={handleChange} /> */}
                              <SelectField options={["A", "B", "C", "D", "E"]} className="col-span-2" touched={Boolean(touched.edu_detail && touched.edu_detail[i])} errors={errors.edu_detail && errors.edu_detail[i]} value={person.grade} label="Grade" name={`edu_detail[${i}].grade`} onChange={handleChange} />
                              <SelectField options={["2010", "2011", "2012", "2013", "2014"]} className="col-span-2" touched={Boolean(touched.edu_detail && touched.edu_detail[i])} errors={errors.edu_detail && errors.edu_detail[i]} value={person.p_year} label="Passing Year" name={`edu_detail[${i}].p_year`} onChange={handleChange} />


                              <ChipsField id="subjectList2" options={subjectList} className="col-span-9" touched={Boolean(touched.edu_detail && touched.edu_detail[i])} errors={errors.edu_detail && errors.edu_detail[i]} value={person.subjects} label="subjects" name={`edu_detail[${i}].subjects`} onOptionClick={(val) => { setFieldValue(`edu_detail[${i}].subjects`, val) }} />
                              <button disabled={i == 0 && edu_detail.length == 1} className="btn-outline-error col-span-1  w-12 mt-6 justify-self-end" type="button" onClick={() => { remove(i) }}> <PlusIcon className="fill-svg-error rotate-45 p-0" /> </button>


                            </div>
                          )}
                          <button className="btn-outline-success  rounded-full" type="button" onClick={() => { push(Employeainitial.edu_detail[0]) }}> <PlusIcon className="fill-svg-success" />  Add More Education </button>
                        </>
                      }
                    </FieldArray>
                  </Tabcontainer>
                  <Tabcontainer show={activeTab == 6} >
                    <FieldArray name="exp_detail">
                      {({ push, remove, form: { values: { exp_detail } } }) =>
                        <>
                          {exp_detail && exp_detail.length > 0 && exp_detail.map((person: any, i: number) =>
                            <div key={i} className="grid grid-cols-12 gap-x-2 c-border-b-dark mb-3">
                              <TextField className="col-span-4" touched={Boolean(touched.exp_detail && touched.exp_detail[i])} errors={errors.exp_detail && errors.exp_detail[i]} value={person.degination} label="Degination" name={`exp_detail[${i}].degination`} onChange={handleChange} />
                              <TextField className="col-span-4" touched={Boolean(touched.exp_detail && touched.exp_detail[i])} errors={errors.exp_detail && errors.exp_detail[i]} value={person.company} label="Company Name" name={`exp_detail[${i}].company`} onChange={handleChange} />

                              <div className="c-input col-span-4 row-span-2 relative">
                                <IMGR className='p-1'
                                  src={exp_detail[i].certificate || "certificate.png"}
                                  alt="Certificate"
                                  onClick={() => {
                                    values._id == "" ? seAlertData({ showSwall: Math.random(), className: "warn", message: "Image upload allowed while updating student" })
                                    : setSelectedImageIndex(i); setMediaData({ ...mediaData, showMediaPopup: Math.random(), related_student_id: values._id, description: values.name + " certificate", type: "exp_detail_certificate" })
                                  }}
                                />
                              </div>

                              <TextAreaField rows={3} className="col-span-8" touched={Boolean(touched.exp_detail && touched.exp_detail[i])} errors={errors.exp_detail && errors.exp_detail[i]} value={person.responsibilites} label="Responsibilites" name={`exp_detail[${i}].responsibilites`} onChange={handleChange} />
                              <TextField className="col-span-5" touched={Boolean(touched.exp_detail && touched.exp_detail[i])} errors={errors.exp_detail && errors.exp_detail[i]} value={person.role} label="Role" name={`exp_detail[${i}].role`} onChange={handleChange} />

                              <DateField className="col-span-3" touched={Boolean(touched.exp_detail && touched.exp_detail[i])} errors={errors.exp_detail && errors.exp_detail[i]} value={person.from_date} label="From Date" name={`exp_detail[${i}].from_date`} onChange={handleChange} />
                              <DateField className="col-span-3" touched={Boolean(touched.exp_detail && touched.exp_detail[i])} errors={errors.exp_detail && errors.exp_detail[i]} min={person.from_date} value={person.to_date} label="To Date" name={`exp_detail[${i}].to_date`} onChange={handleChange} />
                              <button disabled={i == 0 && exp_detail.length == 1} className="btn-outline-error col-span-1  w-12 mt-7" type="button" onClick={() => { remove(i) }}> <PlusIcon className="fill-svg-error rotate-45 p-0" /> </button>
                            </div>)}
                          <button className="btn-outline-success  rounded-full" type="button" onClick={() => { push(Employeainitial.exp_detail[0]) }}> <PlusIcon className="fill-svg-success" />  Add More Education </button>
                        </>
                      }
                    </FieldArray>
                  </Tabcontainer>
                  {/* <div className="mx-4 h-16">
                    <button type="submit" className="btn-outline-success w-full">{formValues._id == "" ? "Add" : "Update"}</button>
                  </div> */}
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
