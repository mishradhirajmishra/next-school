import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/server/helper/dbconnect";
import { Exam } from "@/app/server/model/exam";
import { Exammark } from "@/app/server/model/exammarks";
import { StuAttendance } from "@/app/server/model/student-attendance";

export async function GET(request: NextRequest) {
  connectDB()
  const include_in_marksheet = request.nextUrl.searchParams.get('include_in_marksheet');
  let response = await Exam.find({ include_in_marksheet: include_in_marksheet })
    .then((allexam) => { return [{ data: allexam, class: "success" }, { status: 200 }] })
    .catch((error) => { console.log(error); return [{ error: error, data: [], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json();
  let response = await Exammark.find({running_year:body.running_year,exam: { $in: body.examList }})
    .sort({ 'exam': 1 })
    .then((allExamMarks) => {   return [{ data: allExamMarks, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error, data: [], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

export async function PATCH(request: NextRequest) {
  connectDB()
  const body = await request.json();
  let response = await StuAttendance.find({class: body.class, section: body.section, student_id: body.student,running_year:body.running_year},{attendance:1 })
    .sort({ 'exam': 1 })
    .then((allExamMarks) => {   return [{ data: allExamMarks, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error, data: [], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}
