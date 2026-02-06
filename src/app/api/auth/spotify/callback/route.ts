import { NextRequest, NextResponse } from "next/server";
import { exchangeSpotifyCode } from "@/features/spotify/auth";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  try {
    const tokens = await exchangeSpotifyCode(code);

    const response = NextResponse.redirect(
      new URL("/playlist-builder", request.url),
    );

    response.cookies.set("sp_access_token", tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: tokens.expires_in,
      path: "/",
    });

    if (tokens.refresh_token) {
      response.cookies.set("sp_refresh_token", tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
    }

    return response;
  } catch (error) {
    console.error("[Spotify Callback]", error);
    return NextResponse.redirect(
      new URL("/playlist-builder?error=auth_failed", request.url),
    );
  }
}
