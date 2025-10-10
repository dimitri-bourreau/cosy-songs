import { describe, expect, it } from "@jest/globals";
import { getPodcastEpisodes } from "@/features/podcast/services/get-podcast-episodes.service";
import { PodcastMockAdapter } from "@/features/podcast/adapters/podcast.mock-adapter";
import { PodcastAdapter } from "../adapters/podcast.adapter";

describe("[PODCAST] Get podcast episodes", () => {
  const adapter = new PodcastAdapter();
  const mockAdapter = new PodcastMockAdapter();

  it("should return unformatted podcast episodes", async () => {
    const episodes = await getPodcastEpisodes(mockAdapter);
    expect(episodes[0].guid).toBeTruthy();
  });

  it("[REAL FETCH] XML parsing is done right", async () => {
    const episodes = await getPodcastEpisodes(adapter);
    const expectedKeys = ["title", "link", "description"];
    const episodeKeys = Object.keys(episodes[0]);
    expect(expectedKeys.every((key) => episodeKeys.includes(key))).toBeTruthy();
  });
});
