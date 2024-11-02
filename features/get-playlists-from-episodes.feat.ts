import { Episode } from "../types/episode.type.ts";
import { Playlist } from "../types/playlist.type.ts";
import { getSongsFromEpisode } from "./get-songs-from-episode.feat.ts";

export const getPlaylistsFromEpisodes = (episodes: Episode[]): Playlist[] => {
  return episodes.map((episode) => {
    const songs = getSongsFromEpisode(episode);
    return {
      episodeTitle: episode.title,
      episodeLink: episode.link,
      numberOfSongs: songs.length,
      songs,
    };
  });
};
