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

  it('should find the song "Te no Hira wo Taiyou ni"', () => {
    const { songsList } = setSongsListFromEpisode(mockPodcastEpisodes[0]);
    expect(songsList[0].title).toBe("Te no Hira wo Taiyou ni");
  });

  it('should find the song "All Apologies"', () => {
    const { songsList } = setSongsListFromEpisode(mockPodcastEpisodes[0]);
    expect(songsList[1].title).toBe("All Apologies");
  });

  it("should find 5 songs", () => {
    const { songsList } = setSongsListFromEpisode(mockPodcastEpisodes[0]);
    expect(songsList.length).toBe(5);
  });
});
