import { Song } from "@/features/songs/types";

export interface Playlist {
  episodeTitle: string;
  episodeLink: string;
  numberOfSongs: number;
  songs: Song[];
}

export interface CosyData {
  numberOfEpisodes: number;
  numberOfSongs: number;
  playlists: Playlist[];
}
