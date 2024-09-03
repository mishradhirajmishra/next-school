"use client"
import TabBar from "@/app/components/shared/tabs/tabbar"
import Tabcontainer from "@/app/components/shared/tabs/tabcontainer"
import { FieldArray, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import PlusIcon from "@/app/components/shared/Icons/plus"
import Swall from "@/app/components/shared/utils/swal"
import { GetAllClassApi, UpdateExamSeatingApi, } from "@/app/components/shared/utils/apis"
import { ExamSeating, ExamType, Examinit, Seating, examSeatingInit, seatingInit } from "@/app/components/shared/model/examhelper"
import SelectArryField from "@/app/components/shared/forms-elements/selectArray"
import NumberField from "@/app/components/shared/forms-elements/numberfield-html"
import Breadcrumb from "@/app/components/shared/utils/breadcrumb"
import AllExamSeating from "@/app/components/backend/main/alltexamseating"
import { RoomType, Roominit } from "@/app/components/shared/model/roomhelper"
import { ClassOptionType, ClassOptioninitial } from "@/app/components/shared/model/classhelper"
import { calculateUsedRoomCapcity } from "@/app/components/shared/utils/helperfunction"
const drawerWidth = "w-[750px]"


const Page = () => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [openDrawer, setOpenDrawer] = useState(false)
  const [formValues, setformValues] = useState<ExamSeating>(examSeatingInit);
  const [room, setRoom] = useState<RoomType>(Roominit)
  const [exam, setExam] = useState<ExamType>(Examinit);
  const [allClassOpt, setallClassOpt] = useState<Array<ClassOptionType>>([ClassOptioninitial])
  const [newData, setNewData] = useState<any>();
  const [usedCapcity, setUsedCapcity] = useState(0);
  useEffect(() => { getClass() }, [newData])
  const getClass = async () => {
    const data = await GetAllClassApi()
    setallClassOpt(data.data.map((x: any) => {
      x.value = x._id;
      if (x.section.length > 0) { x.section = x.section.map((y: any) => { y.value = y._id; return y }) }
      return x
    }));
  }

  const onSubmit = async (values: ExamSeating) => {
    if (+room.seat_capcity >= usedCapcity) {
      const body = { exam_id: exam._id, seating: values.seating, exam_seating_id: values._id }
      let data = await UpdateExamSeatingApi(body)
      setNewData(data.data)
      seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
      setOpenDrawer(false)
    } else {
      seAlertData({ showSwall: Math.random(), className: "error", message: "Used Capcity is more than Room Capcity" })
    }
  }

  const reciveDataTobeEdited = (data: ExamType, exam_seating: any) => {
    setformValues({ ...exam_seating, seating: exam_seating.seating.map((seat: Seating) => { return { ...seat, selectedClassOpt: allClassOpt.find(x => x._id == seat.class_id) } }) })
    setExam(data)
    //  let newexam_seating = exam_seating.seating.map((seat:Seating)=>{ return {...seat,selectedClassOpt:allClassOpt.find(x => x._id == seat.class_id)}})
    setRoom(exam_seating.room_id)
    setUsedCapcity(calculateUsedRoomCapcity(exam_seating.seating))
    setOpenDrawer(true)
  }


  return (
    <>
      <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Exam </span> Seating</h1>
          {/* <button className="btn-outline-light rounded-full" onClick={() => { setOpenDrawer(true); setformValues(examSeatingInit); setExam(Examinit);}}> <PlusIcon />  Add </button> */}
        </div>
        <AllExamSeating newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false); }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
            <TabBar tabs={["Seating"]} onOptionClick={(val) => { }} />
            {openDrawer && <Formik onSubmit={onSubmit} initialValues={formValues || examSeatingInit}
            >
              {({ values, errors, touched, setFieldValue, handleChange }) => <>
                <Form>
                  <Tabcontainer show={true} >
                    <div className="flex justify-between mb-5">
                      <Breadcrumb options={[exam.title, room?.name]} />
                      <span>
                        <span className="c-text-success mr-5">Capcity : {room.seat_capcity}</span>
                        <span className="c-text-error">Used : {usedCapcity}</span>
                      </span>
                    </div>
                    <FieldArray name="seating">
                      {({ push, remove, form: { values: { seating } } }) =>
                        <>
                          {seating && seating.length > 0 && seating.map((seat: Seating, i: number) =>
                            <div key={i} className="grid grid-cols-11 gap-x-2 c-border-b-dark mb-3">
                              <SelectArryField options={allClassOpt} className="col-span-3" firstOption="Class"
                                errors={errors.seating && errors.seating[i]} value={seat.class_id} label="Class" name={`seating[${i}].class_id`}
                                onChange={(e: any) => {
                                  setFieldValue(`seating[${i}].class_id`, e.target.value)
                                  setFieldValue(`seating[${i}].selectedClassOpt`, allClassOpt.find(x => x._id == e.target.value))
                                }} />
                              <SelectArryField options={seat.selectedClassOpt?.section || []} className="col-span-3" firstOption="Section"
                                errors={errors.seating && errors.seating[i]} value={seat.section_id} label="Section" name={`seating[${i}].section_id`}
                                onChange={(e: any) => { setFieldValue(`seating[${i}].section_id`, e.target.value) }} />

                              <NumberField className="col-span-2" touched={Boolean(touched.seating && touched.seating[i])} errors={errors.seating && errors.seating[i]} value={seat.roll_no_from} label="Roll No From" name={`seating[${i}].roll_no_from`} onChange={handleChange} onBlur={() => {
                                setUsedCapcity(calculateUsedRoomCapcity(seating))
                              }} />
                              <NumberField className="col-span-2" touched={Boolean(touched.seating && touched.seating[i])} errors={errors.seating && errors.seating[i]} value={seat.roll_no_to} label="Roll No To" name={`seating[${i}].roll_no_to`} onChange={handleChange} onBlur={() => {
                                setUsedCapcity(calculateUsedRoomCapcity(seating))
                              }} />


                              <button disabled={i == 0 && seating.length == 1} className="btn-outline-error  col-span-1  w-12 mt-6" type="button" onClick={() => { remove(i) }}> <PlusIcon className="fill-svg-error rotate-45 p-0" /> </button>
                            </div>
                          )}
                          <button className="btn-outline-success rounded-full" type="button" onClick={() => { push(seatingInit) }}> <PlusIcon className="fill-svg-success" /> More</button>
                        </>
                      }
                    </FieldArray>
                  </Tabcontainer>
                  <div className="mx-4 h-16">
                    <button type="submit" className="btn-outline-success w-full">Update</button>
                  </div>
                </Form>
              </>}
            </Formik>
            }
          </div>
        </div>
      </aside>
    </>
  )
}

export default Page

