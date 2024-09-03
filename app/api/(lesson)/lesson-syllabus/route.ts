import { NextRequest, NextResponse } from "next/server";
 
import connectDB from "@/app/server/helper/dbconnect";
import {Lessionplan} from "@/app/server/model/lession-plan";

export async function GET(request: NextRequest) {
  connectDB()
  const class_id = request.nextUrl.searchParams.get("class_id")
  const section_id = request.nextUrl.searchParams.get("section_id");
  let response = await Lessionplan.find({class:class_id,section:section_id})
    .then((allLesson) => { return [{ data: allLesson, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}


export async function PATCH(request: NextRequest) {
  connectDB()
  const body = await request.json() 
  let response = await Lessionplan.findByIdAndUpdate(body.LessonPlan_id, 
    { $set: { "lesson.$[i].syllabus": body.syllabus}},
  {
    arrayFilters: [
      { "i._id": body.lesson_id }        
    ],
  })
    .then((cl: any) => { return [{ data: cl, class: "success", msg: "Syllabus updated successfully" }, { status: 200 }] })
    .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);   
}
