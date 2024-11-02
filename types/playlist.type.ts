import {Song} from "./song.type.ts";

export interface Playlist {
  episodeTitle: string;
  episodeLink: string;
  numberOfSongs: number;
  songs: Song[]
}
