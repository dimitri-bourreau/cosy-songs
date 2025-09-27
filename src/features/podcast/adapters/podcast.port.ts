import {PodcastEpisode} from "@/features/podcast/types/podcast-episode.type";

export interface PodcastPort {
    getPodcastEpisodes(): Promise<PodcastEpisode[]>;
}