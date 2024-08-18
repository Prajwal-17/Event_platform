"use server";

import prisma from "@/lib/db";

export const createEvent = async (
  formData: FormData,
  imageUrl: string | null, // Now it can be a string or null
  startDateTime: string | null, // Can be a string or null
  endDateTime: string | null,   // Can be a string or null
  userId: string// The ID of the user creating the event
) => {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const price = formData.get("price") as string;
  const url = formData.get("url") as string;

  try {
    const event = await prisma.event.create({
      data: {
        title,
        category,
        description,
        imageUrl,
        location,
        startDateTime: startDateTime ? new Date(startDateTime) : undefined,
        endDateTime: endDateTime ? new Date(endDateTime) : undefined,
        price,
        url,
        userId,
      },
    });

    return { success: "Event created successfully" };
  } catch (err: any) {
    console.error("Error creating event:", err);
    return { error: "Failed to create event" };
  }
};
