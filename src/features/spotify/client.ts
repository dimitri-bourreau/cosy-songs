const API_BASE = "https://api.spotify.com/v1";

export async function getSpotifyUserId(accessToken: string): Promise<string> {
  const res = await fetch(`${API_BASE}/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();

  if (!res.ok) {
    console.error("[Spotify] Get user failed:", data.error?.message);
    throw new Error(data.error?.message ?? "Failed to get user");
  }

  return data.id;
}

export async function searchSpotifyTrack(
  query: string,
  accessToken: string,
): Promise<string | null> {
  const params = new URLSearchParams({
    q: query,
    type: "track",
    limit: "1",
  });
  const res = await fetch(`${API_BASE}/search?${params}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();

  if (!res.ok) {
    console.error("[Spotify] Search failed:", data.error?.message);
    return null;
  }

  return data.tracks?.items?.[0]?.uri ?? null;
}

export async function createSpotifyPlaylist(
  userId: string,
  name: string,
  accessToken: string,
): Promise<{ id: string; url: string }> {
  const res = await fetch(`${API_BASE}/users/${userId}/playlists`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description: "Playlist Cosy Songs",
      public: false,
    }),
  });
  const data = await res.json();

  if (!res.ok) {
    console.error("[Spotify] Playlist creation failed:", data.error?.message);
    throw new Error(data.error?.message ?? "Playlist creation failed");
  }

  return { id: data.id, url: data.external_urls?.spotify };
}

export async function addTracksToSpotifyPlaylist(
  playlistId: string,
  uris: string[],
  accessToken: string,
): Promise<void> {
  for (let i = 0; i < uris.length; i += 100) {
    const batch = uris.slice(i, i + 100);
    const res = await fetch(`${API_BASE}/playlists/${playlistId}/tracks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: batch }),
    });

    if (!res.ok) {
      const data = await res.json();
      console.error("[Spotify] Add tracks failed:", data.error?.message);
    }
  }
}
