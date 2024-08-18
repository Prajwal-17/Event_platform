"use server"

import prisma from "@/lib/db";
import bcrypt from "bcryptjs"

export const registerAction = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const existingUser = await prisma.user.findFirst({
      where: { email }
    })

    if (existingUser) {
      return { error: "User already exists. Please LogIn" }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    }) 
    return { success: "User created successfully" }
  } catch (err: any) {
    console.log(err)
    return { error: "Unknown Error Check Console" }
  }
}