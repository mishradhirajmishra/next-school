import { NextRequest, NextResponse } from "next/server";
import { Employee} from "@/app/server/model/employee";
import connectDB from "@/app/server/helper/dbconnect";

export async function GET(request: NextRequest) {
  connectDB()
  let response = await Employee.find({})
    .then((allemp) => { return [{ data: allemp, class: "success" }, { status: 200 }] })
    .catch((error) => { console.log(error); return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json()
  if (body._id == "") {
    delete body._id;
    body.password="123";
    let response = await new Employee(body).save()
      .then((emp: any) => { return [{ data: emp, class: "success", msg: "Employee created successfully" }, { status: 201 }] })
      .catch((error: any) => { console.log(error); return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  } else {
    let response = await Employee.findByIdAndUpdate(body._id, body, { upsert: true })
      .then((emp: any) => { return [{ data: emp, class: "success", msg: "Employee updated successfully" }, { status: 200 }] })
      .catch((error: any) => { console.log(error); return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  }
}

export async function DELETE(request: NextRequest) {
  connectDB()
  const _id = request.nextUrl.searchParams.get("_id")
  let response = await Employee.findOneAndDelete({ _id: _id })
    .then((emp) => { return [{ data: emp, class: "success", msg: "Employee deleted successfully" }, { status: 200 }] })
    .catch((error) => { console.log(error); return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}