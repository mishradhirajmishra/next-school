"use client"
import TabBar from "@/app/components/shared/tabs/tabbar"
import Tabcontainer from "@/app/components/shared/tabs/tabcontainer"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import PlusIcon from "@/app/components/shared/Icons/plus"
import Swall from "@/app/components/shared/utils/swal"
import { CreateBookApi, GetAllClassApi, UpdateBookApi } from "@/app/components/shared/utils/apis"
 
import TextField from "@/app/components/shared/forms-elements/textfield"
import ToggleSingleField from "@/app/components/shared/forms-elements/togglesingle"

import RadioField from "@/app/components/shared/forms-elements/radiofield"
import NumberField from "@/app/components/shared/forms-elements/numberfield"
import { bookIssueInit, BookIssueType, BookType, bookTypeInit ,BookValidationSchema} from "@/app/components/shared/model/libraryhelper"
import AllBook from "@/app/components/backend/masterdata/allbook"
import SelectField from "@/app/components/shared/forms-elements/select"
import { ClassOptioninitial, ClassOptionType } from "@/app/components/shared/model/classhelper"
import SelectArryField from "@/app/components/shared/forms-elements/selectArray"
import ToEmployee from "@/app/components/backend/sub/bookissue/toemployee"
import ToStudents from "@/app/components/backend/sub/bookissue/tostudents"
import BookReturn from "@/app/components/backend/sub/bookissue/bookreturn"
const drawerWidth = "w-[750px]"


const Page = () => {
  const [alertData, seAlertData] = useState({ showSwall: 0, className: "", message: "" })
  const [openDrawer, setOpenDrawer] = useState(false)
  const [type, setType] = useState("edit");
  const [activeTab, setActiveTab] = useState(0);
  const [formValues, setformValues] = useState<BookType>(bookTypeInit);
  const [formValuesIssue, setformValuesIssue] = useState<BookIssueType>(bookIssueInit);
  const [newData, setNewData] = useState<BookType>(bookTypeInit);
  const [allClassOpt, setallClassOpt] = useState<Array<ClassOptionType>>([ClassOptioninitial])
  const [selectedClassOpt, setselectedClassOpt] = useState<ClassOptionType>(ClassOptioninitial)

  useEffect(() => { getClass() }, [newData])
  const getClass = async () => {
    const data = await GetAllClassApi()
    setallClassOpt(data.data.map((x: any) => {
      x.value = x._id;
      if (x.section.length > 0) { x.section = x.section.map((y: any) => { y.value = y._id; return y }) }
      return x
    }));
  }

 
  const onSubmit = async (values: BookType) => { 
     if(values._id==""){
    //@ts-ignore
    let length = +values.no_of_copies;
    var body = Array.from({ length: length }, (book,i) => ({ 
      book_code : values.book_code,
      book_copy_code:"COPY NO - "+ (i+1),
      title: values.title,
      author : values.author,
      description : values.description,
      price : values.price,
      status : values.status,
      type : values.type,
      class : values.class,
      section : values.section,}))
    let data = await CreateBookApi(body)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValues(bookTypeInit)
    setOpenDrawer(false)
     }else{
    let data = await UpdateBookApi(values)
    setNewData(data.data)
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    setformValues(bookTypeInit)
    setOpenDrawer(false)
     }

  }

  const reciveDataTobeEdited = (type:string,data: any) => {
    setType(type)
    if(type=="book-return"){  setformValuesIssue(data) }else{ setformValues(data) }
    setOpenDrawer(true)
  }

  const onSbmitForm=(data:any)=>{
    seAlertData({ showSwall: Math.random(), className: data.class, message: data.msg })
    if(data.class=="success"){setOpenDrawer(false)}              
    setNewData(data.data)
 }

  return (
    <>
      <Swall swallData={alertData} />
      <div className="flex flex-col w-full overflow-y-auto  h-[calc(100vh-48px)]  px-10 py-5 ">
        <div className="flex gap-10 ">
          <h1 className="block text-2xl font-bold  c-text-light"><span className="c-text-success">Boo</span>ks</h1>
          <button className="btn-outline-light rounded-full" onClick={() => { setOpenDrawer(true); setformValues(bookTypeInit) }}> <PlusIcon />  Add </button>
        </div>
        <AllBook newData={newData} reciveDataTobeEdited={reciveDataTobeEdited} />
      </div>
      <aside className={`${openDrawer ? "w-full" : "w-0"} duration-0 cursor-pointer z-0 right-0 absolute min-h-[calc(100vh-48px)]`}>
        <div onClick={() => { setOpenDrawer(false) }} className="c-bg-dark bg-opacity-50  h-[calc(100vh-48px)] absolute w-full"></div>
        <div className={`${openDrawer ? drawerWidth : "w-0"} c-bg-dark cursor-default z-10 duration-500 pt-5 right-0 absolute h-[calc(100vh-48px)]`}>
          <div className={`${openDrawer ? drawerWidth : "hidden"}`}>
            {type =="edit" && <>
            <TabBar  tabs={["Books"]} onOptionClick={(val) => {   }} />
            {openDrawer && <Formik onSubmit={onSubmit} initialValues={formValues || bookTypeInit} validationSchema={BookValidationSchema}>
              {({ values, errors, touched, setFieldValue, handleChange }) => <>
                <Form>
                  <Tabcontainer show={true} >
                    <div className="grid grid-cols-12 gap-x-2">
                    <TextField  className="col-span-9" touched={touched.title} errors={errors.title} value={values.title} label="Title" name="title" onChange={handleChange}/>
                    <TextField className="col-span-3" touched={touched.book_code} errors={errors.book_code} value={values.book_code} label="Book Code" name="book_code" onChange={handleChange}/>
                    <TextField className="col-span-12" touched={touched.description} errors={errors.description} value={values.description} label="description" name="description" onChange={handleChange}/>
                    <TextField className="col-span-12" touched={touched.place} errors={errors.place} value={values.place} label="Physical Location" name="place" onChange={handleChange}/>
                    <TextField className={`${formValues._id == ""?"col-span-5":"col-span-7"}`} touched={touched.author} errors={errors.author} value={values.author} label="author" name="author" onChange={handleChange}/>
                    <SelectField className="col-span-3" options={["Academic","Other"]} firstOption={"type"} errors={errors.type} value={values.type} label="type" name="type" onChange={(e:any)=>{
                      setFieldValue("type",e.target.value)
                      if(e.target.value !="Academic"){
                        setFieldValue("class","")
                        setFieldValue("section","")
                      }
                      }}  />

                    <NumberField className="col-span-2" touched={touched.price} errors={errors.price} value={values.price} label="price" name="price" onChange={handleChange}/>
                   {formValues._id == "" &&  <NumberField className="col-span-2" touched={touched.no_of_copies} errors={errors.no_of_copies} value={values.no_of_copies} label="No Of Copies" name="no_of_copies" onChange={handleChange}/>}
                    
                    {values.type=="Academic" && <SelectArryField options={allClassOpt} className="col-span-6" firstOption="Class" errors={errors.class} value={values.class} label="class" name="class" onChange={(e: any) => {
                        setFieldValue("class", e.target.value)
                        let allsection = allClassOpt.find(x => x._id == e.target.value)
                        if (allsection) { setselectedClassOpt(allsection) }
                        console.log("class", allsection?.section)
                      }} />}
                      {values.type=="Academic" && <SelectArryField options={selectedClassOpt.section} className="col-span-6" firstOption="Section" errors={errors.section} value={values.section} label="section" name="section" onChange={(e: any) => { setFieldValue("section", e.target.value) }} />}
                      {formValues._id != "" && 
                      <div className="col-span-12">
                        <RadioField options={["Available","Lost"]} touched={touched.status} errors={errors.status} value={values.status} label="status" name="status" onOptionClick={(val)=>{setFieldValue("status",val)}}  />
                     </div>    }
                     </div>
                  </Tabcontainer>
                  <div className="mx-4 h-16">
                    <button type="submit" className="btn-outline-success w-full">{formValues._id == "" ? "Add" : "Update"}</button>
                  </div>
                </Form>
              </>}
            </Formik>}
            </>}
            {type =="issue" && <>
            <TabBar tabs={["Issue Book To Students","Issue Book To Employee"]} onOptionClick={(val) => { setActiveTab(val) }} />
            <Tabcontainer   show={activeTab==0} >
            <ToStudents book={formValues}  onSbmitForm={(data:any)=>{onSbmitForm(data)}}/>   
            </Tabcontainer>
            <Tabcontainer   show={activeTab==1} >
            <ToEmployee book={formValues} onSbmitForm={(data:any)=>{onSbmitForm(data)}}/>   
            </Tabcontainer>             
            </>}
            {type =="book-return" && <>
            <TabBar tabs={["Book Return"]} onOptionClick={(val) => { setActiveTab(val) }} />
            <Tabcontainer   show={true} >
            <BookReturn  issue={formValuesIssue}  onSbmitForm={(data:any)=>{onSbmitForm(data)}}/>   
            </Tabcontainer>
            
            </>}
          </div>
        </div>
      </aside>
    </>
  )
}

export default Page

