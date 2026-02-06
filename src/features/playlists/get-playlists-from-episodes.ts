import { Episode } from "@/features/rss/types";
import { Playlist } from "@/features/playlists/types";
import { getSongsFromEpisode } from "@/features/songs/get-songs-from-episode";

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
