export interface YouTubeTokens {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

export interface YouTubeSearchResult {
  items: Array<{
    id: { videoId: string };
    snippet: { title: string };
  }>;
}

export interface YouTubePlaylistResult {
  id: string;
}
