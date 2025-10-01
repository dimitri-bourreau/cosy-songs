import { RawPodcastEpisode } from "@/features/podcast/types/raw-podcast-episode.type";
import { Song } from "@/features/podcast/types/song.type";

export type PodcastEpisodeWithSongsList = RawPodcastEpisode & {
  songsList: Song[];
};
