// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userId: string; // Ensure userId is added here
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userId: string; // Ensure userId is added here
    email?: string | null;
    name?: string | null;
    image?: string | null;
  }
}
