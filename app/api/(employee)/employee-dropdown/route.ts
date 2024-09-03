import { NextRequest, NextResponse } from "next/server";
import { Employee} from "@/app/server/model/employee";
import connectDB from "@/app/server/helper/dbconnect";

export async function GET(request: NextRequest) {
  connectDB()
  const role = request.nextUrl.searchParams.get('role');
  var search = {}
  if(role!=""){ search = {role:role} }else{ search = {} }
  let response = await Employee.find(search,{name:1,_id:1,intresrted_subject:1,role:1})
    .then((allemp) => { return [{ data: allemp, class: "success" }, { status: 200 }] })
    .catch((error) => { console.log(error); return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}
 