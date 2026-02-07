import { NextRequest, NextResponse } from "next/server";
import { Song } from "@/features/songs/types";
import {
  getSpotifyUserId,
  searchSpotifyTrack,
  createSpotifyPlaylist,
  addTracksToSpotifyPlaylist,
} from "@/features/spotify/client";

interface CreatePlaylistBody {
  name: string;
  songs: Song[];
}

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get("sp_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const body: CreatePlaylistBody = await request.json();

    console.log(`[Spotify] Creating playlist "${body.name}" with ${body.songs.length} songs`);

    const userId = await getSpotifyUserId(accessToken);
    const playlist = await createSpotifyPlaylist(userId, body.name, accessToken);
    console.log(`[Spotify] Playlist created: ${playlist.id}`);

    const uris: string[] = [];
    let searched = 0;
    for (const song of body.songs) {
      const uri = await searchSpotifyTrack(
        `${song.artist} ${song.title}`,
        accessToken,
      );
      if (uri) uris.push(uri);
      searched++;
      if (searched % 50 === 0) {
        console.log(`[Spotify] Searched ${searched}/${body.songs.length}, found ${uris.length} URIs`);
      }
    }
    console.log(`[Spotify] Search complete: ${uris.length}/${body.songs.length} found`);

    if (uris.length > 0) {
      await addTracksToSpotifyPlaylist(playlist.id, uris, accessToken);
    }
    console.log(`[Spotify] Done: ${uris.length}/${body.songs.length} songs added`);

    return NextResponse.json({
      url: playlist.url,
      added: uris.length,
      total: body.songs.length,
    });
  } catch (error) {
    console.error("[Spotify] Export failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Export failed" },
      { status: 500 },
    );
  }
}
