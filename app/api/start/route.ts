import { NextRequest, NextResponse } from "next/server";
import { Employee} from "@/app/server/model/employee";
import connectDB from "@/app/server/helper/dbconnect";  
import CorsHandler from "@/app/server/helper/corshandler";

export async function GET(request: NextRequest) {
  await CorsHandler(request)
  connectDB() 
  let response = await Employee.findOne({})
    .then((set) => { 
      if (set !=null) {
        return [{ data: set, class: "success" }, { status: 200 }] 
      } else { return insertData(); } 
    })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

const insertData = async () => {
   let body = { 
    emp_id: "EMP 1",
    reg_no: "REG 1",
    name: "Dummy Admin",
    gender: "Male",
    mobile: 1234323454,
    email: "admin@gmail.com",
    password: "123",
    role:"Admin"
  } 
  return await new Employee(body).save()
    .then((alltl: any) => {
      return [{ data: alltl, class: "success" }, { status: 200 }]
    })
    .catch((error: any) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
}
 
 