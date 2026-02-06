import { NextRequest, NextResponse } from "next/server";
import { exchangeDeezerCode } from "@/features/deezer/auth";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  try {
    const tokens = await exchangeDeezerCode(code);

    const response = NextResponse.redirect(
      new URL("/playlist-builder", request.url),
    );

    response.cookies.set("dz_access_token", tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: tokens.expires || 3600,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[Deezer Callback]", error);
    return NextResponse.redirect(
      new URL("/playlist-builder?error=auth_failed", request.url),
    );
  }
}
