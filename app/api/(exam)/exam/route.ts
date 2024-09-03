import { NextRequest, NextResponse } from "next/server"; 
import connectDB from "@/app/server/helper/dbconnect";
import {Exam} from "@/app/server/model/exam";

export async function GET(request: NextRequest) {
  connectDB()
  let response = await Exam.find({}).populate('include.class',"name section.name section._id section.same_syllabus_as_section_id")
    .then((allexam) => { return [{ data: allexam, class: "success" }, { status: 200 }] })
    .catch((error) => {console.log(error);  return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json();
  if (body._id == "") {
    delete body._id
    let response = await new Exam(body).save()
      .then((sub: any) => { return [{ data: sub, class: "success", msg: "Exam created successfully" }, { status: 201 }] })
      .catch((error: any) => {  return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  } else {
    let response = await Exam.findByIdAndUpdate(body._id, body, { upsert: true })
      .then((sub: any) => { return [{ data: sub, class: "success", msg: "Exam updated successfully" }, { status: 200 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  }
}

export async function PATCH(request: NextRequest) {
  connectDB()
  const body = await request.json() 
  let response = await Exam.findByIdAndUpdate(body.exam_id, 
    { $set: { "include.$[i].timeTable": body.timeTable}},
  {
    arrayFilters: [
      { "i._id": body.include_id }        
    ],
  })
    .then((cl: any) => { return [{ data: cl, class: "success", msg: "Exam Time-Table updated successfully" }, { status: 200 }] })
    .catch((error: any) => {   return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);   
}

