import { PodcastPort } from "@/features/podcast/adapters/podcast.port";
import { mockPodcastEpisodes } from "@/features/podcast/mocks/podcast-episodes.mock";
import { RawPodcastEpisode } from "../types/raw-podcast-episode.type";

export class PodcastMockAdapter implements PodcastPort {
  getPodcastEpisodes(): Promise<RawPodcastEpisode[]> {
    return Promise.resolve(mockPodcastEpisodes);
  }
}
