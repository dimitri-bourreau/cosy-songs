import { Song } from "@/features/songs/types";
import { fromSongsStringToArray } from "@/features/songs/from-song-string-to-array";

export const formatSongs = (songs: string): Song[] => {
  const songsArray: string[] = fromSongsStringToArray(songs);
  return songsArray
    .map((song) => {
      const [artist, ...rest] = song.split(" - ");
      return { artist: artist ?? "", title: rest.join(" - ") ?? "" };
    })
    .filter((song) => song.artist && song.title);
};
