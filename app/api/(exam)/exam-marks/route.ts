import { NextRequest, NextResponse } from "next/server";
 
import connectDB from "@/app/server/helper/dbconnect";
import {Exammark} from "@/app/server/model/exammarks";

export async function GET(request: NextRequest) {
  connectDB()
  const class_id = request.nextUrl.searchParams.get("class_id")
  const section_id = request.nextUrl.searchParams.get("section_id");
  const exam_id = request.nextUrl.searchParams.get("exam_id");
  let response = await Exammark.find({class:class_id,section:section_id,exam:exam_id})
    .then((allExamMarks) => { return [{ data: allExamMarks, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json(); 
  let response = await  Exammark.insertMany(body)
  .then((allExamMarks) => { return [{ data: allExamMarks, class: "success", msg: "Exam Marks created successfully"  }, { status: 200 }] })
  .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
return NextResponse.json(response[0], response[1]);
}



export async function PATCH(request: NextRequest) { 
  const body = await request.json() 
  let response = await Exammark.findByIdAndUpdate(body._id,{ marks:body.marks } )
    .then((cl: any) => { return [{ data: cl, class: "success", msg: "Exam Marks updated successfully" }, { status: 200 }] })
    .catch((error: any) => {console.log(error) ;return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);   
}
