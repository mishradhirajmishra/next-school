import { NextRequest, NextResponse } from "next/server";
 
import connectDB from "@/app/server/helper/dbconnect";
import {Lessionplan} from "@/app/server/model/lession-plan";

export async function GET(request: NextRequest) {
  connectDB()
  const class_id = request.nextUrl.searchParams.get("class_id")
  const section_id = request.nextUrl.searchParams.get("section_id");
  const subject_id = request.nextUrl.searchParams.get("subject_id");
  let response = await Lessionplan.findOne({class:class_id,section:section_id,subject:subject_id})
    .then((allLesson) => { return [{ data: allLesson, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}


export async function PATCH(request: NextRequest) { 
  const body = await request.json() 
  console.log()
  let response = await Lessionplan.findByIdAndUpdate(body.lesson_plan_id, 
    { $set: { "lesson.$[i].question": body.question}},
  {
    arrayFilters: [
      { "i._id": body.lesson_id }        
    ],
  })
    .then((cl: any) => { return [{ data: cl, class: "success", msg: "Syllabus updated successfully" }, { status: 200 }] })
    .catch((error: any) => {console.log(error) ;return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);   
}
