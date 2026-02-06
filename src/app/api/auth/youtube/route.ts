import { redirect } from "next/navigation";
import { buildYouTubeAuthUrl } from "@/features/youtube/auth";

export async function GET() {
  redirect(buildYouTubeAuthUrl());
}
