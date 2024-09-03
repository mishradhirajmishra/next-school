import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/server/helper/dbconnect";   
import { Periodjson } from "@/app/server/json/periodlist";
import { Periodoption } from "@/app/server/model/periodoption";

export async function GET(request: NextRequest) {
  connectDB()
  let response = await Periodoption.find({})
    .then((alltl: any[]) => {
      if (alltl.length > 0) {
        return [{ data: alltl, class: "success" }, { status: 200 }]
      } else { return insertData(); }
    })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

const insertData = async () => {
  return Periodoption.insertMany(Periodjson)
    .then((alltl: any) => {
      return [{ data: alltl, class: "success" }, { status: 200 }]
    })
    .catch((error: any) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
}

export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json()
  let response = await Periodoption.findByIdAndUpdate(body._id, body, { upsert: true })
    .then((tl: any) => { return [{ data: tl, class: "success", msg: "Periodoption updated successfully" }, { status: 200 }] })
    .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}