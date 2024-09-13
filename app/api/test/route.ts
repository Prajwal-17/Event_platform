"use server"

import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const result = await prisma.user.findMany({
      include: {
        Event: true,
        tickets: true,
      }
    })
    return NextResponse.json({ result })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({ msg: "Something went wrong" }, { status: 400 })
  }
}