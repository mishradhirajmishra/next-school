import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/server/helper/dbconnect";
import { StuAttendance } from "@/app/server/model/student-attendance";
import { Student } from "@/app/server/model/student";
import { Setting } from "@/app/server/model/setting";
import { Leave } from "@/app/server/model/leave";


export async function GET(request: NextRequest) {
  connectDB()
  const class_id = request.nextUrl.searchParams.get('class_id');
  const section_id = request.nextUrl.searchParams.get('section_id');
  const date = request.nextUrl.searchParams.get('date');
   if(date !=null){
  let searchParams = { class: class_id, section: section_id, date: new Date(date) }
  let response = await StuAttendance.find(searchParams)
    .populate({ path: "student_id", model: Student, select: 'name roll_no profile_image' })
    .then((allattendance) => { return [{ type: "attendance", data: allattendance, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error, data: [], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}
}

export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json()
  let response = await Leave.find({ date: body.date, type: "leave" })
    .then((allleave) => {
       if (allleave.length) {
        return [{ type: "leave", msg:"Its Leave Today" ,data: allleave, class: "success" }, { status: 200 }]
      } else {
        return getAttendance(body)
      }
    })
    .catch((error) => { return [{ error: error, data: [], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}
 

const getAttendance = async (body:any) => {
     let search ={ class: body.class_id, section: body.section_id, date: new Date( body.date) }
  return await StuAttendance.find(search)
    .then((allattendance) => {
      if(allattendance.length){
        return [{ type: "attendance", msg: "Attendance already started",data: [],  class: "warn" }, { status: 200 }] 
      }
      else{
        return createAttendance(body) 
      }
     
      })
    .catch((error) => { return [{ error: error, data: [], class: "error" }, { status: 500 }] })
}


const createAttendance = async (body:any) => {
     var setteing:any = await Setting.findOne()
  return await Student.find({class:body.class_id,section:body.section_id},{_id:1,class:1,section:1})
    .then((allstu) => {
       if(allstu.length>0){
     let tempAttendance= allstu.map((x)=>{return {class:x.class,section:x.section,student_id:x._id,date:new Date(body.date),running_year: setteing.running_year}})
     return  insertData(tempAttendance)     
       }else{
        return [{ type: "attendance", msg: "No Student found in this section", data:allstu,  class: "error" }, { status: 200 }]  
       }  
          
    })
    .catch((error) => { return [{ error: error, data: [], class: "error" }, { status: 500 }] })
}

const insertData = async (tempAttendance:any) => {
  return StuAttendance.insertMany(tempAttendance)
    .then((alltl: any) => {
      return [{ data: alltl,msg:"Attendance Started Successfully", class: "success" }, { status: 200 }]
    })
    .catch((error: any) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
}


export async function PATCH(request: NextRequest) {
  connectDB()
  const body = await request.json()
  let response = await StuAttendance.findByIdAndUpdate(body._id, body, { upsert: true })
  .then((stu: any) => { return [{ data: stu, class: "success", msg: "Student Attendance updated successfully" }, { status: 200 }] })
  .catch((error: any) => { return [{ error: error, data: {}, class: "error" }, { status: 500 }] })
return NextResponse.json(response[0], response[1]);
}

