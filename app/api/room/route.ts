import { NextRequest, NextResponse } from "next/server";
 
import connectDB from "@/app/server/helper/dbconnect";
import {Room} from "@/app/server/model/room";

export async function GET(request: NextRequest) {
  connectDB()
  let response = await Room.find({})
    .then((allroom) => { return [{ data: allroom, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json(); 
  console.log(body)
  if (body._id == "") {
    delete body._id;

    let response = await new Room(body).save()
      .then((sub: any) => { return [{ data: sub, class: "success", msg: "Room created successfully" }, { status: 201 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  } else {
    let response = await Room.findByIdAndUpdate(body._id, body, { upsert: true })
      .then((sub: any) => { return [{ data: sub, class: "success", msg: "Room updated successfully" }, { status: 200 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  }
}

export async function DELETE(request: NextRequest) {
  connectDB()
  const _id = request.nextUrl.searchParams.get("_id")
  let response = await Room.findOneAndDelete({ _id: _id })
    .then((sub) => { return [{ data: sub, class: "success", msg: "Room deleted successfully" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}