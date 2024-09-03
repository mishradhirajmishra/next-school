import { NextRequest, NextResponse } from "next/server";
 
import connectDB from "@/app/server/helper/dbconnect";
import {Examinstruction} from "@/app/server/model/exam";
import {Examinstructionjson  } from "@/app/server/json/examinstruction";

export async function GET(request: NextRequest) {
  connectDB()
  let response = await Examinstruction.findOne({})
  .then((exm) => {
    if (exm !=null) {
      return [{ data: exm, class: "success" }, { status: 200 }] 
    } else { return insertData(); } 
  })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

const insertData = async () => {
  return await new Examinstruction(Examinstructionjson).save()
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
    let response = await new Examinstruction(body).save()
      .then((sub: any) => { return [{ data: sub, class: "success", msg: "Examinstruction created successfully" }, { status: 201 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  } else {
    let response = await Examinstruction.findByIdAndUpdate(body._id, body, { upsert: true })
      .then((sub: any) => { return [{ data: sub, class: "success", msg: "Examinstruction updated successfully" }, { status: 200 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  }
}
