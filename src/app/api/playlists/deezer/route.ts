import { NextRequest, NextResponse } from "next/server";
import { Song } from "@/features/songs/types";
import {
  searchDeezerTrack,
  createDeezerPlaylist,
  addTracksToDeezerPlaylist,
} from "@/features/deezer/client";

interface CreatePlaylistBody {
  name: string;
  songs: Song[];
}

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get("dz_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const body: CreatePlaylistBody = await request.json();

    console.log(`[Deezer] Creating playlist "${body.name}" with ${body.songs.length} songs`);

    const playlistId = await createDeezerPlaylist(body.name, accessToken);
    console.log(`[Deezer] Playlist created: ${playlistId}`);

    const trackIds: number[] = [];
    for (const song of body.songs) {
      const trackId = await searchDeezerTrack(`${song.artist} ${song.title}`);
      if (trackId) trackIds.push(trackId);
    }

    await addTracksToDeezerPlaylist(playlistId, trackIds, accessToken);
    console.log(`[Deezer] Done: ${trackIds.length}/${body.songs.length} songs added`);

    return NextResponse.json({
      url: `https://www.deezer.com/playlist/${playlistId}`,
      added: trackIds.length,
      total: body.songs.length,
    });
  } catch (error) {
    console.error("[Deezer] Export failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Export failed" },
      { status: 500 },
    );
  }
}
