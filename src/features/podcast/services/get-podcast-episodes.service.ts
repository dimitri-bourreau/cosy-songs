import {PodcastPort} from "@/features/podcast/adapters/podcast.port";
import {PodcastEpisode} from "@/features/podcast/types/podcast-episode.type";

export const getPodcastEpisodes = (adapter: PodcastPort): Promise<PodcastEpisode[]> => {
    return adapter.getPodcastEpisodes();
}