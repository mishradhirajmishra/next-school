import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/server/helper/dbconnect";
import { Class } from "@/app/server/model/class";

export async function GET(request: NextRequest) {
  connectDB()
  let response = await Class.find({},{"name":1,"section.subjectList":1,"section.name":1,"section._id":1,"section.same_syllabus_as_section_id":1})
  .then((allcl) => { return [{ data: allcl, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json()
  let response = await Class.findByIdAndUpdate({_id:body.class_id},
    { $set: { "section.$[i].subjectList":body.subjectList,"section.$[i].same_syllabus_as_section_id":body.same_syllabus_as_section_id}},
    {
      arrayFilters: [
        { "i._id": body.section_id }        
      ],
    })
  .then((allcl) => { return [{  msg: "Updated successfully" , class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

// export async function PATCH(request: NextRequest) {
//   connectDB()
//   const body = await request.json()
//   console.log(body)
//     let response = await Class.findOne({_id:body.class_id},{"name":1,"section.subjectList":1,"section._id":1})
//     .then((allcl) => { return [{ data: allcl.section.find((x:any)=>x._id==body.section_id)?.subjectList, class: "success" }, { status: 200 }] })
//     .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
//     return NextResponse.json(response[0], response[1]);
// }
 
 

 