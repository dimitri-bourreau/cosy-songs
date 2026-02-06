import { Episode } from "@/features/rss/types";
import { CosyData } from "@/features/playlists/types";
import { getPlaylistsFromEpisodes } from "@/features/playlists/get-playlists-from-episodes";

export const createCosyData = (episodes: Episode[]): CosyData => {
  const playlists = getPlaylistsFromEpisodes(episodes);
  const numberOfSongs = playlists
    .map(({ numberOfSongs }) => numberOfSongs)
    .reduce((a, b) => a + b);
  return {
    numberOfEpisodes: episodes.length,
    numberOfSongs,
    playlists,
  };
};
