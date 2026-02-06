import { DeezerTokenResponse } from "@/features/deezer/types";

const AUTH_URL = "https://connect.deezer.com/oauth/auth.php";
const TOKEN_URL = "https://connect.deezer.com/oauth/access_token.php";

export function buildDeezerAuthUrl(): string {
  const params = new URLSearchParams({
    app_id: process.env.DEEZER_APP_ID!,
    redirect_uri: process.env.DEEZER_REDIRECT_URI!,
    perms: "basic_access,manage_library",
  });
  return `${AUTH_URL}?${params}`;
}

export async function exchangeDeezerCode(code: string): Promise<DeezerTokenResponse> {
  const params = new URLSearchParams({
    app_id: process.env.DEEZER_APP_ID!,
    secret: process.env.DEEZER_SECRET!,
    code,
    output: "json",
  });

  const res = await fetch(`${TOKEN_URL}?${params}`);
  const data = await res.json();

  if (data.error) {
    console.error("[Deezer Auth] Token exchange failed:", data);
    throw new Error(data.error_reason ?? "Token exchange failed");
  }

  return data;
}
