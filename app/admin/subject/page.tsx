"use client"
import TabBar from "@/app/components/shared/tabs/tabbar"
import Tabcontainer from "@/app/components/shared/tabs/tabcontainer"
import { Form, Formik } from "formik"
import { useState } from "react"
import PlusIcon from "@/app/components/shared/Icons/plus"
import Swall from "@/app/components/shared/utils/swal"
import { CreateUpdateSubjectApi } from "@/app/components/shared/utils/apis"
import { SubjectType, Subjectinit, SubjectvalidationSchema } from "@/app/components/shared/model/subjecthelper"
import TextField from "@/app/components/shared/forms-elements/textfield"
import AllSubject from "@/app/components/backend/masterdata/allsubject"
import ToggleSingleField from "@/app/components/shared/forms-elements/togglesingle"
const drawerWidth = "w-[750px]"


const Page = () => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [openDrawer, setOpenDrawer] = useState(false)
  const [activeTab, setActiveTab] = useState(0);
  const [formValues, setformValues] = useState<SubjectType>(Subjectinit);
  const [newData, setNewData] = useState<SubjectType>(Subjectinit);

  const onSubmit = async (values: SubjectType) => {
    values.slug = values.name.trim().toLowerCase().replace(/ /g, "-");
    let data = await CreateUpdateSubjectApi(values)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValues(Subjectinit)
    setOpenDrawer(false)
  }
  const reciveDataTobeEdited = (data: SubjectType) => {
    setformValues(data)
    setOpenDrawer(true)
  }
  return (
    <>
      <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Sub</span>ject</h1>
          <button className="btn-outline-light rounded-full" onClick={() => { setOpenDrawer(true); setformValues(Subjectinit) }}> <PlusIcon />  Add </button>
        </div>
        <AllSubject newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false) }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
            <TabBar tabs={["Subject"]} onOptionClick={(val) => { setActiveTab(val) }} />
            {openDrawer && <Formik onSubmit={onSubmit} initialValues={formValues || Subjectinit} validationSchema={SubjectvalidationSchema}>
              {({ values, errors, touched, setFieldValue, handleChange }) => <>
                <Form>
                  <Tabcontainer show={activeTab == 0} >
                    <TextField touched={touched.name} errors={errors.name} value={values.name} label="name" name="name" onChange={handleChange} />
                    <ToggleSingleField className="c-form-label" value={values.optional == "Yes" ? true : false} label="Optional" name="optional" onOptionClick={(val: boolean) => { val ? setFieldValue("optional", "Yes") : setFieldValue("optional", "No"); }} />
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

