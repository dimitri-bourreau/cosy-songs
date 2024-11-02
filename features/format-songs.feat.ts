import {Song} from "../types/song.type.ts";
import { fromSongsStringToArray } from "./from-song-string-to-array.feat.ts";

export const formatSongs = (songs: string): Song[] => {
  const songsArray: string[] = fromSongsStringToArray(songs);
  return songsArray.map(song => {
    const [artist, title] = song.split(' - ');
    return {
      title,
      artist
    }
  })
}
