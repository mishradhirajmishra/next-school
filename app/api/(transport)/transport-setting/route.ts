import { NextRequest, NextResponse } from "next/server";
 
import connectDB from "@/app/server/helper/dbconnect";
import {Transportsetting} from "@/app/server/model/transport";
import { Tranportsettingjson } from "@/app/server/json/tranportsetting";


export async function GET(request: NextRequest) {
  connectDB()
 
  let response = await Transportsetting.findOne({})
    .then((set) => { 
      if (set !=null) {
        return [{ data: set, class: "success" }, { status: 200 }] 
      } else { return insertData(); } 
    })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

const insertData = async () => {

  return await new Transportsetting(Tranportsettingjson).save()
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
    let response = await new Transportsetting(body).save()
      .then((sub: any) => { return [{ data: sub, class: "success", msg: "Transportsetting created successfully" }, { status: 201 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  } else {
    let response = await Transportsetting.findByIdAndUpdate(body._id, body, { upsert: true })
      .then((sub: any) => { return [{ data: sub, class: "success", msg: "Transportsetting updated successfully" }, { status: 200 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  }
}
