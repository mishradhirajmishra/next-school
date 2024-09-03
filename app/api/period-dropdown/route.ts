import { NextRequest, NextResponse } from "next/server";
 
import connectDB from "@/app/server/helper/dbconnect";
import {Period} from "@/app/server/model/class";

export async function GET(request: NextRequest) {
  connectDB()
  let response = await Period.find({},{createdAt:0,updatedAt:0,_id:0,__v:0 })
    .then((allper) => { return [{ data: allper, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}
