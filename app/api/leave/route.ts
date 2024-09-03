import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/app/server/helper/dbconnect";
import { Leave } from "@/app/server/model/leave";

export async function GET(request: NextRequest) {
  connectDB()
  let response = await Leave.find({})
    .then((allleave) => { return [{ data: allleave, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error, data: [], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json()
  let response = await Leave.insertMany(body)
    .then((leave: any) => { return [{ data: leave, class: "success", msg: "Leave created successfully" }, { status: 201 }] })
    .catch((error: any) => { return [{ error: error, data: {}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}
export async function PATCH(request: NextRequest) {
  connectDB()
  const body = await request.json()
   console.log("========",body)
  let response = await Leave.findByIdAndUpdate(body._id, body, { upsert: true })
    .then((leave: any) => { return [{ data: leave, class: "success", msg: "Leave updated successfully" }, { status: 200 }] })
    .catch((error: any) => { return [{ error: error, data: {}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

export async function DELETE(request: NextRequest) {
  connectDB()
  const _id = request.nextUrl.searchParams.get("_id")
  let response = await Leave.findOneAndDelete({ _id: _id })
    .then((leave) => { return [{ data: leave, class: "success", msg: "Leave deleted successfully" }, { status: 200 }] })
    .catch((error) => { return [{ error: error, data: {}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}