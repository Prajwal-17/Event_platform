import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const events = await prisma.event.findMany({
      include: {
        user: true,
        category: true
      }
    })
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ errMsg: "Something went wrong while fetching events." }, { status: 500 });
  }
}
