"use server"

import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const result = await prisma.user.findFirst({
      where: { id: "66bb9da8b39584fa3fb30aba" },
      include: {
        Event: true
      }
    })

    return NextResponse.json({ result })
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({ msg: "Something went wrong" }, { status: 400 })
  }
}