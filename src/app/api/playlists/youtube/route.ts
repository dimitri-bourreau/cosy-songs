import { NextRequest, NextResponse } from "next/server";
import { Song } from "@/features/songs/types";
import {
  searchYouTubeVideo,
  createYouTubePlaylist,
  addVideoToPlaylist,
} from "@/features/youtube/client";
import { readCache, writeCache, buildCacheKey } from "@/features/youtube/cache";

interface CreatePlaylistBody {
  name: string;
  songs: Song[];
}

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get("yt_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body: CreatePlaylistBody = await request.json();
  const cache = await readCache();
  const playlistId = await createYouTubePlaylist(body.name, accessToken);
  let cacheUpdated = false;

  for (const song of body.songs) {
    const key = buildCacheKey(song.artist, song.title);
    let videoId: string | null = cache[key] ?? null;

    if (!videoId) {
      videoId = await searchYouTubeVideo(
        `${song.artist} ${song.title}`,
        accessToken,
      );
      if (videoId) {
        cache[key] = videoId;
        cacheUpdated = true;
      }
    }

    if (videoId) {
      await addVideoToPlaylist(playlistId, videoId, accessToken);
    }
  }

  if (cacheUpdated) await writeCache(cache);

  return NextResponse.json({
    url: `https://www.youtube.com/playlist?list=${playlistId}`,
  });
}
