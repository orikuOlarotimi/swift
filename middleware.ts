import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");

  // if (!token && request.nextUrl.pathname.startsWith("/profile")) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  const protectedPaths = ["/profile", "/chat", "/post"];

  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !token) {
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/post/:path*",
    "/chat/:path*",
  ],
};