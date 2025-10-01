import { RawPodcastEpisode } from "@/features/podcast/types/raw-podcast-episode.type";

export interface PodcastPort {
  getPodcastEpisodes(): Promise<RawPodcastEpisode[]>;
}
