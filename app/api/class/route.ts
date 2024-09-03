import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/app/server/helper/dbconnect";
import { Class } from "@/app/server/model/class";

export async function GET(request: NextRequest) {
  connectDB()
  let response = await Class.find({})
//   .populate(
//     { model : Class,
//       path : 'section',
//       populate:  { path: 'class_teacher' }
//  } )
  .then((allcl) => { return [{ data: allcl, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json()
  body.section =body.section.map((x:any)=>{delete x._id; return x})
  if (body._id == "") {
     delete body._id 
    let response = await new Class(body).save()
      .then((cl: any) => { return [{ data: cl, class: "success", msg: "Class created successfully" }, { status: 201 }] })
      .catch((error: any) => {console.log(error) ; return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  } else {
 
    let response = await Class.findByIdAndUpdate(body._id, body, { upsert: true })
      .then((cl: any) => { return [{ data: cl, class: "success", msg: "Class updated successfully" }, { status: 200 }] })
      .catch((error: any) => {console.log(error) ;  return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  }
}

export async function PATCH(request: NextRequest) {
  connectDB()
  const body = await request.json() 
  let response = await Class.findByIdAndUpdate(body.class, 
    { $set: { "section.$[i].period": body.data.period}},
  {
    arrayFilters: [
      { "i._id": body.data._id }        
    ],
  })
    .then((cl: any) => { return [{ data: cl, class: "success", msg: "Period updated successfully" }, { status: 200 }] })
    .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);   
}

export async function OPTIONS(request: NextRequest) {
  connectDB()
  const body = await request.json() 
  let response = await Class.findByIdAndUpdate(body.class, 
    { $set: { "section.$[i].period.$[j]": body.data}},
  {
    arrayFilters: [
      { "i._id": body.section } ,       
      { "j._id": body.data._id }        
    ],
  })
    .then((cl: any) => { return [{ data: cl, class: "success", msg: "Period updated successfully" }, { status: 200 }] })
    .catch((error: any) => {console.log(error) ;  return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
   
}




export async function DELETE(request: NextRequest) {
  connectDB()
  const _id = request.nextUrl.searchParams.get("_id")
  let response = await Class.findOneAndDelete({ _id: _id })
    .then((cl) => { return [{ data: cl, class: "success", msg: "Class deleted successfully" }, { status: 200 }] })
    .catch((error) => {console.log(error) ;  return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}