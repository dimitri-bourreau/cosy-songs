const API_BASE = "https://www.googleapis.com/youtube/v3";

export async function searchYouTubeVideo(
  query: string,
  accessToken: string,
): Promise<string | null> {
  const params = new URLSearchParams({
    part: "snippet",
    q: query,
    type: "video",
    maxResults: "1",
  });
  const res = await fetch(`${API_BASE}/search?${params}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await res.json();
  return data.items?.[0]?.id?.videoId ?? null;
}

export async function createYouTubePlaylist(
  name: string,
  accessToken: string,
): Promise<string> {
  const res = await fetch(`${API_BASE}/playlists?part=snippet,status`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      snippet: { title: name, description: "Playlist Cosy Songs" },
      status: { privacyStatus: "private" },
    }),
  });
  const data = await res.json();
  return data.id;
}

export async function addVideoToPlaylist(
  playlistId: string,
  videoId: string,
  accessToken: string,
): Promise<void> {
  await fetch(`${API_BASE}/playlistItems?part=snippet`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      snippet: {
        playlistId,
        resourceId: { kind: "youtube#video", videoId },
      },
    }),
  });
}
