import { Episode } from "@/features/rss/types";
import { Song } from "@/features/songs/types";
import { formatSongs } from "@/features/songs/format-songs";
import { getPlaylistKeyWord } from "@/features/songs/get-playlist-keyword";

export const getSongsFromEpisode = ({ description }: Episode): Song[] => {
  const keyWord = getPlaylistKeyWord(description);
  if (!keyWord) return [];
  const songs = description.split(keyWord).slice(1)[0];
  return formatSongs(songs);
};
