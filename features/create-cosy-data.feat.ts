import {Episode} from "../types/episode.type.ts";
import {CosyData} from "../types/cosydata.type.ts";
import {getPlaylistsFromEpisodes} from "./get-playlists-from-episodes.feat.ts";

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
}
