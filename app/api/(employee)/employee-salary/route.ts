import { NextRequest, NextResponse } from "next/server";
import { Employeesalary} from "@/app/server/model/employee";
import connectDB from "@/app/server/helper/dbconnect";

export async function GET(request: NextRequest) {
  connectDB()
  const employee_id = request.nextUrl.searchParams.get('employee_id');
  const running_year = request.nextUrl.searchParams.get('running_year');
  let response = await Employeesalary.find({employee_id:employee_id ,running_year:running_year})
    .then((allemp) => { return [{ data: allemp, class: "success" }, { status: 200 }] })
    .catch((error) => { console.log(error); return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json()
  if (body._id == "") {
    delete body._id;    
   const exist= await Employeesalary.find({employee_id:body.employee_id,month:body.month,running_year:body.running_year})
   if(exist.length==0){
    let response = await new Employeesalary(body).save()
      .then((emp: any) => { return [{  class: "success", msg: "Employee Salary Generated successfully" }, { status: 201 }] })
      .catch((error: any) => { console.log(error); return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
      return NextResponse.json(response[0], response[1]);
    }
  let  response=[{ class: "error", msg: "Employee Salary already Generated" }, { status: 201 }]
    return NextResponse.json(response[0], response[1]);
  } else {
    let response = await Employeesalary.findByIdAndUpdate(body._id, body, { upsert: true })
      .then((emp: any) => { return [{ data: emp, class: "success", msg: "Employee Salary updated successfully" }, { status: 200 }] })
      .catch((error: any) => { console.log(error); return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  }
}

export async function DELETE(request: NextRequest) {
  connectDB()
  const _id = request.nextUrl.searchParams.get("_id")
  let response = await Employeesalary.findOneAndDelete({ _id: _id })
    .then((emp) => { return [{ data: emp, class: "success", msg: "Employee Salary deleted successfully" }, { status: 200 }] })
    .catch((error) => { console.log(error); return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}