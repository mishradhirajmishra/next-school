import { NextRequest, NextResponse } from "next/server"; 
import connectDB from "@/app/server/helper/dbconnect";
import {Exam} from "@/app/server/model/exam";

 
export async function PATCH(request: NextRequest) {
  connectDB()
  const body = await request.json() 
  let response = await Exam.findByIdAndUpdate(body.exam_id, 
    { $set: { "include.$[i].timeTable.$[j].question_paper": body.question_paper}},
  {
    arrayFilters: [
      { "i._id": body.include_id },        
      { "j._id": body.timeTable_id }        
    ],
  })
    .then((cl: any) => { return [{ data: cl, class: "success", msg: "Exam Question updated successfully" }, { status: 200 }] })
    .catch((error: any) => { console.log(error);   return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);   
}

