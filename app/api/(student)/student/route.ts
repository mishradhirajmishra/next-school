import { NextRequest, NextResponse } from "next/server";
 
import connectDB from "@/app/server/helper/dbconnect";
import {Student} from "@/app/server/model/student";

// export async function GET(request: NextRequest) {
//   connectDB()
//   let response = await Student.find({})
//     .then((allemp) => { return [{ data: allemp, class: "success" }, { status: 200 }] })
//     .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
//   return NextResponse.json(response[0], response[1]);
// }

export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json()
  if (body._id == "") {
    delete body._id
    let response = await new Student(body).save()
      .then((stu: any) => { return [{ data: stu, class: "success", msg: "Student created successfully" }, { status: 201 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  } else { 
    let response = await Student.findByIdAndUpdate(body._id, body, { upsert: true })
      .then((stu: any) => { return [{ data: stu, class: "success", msg: "Student updated successfully" }, { status: 200 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  }
}

export async function PATCH(request: NextRequest) {
  connectDB()
  const body = await request.json()
  let response = await Student.find(body)
    .then((allemp) => { return [{ data: allemp, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

 
export async function DELETE(request: NextRequest) {
  connectDB()
  const _id = request.nextUrl.searchParams.get("_id")
  let response = await Student.findOneAndDelete({ _id: _id })
    .then((stu) => { return [{ data: stu, class: "success", msg: "Student deleted successfully" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}