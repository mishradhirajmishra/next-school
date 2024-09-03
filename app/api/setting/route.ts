import { NextRequest, NextResponse } from "next/server";
 
import connectDB from "@/app/server/helper/dbconnect";
import {Setting} from "@/app/server/model/setting";
import { Settingjson } from "@/app/server/json/setting";


export async function GET(request: NextRequest) {
  connectDB() 
  let response = await Setting.findOne({})
    .then((set) => { 
      if (set !=null) {
        return [{ data: set, class: "success" }, { status: 200 }] 
      } else { return insertData(); } 
    })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

const insertData = async () => {

  return await new Setting(Settingjson).save()
    .then((alltl: any) => {
      return [{ data: alltl, class: "success" }, { status: 200 }]
    })
    .catch((error: any) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
}
export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json(); 
  if (body._id == "") {
    delete body._id;
    let response = await new Setting(body).save()
      .then((sub: any) => { return [{ data: sub, class: "success", msg: "Setting created successfully" }, { status: 201 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  } else {
    let response = await Setting.findByIdAndUpdate(body._id, body, { upsert: true })
      .then((sub: any) => { return [{ data: sub, class: "success", msg: "Setting updated successfully" }, { status: 200 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  }
}
