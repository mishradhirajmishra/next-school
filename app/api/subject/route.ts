import { NextRequest, NextResponse } from "next/server";
 
import connectDB from "@/app/server/helper/dbconnect";
import {Subject} from "@/app/server/model/subject";

export async function GET(request: NextRequest) {
  connectDB()
  let response = await Subject.find({})
    .then((allsub) => { return [{ data: allsub, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json(); 
  console.log(body)
  if (body._id == "") {
    delete body._id;

    let response = await new Subject(body).save()
      .then((sub: any) => { return [{ data: sub, class: "success", msg: "Subject created successfully" }, { status: 201 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  } else {
    let response = await Subject.findByIdAndUpdate(body._id, body, { upsert: true })
      .then((sub: any) => { return [{ data: sub, class: "success", msg: "Subject updated successfully" }, { status: 200 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  }
}

export async function DELETE(request: NextRequest) {
  connectDB()
  const _id = request.nextUrl.searchParams.get("_id")
  let response = await Subject.findOneAndDelete({ _id: _id })
    .then((sub) => { return [{ data: sub, class: "success", msg: "Subject deleted successfully" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}