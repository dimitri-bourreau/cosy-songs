import { PodcastPort } from "@/features/podcast/adapters/podcast.port";
import { RawPodcastEpisode } from "../types/raw-podcast-episode.type";

export const getPodcastEpisodes = (
  adapter: PodcastPort,
): Promise<RawPodcastEpisode[]> => {
  return adapter.getPodcastEpisodes();
};
