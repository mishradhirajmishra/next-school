import { NextRequest, NextResponse } from "next/server";
import { Employee} from "@/app/server/model/employee";
import connectDB from "@/app/server/helper/dbconnect";

export async function GET(request: NextRequest) {
  connectDB()
  const employee_id = request.nextUrl.searchParams.get("employee_id")
  let response = await Employee.findOne({_id:employee_id})
    .then((allemp) => { return [{ data: allemp, class: "success" }, { status: 200 }] })
    .catch((error) => { console.log(error); return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}
 