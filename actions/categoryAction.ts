"use server"

import prisma from "@/lib/db"

export const categoryAction = async (newCategory: string) => {
  try {
    const category = await prisma.category.create({
      data: {
        name: newCategory,
      }
    })

    return { msg: "Successfully Added Category", category }
  } catch (err: any) {
    console.log(err)
  }
}

export const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany({})

    return { categories }
  } catch (err: any) {
    console.log(err)
  }
}