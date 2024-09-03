import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
export async function POST(request: NextRequest) { 
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File
  if (!file) { return NextResponse.json({ msg:"Unable to Upload Image", class: "error" })  }
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const path = `./public/uploads/${file.name}`
  await writeFile(path, buffer)
  return NextResponse.json({ msg:"Image Uploaded Successfully", class: "success" }, { status: 200 });
}


 