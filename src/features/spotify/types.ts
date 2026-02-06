export interface SpotifyTokens {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

export interface SpotifyUser {
  id: string;
}
