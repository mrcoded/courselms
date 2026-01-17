import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for the cookie (presence only)
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  const hasCookie = !!sessionCookie;

  const protectedRoutes = ["/dashboard", "/tutor", "/courses", "/search"];
  const authRoutes = ["/auth/login", "/auth/register"];

  //Redirection Logic
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !hasCookie
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // If user is logged in and tries to access /auth/login or /auth/register
  if (authRoutes.some((route) => pathname.startsWith(route)) && hasCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (authRoutes.some((route) => pathname.startsWith(route)) && hasCookie) {
    return NextResponse.next(); // We let them pass to the page where cache() will verify
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/webhook|_next/static|_next/image|favicon.ico).*)"],
};
