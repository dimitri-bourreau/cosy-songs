import { SpotifyTokens } from "@/features/spotify/types";

const AUTH_URL = "https://accounts.spotify.com/authorize";
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const SCOPES = "playlist-modify-public playlist-modify-private";

export function buildSpotifyAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    response_type: "code",
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
    scope: SCOPES,
  });
  return `${AUTH_URL}?${params}`;
}

export async function exchangeSpotifyCode(code: string): Promise<SpotifyTokens> {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("[Spotify Auth] Token exchange failed:", data);
    throw new Error(data.error_description ?? "Token exchange failed");
  }

  return data;
}
