import {describe, expect, it} from "@jest/globals";
import {getPodcastEpisodes} from "@/features/podcast/services/get-podcast-episodes.service";
import {PodcastMockAdapter} from "@/features/podcast/adapters/podcast.mock-adapter";

describe('[PODCAST] Get podcast episodes', () => {
    const adapter = new PodcastMockAdapter();

    it('should return unformatted podcast episodes', async () => {
        const episodes = await getPodcastEpisodes(adapter);
        expect(episodes[0].guid).toBeTruthy();
    })
})