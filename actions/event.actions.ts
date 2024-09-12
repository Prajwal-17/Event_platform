"use server"

import prisma from "@/lib/db";

export const createEvent = async (
  formData: FormData,
  categoryName: string,
  imageUrl: string,
  startDateTime: string,
  endDateTime: string,
  userId?: string | null,
) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const price = formData.get("price") as string;
  const url = formData.get("url") as string;

  try {

    const category = await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });

    const event = await prisma.event.create({
      data: {
        title,
        categoryId: category.id,
        description,
        imageUrl,
        location,
        startDateTime: new Date(startDateTime),
        endDateTime: new Date(endDateTime),
        price,
        url,
        userId: userId ?? undefined,
      },
      include: {
        category: true,
      },
    });

    return { success: "Event created successfully" };
  } catch (err: any) {
    console.error("Error creating event:", err);
    return { error: "Failed to create event" };
  }
};

export const updateEvent = async (
  formData: FormData,
  categoryName: string,
  imageUrl: string,
  startDateTime: string,
  endDateTime: string,
  eventId: string,
  userId?: string | null,
) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const price = formData.get("price") as string;
  const url = formData.get("url") as string;

  try {

    const category = await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });

    const event = await prisma.event.update({
      where: {
        id: eventId
      },
      data: {
        title,
        categoryId: category.id,
        description,
        imageUrl,
        location,
        startDateTime: new Date(startDateTime),
        endDateTime: new Date(endDateTime),
        price,
        url,
        userId: userId ?? undefined,
      },
      include: {
        category: true,
      },
    });

    return { success: "Event Updated successfully" };
  } catch (err: any) {
    console.error("Error updating event:", err);
    return { error: "Failed to update event" };
  }
};
