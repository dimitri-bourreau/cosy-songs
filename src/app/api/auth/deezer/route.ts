import { redirect } from "next/navigation";
import { buildDeezerAuthUrl } from "@/features/deezer/auth";

export async function GET() {
  redirect(buildDeezerAuthUrl());
}
