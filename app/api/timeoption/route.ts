import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/server/helper/dbconnect";  
import { TimeOption } from "@/app/server/model/timeOption";
import { Timejson } from "@/app/server/json/timelist";

export async function GET(request: NextRequest) {
  connectDB()
  let response = await TimeOption.find({})
    .then((alltl: any[]) => {
      if (alltl.length > 0) {
        return [{ data: alltl, class: "success" }, { status: 200 }]
      } else { return insertData(); }
    })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

const insertData = async () => {
  return TimeOption.insertMany(Timejson)
    .then((alltl: any) => {
      return [{ data: alltl, class: "success" }, { status: 200 }]
    })
    .catch((error: any) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
}

export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json()
  let response = await TimeOption.findByIdAndUpdate(body._id, body, { upsert: true })
    .then((tl: any) => { return [{ data: tl, class: "success", msg: "TimeOption updated successfully" }, { status: 200 }] })
    .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}