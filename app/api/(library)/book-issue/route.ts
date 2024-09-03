import { NextRequest, NextResponse } from "next/server"; 
import connectDB from "@/app/server/helper/dbconnect";
import {Bookissue} from "@/app/server/model/library";
import { Employee } from "@/app/server/model/employee";
import { Student } from "@/app/server/model/student";

export async function GET(request: NextRequest) {
  connectDB()
 
  let [empBookIssue,stuBookIssue] = await  Promise.all([
      employeeBookIssue(),
      studentBookIssue()
  ])   
   return NextResponse.json({ empBookIssue:empBookIssue,stuBookIssue:stuBookIssue, class: "success" }, { status: 200 })  
}

const employeeBookIssue = async () => {
  return new Promise((resolve, reject) => {
    Bookissue.find({employee_id: { $ne: "" }}).populate({ path: "employee_id", model: Employee, select: 'name role' })
    .then((bookissued) => {resolve(bookissued);   }).catch((e) => {  console.log(e)})    
  })
}

const studentBookIssue = async () => {
  return new Promise((resolve, reject) => {
    Bookissue.find({student_id: { $ne: "" }}).populate({ path: "student_id", model: Student, select: 'name class section gender' })
    .then((bookissued) => {resolve(bookissued);   }).catch((e) => {  console.log(e)})    
  })
}


export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json();
  if (body._id == "") {
    delete body._id
    let response = await new Bookissue(body).save()
      .then((Bookissue: any) => { return [{ data: Bookissue, class: "success", msg: "Book Issued successfully" }, { status: 201 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  } else {
    let response = await Bookissue.findByIdAndUpdate(body._id, body, { upsert: true })
      .then((Bookissue: any) => { return [{ data: Bookissue, class: "success", msg: "Book Issue updated successfully" }, { status: 200 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]);
  }
}

export async function DELETE(request: NextRequest) {
  connectDB()
  const _id = request.nextUrl.searchParams.get("_id")
  let response = await Bookissue.findOneAndDelete({ _id: _id })
    .then((Bookissue) => { return [{ data: Bookissue, class: "success", msg: "Book Issue deleted successfully" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}