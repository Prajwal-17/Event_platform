import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {

  const { searchParams } = new URL(request.url);

  const amount = searchParams.get("amount") as string;
  const eventId = searchParams.get("eventId") as string;
  const userId = searchParams.get("userId") as string;

  try {
    const ticket = await prisma.ticket.create({
      data: {
        userId,
        eventId: eventId

      }
    })
    return NextResponse.json({ msg: "done" }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json("Something went wrong ", { status: 500 })
  }
}