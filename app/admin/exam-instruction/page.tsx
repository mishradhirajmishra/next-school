"use client"
import TabBar from "@/app/components/shared/tabs/tabbar"
import Tabcontainer from "@/app/components/shared/tabs/tabcontainer"
import { FieldArray, Form, Formik } from "formik"
import { useState } from "react"
import Swall from "@/app/components/shared/utils/swal"
import {   CreateUpdateExamInstructionApi, CreateUpdateSettingApi } from "@/app/components/shared/utils/apis"
import TextField from "@/app/components/shared/forms-elements/textfield"

import NumberField from "@/app/components/shared/forms-elements/numberfield"
import SelectField from "@/app/components/shared/forms-elements/select"
import Setting from "@/app/components/backend/masterdata/setting"
import IMGR from "@/app/components/shared/images/imgr"
import { ExamInstructionType, examInstructionInit } from "@/app/components/shared/model/examhelper"
import PlusIcon from "@/app/components/shared/Icons/plus"
import ExamInstruction from "@/app/components/backend/masterdata/examinstruction"

const drawerWidth = "w-[750px]"


const Page = () => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [openDrawer, setOpenDrawer] = useState(false)
 
  const [formValues, setformValues] = useState<ExamInstructionType>(examInstructionInit);
  const [newData, setNewData] = useState<ExamInstructionType>(examInstructionInit);
  
  const onSubmit = async (values: ExamInstructionType) => {
    let data = await CreateUpdateExamInstructionApi(values)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValues(examInstructionInit)
    setOpenDrawer(false)
  }

  const reciveDataTobeEdited = (data: ExamInstructionType) => {
    setformValues(data)
    setOpenDrawer(true)
  }

  return (
    <>
      <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Exam </span>Instruction</h1>
          {/* <button className="btn-outline-light rounded-full" onClick={() => { setOpenDrawer(true); setformValues(examInstructionInit) }}> <PlusIcon />  Add </button> */}
        </div>
        <ExamInstruction newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />  
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false) }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
            <TabBar tabs={["Setting"]} onOptionClick={(val) => { }} />
            {openDrawer && <Formik onSubmit={onSubmit} initialValues={formValues || examInstructionInit} >
              {({ values, errors, touched, setFieldValue, handleChange }) => <>
                <Form>
                  <Tabcontainer show={true} >
                    <div className="grid grid-cols-12 gap-x-2">
                      <TextField className="col-span-12" touched={touched.title} errors={errors.title} value={values.title} label="Title" name="title" onChange={handleChange} />
                      <div className="col-span-12">
                        <div className="or-divider">instructions</div>
                      <FieldArray name="instructions" >
                        {({ push, remove, form: { values: { instructions } } }) =>
                          <>
                            {instructions && instructions.length > 0 && instructions.map((les: ExamInstructionType, i: number) =>
                              <div key={i} className="grid grid-cols-12 gap-x-2 c-border-b-dark mb-3">
                                <TextField className="col-span-11" touched={Boolean(touched.instructions && touched.instructions[i])} errors={errors.instructions && errors.instructions[i]} value={les.title} label={`Point ${i+1}`} name={`instructions[${i}].title`} onChange={handleChange} />
        
                                 <button disabled={i == 0 && instructions.length == 1} className="btn-outline-error  col-span-1  w-12 mt-6" type="button" onClick={() => { remove(i) }}> <PlusIcon className="fill-svg-error rotate-45 p-0" /> </button>
                              </div>
                            )}
                            <button className="btn-outline-success rounded-full" type="button" onClick={() => { push(examInstructionInit.instructions[0]) }}> <PlusIcon className="fill-svg-success" /> More Lesson</button>
                          </>
                        }
                      </FieldArray>
                      </div>
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

