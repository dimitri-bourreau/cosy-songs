const API_BASE = "https://api.deezer.com";

export async function searchDeezerTrack(query: string): Promise<number | null> {
  const params = new URLSearchParams({ q: query, limit: "1" });
  const res = await fetch(`${API_BASE}/search?${params}`);
  const data = await res.json();

  if (data.error) {
    console.error("[Deezer] Search failed:", data.error.message);
    return null;
  }

  return data.data?.[0]?.id ?? null;
}

export async function createDeezerPlaylist(
  title: string,
  accessToken: string,
): Promise<number> {
  const params = new URLSearchParams({
    access_token: accessToken,
    title,
  });
  const res = await fetch(`${API_BASE}/user/me/playlists?${params}`, {
    method: "POST",
  });
  const data = await res.json();

  if (data.error) {
    console.error("[Deezer] Playlist creation failed:", data.error.message);
    throw new Error(data.error.message ?? "Playlist creation failed");
  }

  return data.id;
}

export async function addTracksToDeezerPlaylist(
  playlistId: number,
  trackIds: number[],
  accessToken: string,
): Promise<void> {
  const params = new URLSearchParams({
    access_token: accessToken,
    songs: trackIds.join(","),
  });
  const res = await fetch(`${API_BASE}/playlist/${playlistId}/tracks?${params}`, {
    method: "POST",
  });

  if (!res.ok) {
    const data = await res.json();
    console.error("[Deezer] Add tracks failed:", data.error?.message);
  }
}
