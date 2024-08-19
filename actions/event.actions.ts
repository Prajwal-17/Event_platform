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
    // Upsert category and get its ID
    const category = await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });

    // console.log("title", title)
    // console.log("category.id", category.id)
    // console.log("description", description)
    // console.log("imageUrl", imageUrl)
    // console.log("location", location)
    // console.log("startDate", startDateTime)
    // console.log("endDate", endDateTime)
    // console.log("price", price)
    // console.log("url", url)
    // console.log("userId", userId)

    // Create event with correct categoryId and optional userId
    const event = await prisma.event.create({
      data: {
        title,
        categoryId: category.id, // Directly use categoryId
        description,
        imageUrl,
        location,
        startDateTime: new Date(startDateTime),
        endDateTime: new Date(endDateTime),
        price,
        url,
        userId: userId ?? undefined, // Use `undefined` instead of `null` if `userId` is optional
      },
      include: {
        category: true, // Include category details in the response
      },
    });

    return { success: "Event created successfully" };
  } catch (err: any) {
    console.error("Error creating event:", err);
    return { error: "Failed to create event" };
  }
};
