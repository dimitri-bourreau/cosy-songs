import { PodcastPort } from "@/features/podcast/adapters/podcast.port";
import { PodcastEpisode } from "@/features/podcast/types/podcast-episode.type";
import { mockPodcastEpisodes } from "@/features/podcast/mocks/podcast-episodes.mock";

export class PodcastMockAdapter implements PodcastPort {
  getPodcastEpisodes(): Promise<PodcastEpisode[]> {
    return Promise.resolve(mockPodcastEpisodes);
  }
}
