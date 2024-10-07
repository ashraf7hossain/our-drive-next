import { NextResponse } from "next/server";
import { auth } from "@/firebase.config";

export async function middleware(req: Request) {
  const cookie = req.headers.get("cookie");
  const token = cookie
    ?.split(";")
    .find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path",
};
