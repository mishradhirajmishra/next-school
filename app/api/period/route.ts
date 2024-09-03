import { NextRequest, NextResponse } from "next/server";
 
import connectDB from "@/app/server/helper/dbconnect";
import {Period} from "@/app/server/model/class";

export async function GET(request: NextRequest) {
  connectDB()
  let response = await Period.find({})
    .then((allper) => { return [{ data: allper, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json()
  if (body._id == "") {
    delete body._id
    let response = await new Period(body).save()
      .then((stu: any) => { return [{ data: stu, class: "success", msg: "Period created successfully" }, { status: 201 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  } else {
    let response = await Period.findByIdAndUpdate(body._id, body, { upsert: true })
      .then((stu: any) => { return [{ data: stu, class: "success", msg: "Period updated successfully" }, { status: 200 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  }
}

export async function DELETE(request: NextRequest) {
  connectDB()
  const _id = request.nextUrl.searchParams.get("_id")
  let response = await Period.findOneAndDelete({ _id: _id })
    .then((stu) => { return [{ data: stu, class: "success", msg: "Period deleted successfully" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}