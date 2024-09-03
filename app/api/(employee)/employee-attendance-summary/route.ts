import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/server/helper/dbconnect";
import { EmpAttendance } from "@/app/server/model/employee-attendance";
import { Employee } from "@/app/server/model/employee";


export async function GET(request: NextRequest) {
  connectDB()  
  const employee_id = request.nextUrl.searchParams.get('employee_id');
  const running_year = request.nextUrl.searchParams.get('running_year');
   console.log(employee_id,running_year)
  //  console.log(employee_id)
   if(employee_id !=null){
  let response = await EmpAttendance.find({employee_id:employee_id ,running_year:running_year})
    //  .populate({ path: "employee_id", model: Employee, select: 'name profile_image' })
    .then((allattendance) => { return [{ type: "attendance", data: allattendance, class: "success" }, { status: 200 }] })
    .catch((error) => {  return [{ error: error, data: [], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}
}


