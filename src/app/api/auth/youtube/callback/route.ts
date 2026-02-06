import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/features/youtube/auth";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const tokens = await exchangeCodeForTokens(code);

  const response = NextResponse.redirect(
    new URL("/playlist-builder", request.url),
  );

  response.cookies.set("yt_access_token", tokens.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: tokens.expires_in,
    path: "/",
  });

  if (tokens.refresh_token) {
    response.cookies.set("yt_refresh_token", tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
  }

  return response;
}
