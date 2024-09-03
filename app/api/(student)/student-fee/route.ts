import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/server/helper/dbconnect";
import { Class } from "@/app/server/model/class";
import { StudentFeePayment } from "@/app/server/model/student-fee-payment";

export async function GET(request: NextRequest) {
  connectDB()
  let response = await Class.find({},{"name":1,"section.fee":1,"section.name":1,"section._id":1})
  .then((allcl) => { return [{ data: allcl, class: "success" }, { status: 200 }] })
    .catch((error) => { return [{ error: error,data:[], class: "error" }, { status: 500 }] })
  return NextResponse.json(response[0], response[1]);
}
