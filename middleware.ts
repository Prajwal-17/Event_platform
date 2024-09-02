import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("next-auth.session-token");

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error)
    return NextResponse.json("Something went wrong")
  }
}

export const config = {
  matcher: ["/create-event", "/my-profile"]
}