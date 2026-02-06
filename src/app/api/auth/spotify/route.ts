import { redirect } from "next/navigation";
import { buildSpotifyAuthUrl } from "@/features/spotify/auth";

export async function GET() {
  redirect(buildSpotifyAuthUrl());
}
