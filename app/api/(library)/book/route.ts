import { NextRequest, NextResponse } from "next/server"; 
import connectDB from "@/app/server/helper/dbconnect";
import {Book} from "@/app/server/model/library";

export async function GET(request: NextRequest) {
  connectDB()
  let response = await Book.find({})
    .then((allbook) => { return [{ data: allbook, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}

export async function POST(request: NextRequest) {
  connectDB()
  const body = await request.json(); 
    let response = await Book.insertMany(body)
      .then((book: any) => { return [{ data: book, class: "success", msg: body.length +"Book created successfully" }, { status: 201 }] })
      .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
    return NextResponse.json(response[0], response[1]); 
}

export async function PATCH(request: NextRequest) {
  connectDB()
  const body = await request.json();
  let response = await Book.findByIdAndUpdate(body._id, body, { upsert: true })
  .then((book: any) => { return [{ data: book, class: "success", msg: "Book updated successfully" }, { status: 200 }] })
  .catch((error: any) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
return NextResponse.json(response[0], response[1]);
}

export async function DELETE(request: NextRequest) {
  connectDB()
  const _id = request.nextUrl.searchParams.get("_id")
  let response = await Book.findOneAndDelete({ _id: _id })
    .then((book) => { return [{ data: book, class: "success", msg: "Book deleted successfully" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:{}, class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}


