import { NextRequest, NextResponse } from "next/server"; 
import connectDB from "@/app/server/helper/dbconnect";
import {Fee} from "@/app/server/model/fee";

export async function GET(request: NextRequest) {
  connectDB()
  let response = await Fee.find({})
    .then((allfee) => { return [{ data: allfee, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json();
 
  if (body._id == "") {
    delete body._id
    let response = await new Fee(body).save()
      .then((sub: any) => { return [{ data: sub, class: "success", msg: "Fee created successfully" }, { status: 201 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  } else {
    let response = await Fee.findByIdAndUpdate(body._id, body, { upsert: true })
      .then((sub: any) => { return [{ data: sub, class: "success", msg: "Fee updated successfully" }, { status: 200 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  }
}

export async function PATCH(request: NextRequest) {
  connectDB()
  const body = await request.json();
  if(body && body.length>1){
    await body.map(async (fee:any,i:number)=>{
      await Fee.findByIdAndUpdate(fee._id, {order:fee.order}, { upsert: true });
    })
  }
  return NextResponse.json({ class: "List Order Updated Successfully" }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  connectDB()
  const _id = request.nextUrl.searchParams.get("_id")
  let response = await Fee.findOneAndDelete({ _id: _id })
    .then((sub) => { return [{ data: sub, class: "success", msg: "Fee deleted successfully" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}