import { Episode } from "../types/episode.type.ts";
import { Song } from "../types/song.type.ts";
import { formatSongs } from "./format-songs.feat.ts";
import { getPlaylistKeyWord } from "./get-playlist-keyword.feat.ts";

export const getSongsFromEpisode = ({ description }: Episode): Song[] => {
  const keyWord = getPlaylistKeyWord(description);
  if (!keyWord) return [];
  const songs = description.split(keyWord).slice(1)[0];
  return formatSongs(songs);
};
