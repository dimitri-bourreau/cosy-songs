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

  try {
    const body: CreatePlaylistBody = await request.json();
    const cache = await readCache();

    console.log(`[YouTube] Creating playlist "${body.name}" with ${body.songs.length} songs`);

    const playlistId = await createYouTubePlaylist(body.name, accessToken);
    console.log(`[YouTube] Playlist created: ${playlistId}`);

    let cacheUpdated = false;
    let added = 0;

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
        added++;
      }
    }

    if (cacheUpdated) await writeCache(cache);
    console.log(`[YouTube] Done: ${added}/${body.songs.length} songs added`);

    return NextResponse.json({
      url: `https://www.youtube.com/playlist?list=${playlistId}`,
      added,
      total: body.songs.length,
    });
  } catch (error) {
    console.error("[YouTube] Export failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Export failed" },
      { status: 500 },
    );
  }
}
