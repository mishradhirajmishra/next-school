import { NextRequest, NextResponse } from "next/server";
 
import connectDB from "@/app/server/helper/dbconnect";
import {Exam} from "@/app/server/model/exam";
export async function PATCH(request: NextRequest) {
  connectDB()
  const body = await request.json() 
  let response = await Exam.findByIdAndUpdate(body.exam_id, 
    { $set: { "exam_seating.$[i].seating": body.seating}},
  {
    arrayFilters: [
      { "i._id": body.exam_seating_id }        
    ],
  })
    .then((cl: any) => { return [{ data: cl, class: "success", msg: "Exam Seating updated successfully" }, { status: 200 }] })
    .catch((error: any) => {   return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);   
}