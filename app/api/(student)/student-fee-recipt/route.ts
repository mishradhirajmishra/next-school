import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/server/helper/dbconnect";
import { Class } from "@/app/server/model/class";
import { StudentFeeRecipt } from "@/app/server/model/student-fee-recipt";


export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json(); 
    console.log(body)
  if (body._id == "") {
    delete body._id
    let response = await new StudentFeeRecipt(body).save()
      .then((sub: any) => { return [{ data: sub, class: "success", msg: "StudentFeeRecipt created successfully" }, { status: 201 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  } else {
    let response = await StudentFeeRecipt.findByIdAndUpdate(body._id, body, { upsert: true })
      .then((sub: any) => { return [{ data: sub, class: "success", msg: "StudentFeeRecipt updated successfully" }, { status: 200 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  }
}

export async function PATCH(request: NextRequest) {
  connectDB()
  const body = await request.json()
  let response = await StudentFeeRecipt.find(body,)
    .then((allemp) => { return [{ data: allemp, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

