import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
const COOKIE_NAME = "admin_session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const tokenFromQuery = request.nextUrl.searchParams.get("token");
  const tokenFromCookie = request.cookies.get(COOKIE_NAME)?.value;

  if (tokenFromQuery === ADMIN_TOKEN) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("token");

    const response = NextResponse.redirect(url);
    response.cookies.set(COOKIE_NAME, ADMIN_TOKEN ?? "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  }

  if (tokenFromCookie === ADMIN_TOKEN) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/admin/:path*"],
};

