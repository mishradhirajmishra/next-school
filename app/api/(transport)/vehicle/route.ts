import { NextRequest, NextResponse } from "next/server"; 
import connectDB from "@/app/server/helper/dbconnect";
import {Vehicle} from "@/app/server/model/transport";

export async function GET(request: NextRequest) {
  connectDB()
  let response = await Vehicle.find({})
    .then((allsub) => { return [{ data: allsub, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json();
  if (body._id == "") {
    delete body._id
    let response = await new Vehicle(body).save()
      .then((sub: any) => { return [{ data: sub, class: "success", msg: "Vehicle created successfully" }, { status: 201 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  } else {
    let response = await Vehicle.findByIdAndUpdate(body._id, body, { upsert: true })
      .then((sub: any) => { return [{ data: sub, class: "success", msg: "Vehicle updated successfully" }, { status: 200 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  }
}

export async function PATCH(request: NextRequest) {
  connectDB()
  const body = await request.json();
  if (body.mentinance._id == "") {
    delete body.mentinance._id
    let response = await Vehicle.findByIdAndUpdate({_id:body.vehicle_id},{$push: {mentinance: body.mentinance}}) 
      .then((sub: any) => { return [{ data: sub, class: "success", msg: "Vehicle created successfully" }, { status: 201 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  } else {
    let response = await Vehicle.findByIdAndUpdate(body.vehicle_id, 
      { $set: { "mentinance.$[i]": body.mentinance}},
    {
      arrayFilters: [
        { "i._id": body.mentinance._id }        
      ],
    })
      .then((sub: any) => { return [{ data: sub, class: "success", msg: "Vehicle updated successfully" }, { status: 200 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  }
}

export async function DELETE(request: NextRequest) {
  connectDB()
  const _id = request.nextUrl.searchParams.get("_id")
  let response = await Vehicle.findOneAndDelete({ _id: _id })
    .then((sub) => { return [{ data: sub, class: "success", msg: "Vehicle deleted successfully" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}