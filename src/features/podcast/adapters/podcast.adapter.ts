import { PodcastPort } from "@/features/podcast/adapters/podcast.port";
import { RawPodcastEpisode } from "../types/raw-podcast-episode.type";
import { XMLParser } from "fast-xml-parser";

export class PodcastAdapter implements PodcastPort {
  async getPodcastEpisodes(): Promise<RawPodcastEpisode[]> {
    const parser = new XMLParser();
    const fetchResponse = await fetch(
      "https://feeds.soundcloud.com/users/soundcloud:users:274829367/sounds.rss",
    );
    const xmlContent = await fetchResponse.text();
    const jsonContent = parser.parse(xmlContent);
    return jsonContent?.rss?.channel?.item as RawPodcastEpisode[];
  }
}
