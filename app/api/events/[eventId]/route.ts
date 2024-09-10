import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { eventId: string } }) {

  const eventId = params.eventId;

  try {

    const event = await prisma.event.findFirst({
      where: {
        id: eventId,
      },
      include: {
        user: true,
        category: true,
      }
    })

    const relatedEvents = await prisma.event.findMany({
      where: {
        category: event?.category
      },
      include: {
        user: true,
        category: true,
      }
    })

    if (!event) {
      return NextResponse.json({ msg: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ msg: "Successfully fetched event", event, relatedEvents }, { status: 200 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 400 })
  }
}
