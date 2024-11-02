import { Playlist } from "./playlist.type.ts";

export interface CosyData {
  numberOfEpisodes: number;
  numberOfSongs: number;
  playlists: Playlist[]
}
