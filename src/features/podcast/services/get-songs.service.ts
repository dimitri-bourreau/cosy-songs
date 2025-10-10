import { PodcastPort } from "../adapters/podcast.port";
import { getPodcastEpisodes } from "./get-podcast-episodes.service";
import { setSongsListFromEpisode } from "./set-songs-list-from-episode.service";

export const getSongs = async (adapter: PodcastPort) => {
  const podcastEpisodes = await getPodcastEpisodes(adapter);
  const songs = Promise.all(podcastEpisodes.map(setSongsListFromEpisode));
  return songs;
};
