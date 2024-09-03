import { NextRequest, NextResponse } from "next/server";
 
import connectDB from "@/app/server/helper/dbconnect";
import {Student} from "@/app/server/model/student";
 

export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json()
  let response = await Student.find(body,{name:1,profile_image:1,guardian:1,gender:1,family_detail:1,status:1,class:1,section:1,optional_fee:1,sr_no:1,roll_no:1,fee_discount:1,pen_no:1,dob:1})
    .then((allemp) => { return [{ data: allemp, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);

}

export async function PATCH(request: NextRequest) {
  connectDB()
  const body = await request.json()
  let response = await Student.find(body,{name:1,profile_image:1, status:1, roll_no:1})
    .then((allemp) => { return [{ data: allemp, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);

}