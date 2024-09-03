"use client"

import TabBar from "@/app/components/shared/tabs/tabbar"
import PlusIcon from "@/app/components/shared/Icons/plus"
import Swall from "@/app/components/shared/utils/swal"
import { useSession } from "next-auth/react"
import AllStudentsFee from "@/app/components/backend/main/allstudentsfee"
import { StudentFeePaymentType, StudentFeePaymentInit } from "@/app/components/shared/model/feehelper"
import Tabcontainer from "@/app/components/shared/tabs/tabcontainer"
import { Form, Formik } from "formik"
import TextField from "@/app/components/shared/forms-elements/textfield"
import RadioField from "@/app/components/shared/forms-elements/radiofield"
import NumberField from "@/app/components/shared/forms-elements/numberfield"
import DateField from "@/app/components/shared/forms-elements/datefield"
import DoubleArrowRightIcon from "@/app/components/shared/Icons/doubleArrowRight"
import { useState } from "react"
import { CreateUpdateStudentFeePaymentApi } from "@/app/components/shared/utils/apis"
import { getRunningYear } from "@/app/components/shared/utils/helperfunction"
import Breadcrumb from "@/app/components/shared/utils/breadcrumb"

const drawerWidth = "w-[750px]"

const Page = () => {
  const { data: session, status } = useSession()
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [openDrawer, setOpenDrawer] = useState(false)
  const [formValues, setformValues] = useState<StudentFeePaymentType>(StudentFeePaymentInit);
  const [newData, setNewData] = useState<StudentFeePaymentType>(StudentFeePaymentInit);

  const onSubmit = async (values: any) => {
    values.running_year = getRunningYear()
    let data = await CreateUpdateStudentFeePaymentApi(values)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValues(StudentFeePaymentInit)
    setOpenDrawer(false)
  }
  const reciveDataTobeEdited = (data: StudentFeePaymentType) => {
    console.log(data)
    setformValues({ ...StudentFeePaymentInit, ...data, })
    setOpenDrawer(true)
  }

  return (
    <>
      <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Stu</span>dents</h1>
          <button disabled={session?.user.role != "Admin"} className="btn-outline-light rounded-full" onClick={() => {
            setOpenDrawer(true);
          }}> <PlusIcon />  Add </button>
        </div>
        <AllStudentsFee newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false); }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
            <TabBar tabs={["Mnthaly",]} onOptionClick={(val) => { }} />
            {openDrawer && <Formik onSubmit={onSubmit} initialValues={formValues}>
              {({ values, errors, touched, setFieldValue, handleChange }) => <>
                <Form>
                  <Tabcontainer show={true} >
                    {formValues && formValues.class_name!=undefined && formValues.section_name !=undefined && formValues.stu_name !=undefined &&
                         <Breadcrumb options={[formValues.class_name,formValues.section_name,formValues.stu_name]}/> }
                    <div className="grid grid-cols-12 gap-x-2">
                      <RadioField className="col-span-12" options={["Cash", "Cheque/DD", "UPI"]} touched={touched.payment_mode} errors={errors.payment_mode} value={values.payment_mode} label="Payment Mode" name="payment_mode" onOptionClick={(val) => { setFieldValue("payment_mode", val) }} />
                      {values.payment_mode == "Cheque/DD" && <NumberField className="col-span-3" touched={touched.cheque_dd_no} errors={errors.cheque_dd_no} value={values.cheque_dd_no} label="Cheque/DD No" name="cheque_dd_no" onChange={handleChange} />}
                      {values.payment_mode == "Cheque/DD" && <DateField className="col-span-3" touched={touched.cheque_dd_date} errors={errors.cheque_dd_date} value={values.cheque_dd_date} label="Cheque/DD Date" name="cheque_dd_date" onChange={handleChange} />}
                      {values.payment_mode == "UPI" && <TextField className="col-span-6" touched={touched.transaction_id} errors={errors.transaction_id} value={values.transaction_id} label="Transaction Id" name="transaction_id" onChange={handleChange} />}
                      <NumberField className="col-span-3" touched={touched.amount} errors={errors.amount} value={values.amount} label="amount" name="amount" onChange={handleChange} />
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
