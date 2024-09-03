import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/server/helper/dbconnect";
import { EmpAttendance } from "@/app/server/model/employee-attendance";
import { Employee } from "@/app/server/model/employee";
import { Leave } from "@/app/server/model/leave";
import { Setting } from "@/app/server/model/setting";

export async function GET(request: NextRequest) {
  connectDB()  
  const date = request.nextUrl.searchParams.get('date');
   if(date !=null){
  let response = await EmpAttendance.find({date: new Date(date) })
     .populate({ path: "employee_id", model: Employee, select: 'name profile_image' })
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
  let search ={date: new Date( body.date) }
  return await EmpAttendance.find(search)
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
  return await Employee.find({},{_id:1,name:1})
    .then((allEmp) => {
       if(allEmp.length>0){
     let tempAttendance= allEmp.map((x)=>{return {employee_id:x._id,date:new Date(body.date),running_year: setteing.running_year}})
     return  insertData(tempAttendance)     
       }else{
        return [{ type: "attendance", msg: "No Employee found", data:allEmp,  class: "error" }, { status: 200 }]  
       }  
          
    })
    .catch((error) => { return [{ error: error, data: [], class: "error" }, { status: 500 }] })
}

const insertData = async (tempAttendance:any) => {
  return EmpAttendance.insertMany(tempAttendance)
    .then((alltl: any) => {
      return [{ data: alltl,msg:"Attendance Started Successfully", class: "success" }, { status: 200 }]
    })
    .catch((error: any) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
}


export async function PATCH(request: NextRequest) {
  connectDB()
  const body = await request.json()
  let response = await EmpAttendance.findByIdAndUpdate(body._id, body, { upsert: true })
  .then((stu: any) => { return [{ data: stu, class: "success", msg: "Employee Attendance updated successfully" }, { status: 200 }] })
  .catch((error: any) => { return [{ error: error, data: {}, class: "error" }, { status: 500 }] })
return NextResponse.json(response[0], response[1]);
}

