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

export async function DELETE(request: NextRequest, { params }: { params: { eventId: string } }) {
  const eventId = params.eventId;
  console.log("eventId", eventId);

  try {
    const event = await prisma.event.delete({
      where: {
        id: eventId,
      },
    });

    return NextResponse.json(
      { event, msg: "Successfully deleted the event" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { msg: "Event does not exist" },
      { status: 404 }
    );
  }
}
