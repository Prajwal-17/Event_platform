import prisma from "@/lib/db";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    // maxAge: 60 * 2,
  },
  pages: {
    signIn: "/auth/login"
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "ucantseeme@gmail.com" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required.")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          throw new Error("User Does not Exists? Sign Up")
        }

        const isPassword = await compare(credentials.password, user.password as string);

        if (!isPassword) {
          throw new Error("Credentials are incorrect")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    })
  ],
  callbacks: {
    jwt: ({ user, token }) => {
      // console.log("token", token)
      // console.log("************************************")
      // console.log("user", user)
      // console.log("*******************end of token*************")
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          userId: user.id
        }
      }
      return token;
    },
    session: ({ session, token }) => {
      // console.log("***************************")
      // console.log('Session Callback', { session, token })
      // console.log("***************************")
      return {
        ...session,
        user: {
          id: token.id,
          email: token.email,
          userId: token.userId,
        }
      }
    }
  }
}

