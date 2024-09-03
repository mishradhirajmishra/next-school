import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/server/helper/dbconnect";
import { Class } from "@/app/server/model/class";

export async function GET(request: NextRequest) {
  connectDB()
  let response = await Class.find({},{"name":1,"section.fee":1,"section.name":1,"section._id":1})
  .then((allcl) => { return [{ data: allcl, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json()
  let response = await Class.findByIdAndUpdate({_id:body.class_id},
    { $set: { "section.$[i].fee":body.fee}},
    {
      arrayFilters: [
        { "i._id": body.section_id }        
      ],
    })
  .then((allcl) => { return [{  msg: "Section fee updated from master data successfully" , class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

 
export async function PATCH(request: NextRequest) {
  connectDB()
  const body = await request.json()
  let response = await Class.findByIdAndUpdate({_id:body.class_id},
    { $set: { "section.$[i].fee.$[j]":body.fee}},
    {
      arrayFilters: [
        { "i._id": body.section_id } ,       
        { "j._id": body.fee._id } ,       
      ],
    }) 
    .then((cl: any) => { return [{ data: cl, class: "success", msg: "Period updated successfully" }, { status: 200 }] })
    .catch((error: any) => {console.log(error) ;  return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
   
}



 