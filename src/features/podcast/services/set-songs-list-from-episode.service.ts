import { RawPodcastEpisode } from "@/features/podcast/types/raw-podcast-episode.type";
import { PodcastEpisodeWithSongsList } from "@/features/podcast/types/podcast-episode-with-songs-list.type";

export const setSongsListFromEpisode = (
  episode: RawPodcastEpisode,
): PodcastEpisodeWithSongsList => {
  return {
    ...episode,
    songsList: [],
  };
};
