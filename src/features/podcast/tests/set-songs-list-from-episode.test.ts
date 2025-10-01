import { describe, expect, it } from "@jest/globals";
import { mockPodcastEpisodes } from "@/features/podcast/mocks/podcast-episodes.mock";
import { setSongsListFromEpisode } from "@/features/podcast/services/set-songs-list-from-episode.service";

describe("[SONG] Set songs list from episode", () => {
  it('should add the property "songsList" to the episode object', () => {
    const episodesWithSongsList = setSongsListFromEpisode(
      mockPodcastEpisodes[0],
    );
    expect(episodesWithSongsList.songsList).toBeTruthy();
  });
});
