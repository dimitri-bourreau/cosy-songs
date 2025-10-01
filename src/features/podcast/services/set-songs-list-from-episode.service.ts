import { RawPodcastEpisode } from "@/features/podcast/types/raw-podcast-episode.type";
import { PodcastEpisodeWithSongsList } from "@/features/podcast/types/podcast-episode-with-songs-list.type";
import { Song } from "@/features/podcast/types/song.type";

export const setSongsListFromEpisode = (
  episode: RawPodcastEpisode,
): PodcastEpisodeWithSongsList => {
  const key = getPlaylistKeyWord(episode.description);

  return {
    ...episode,
    songsList: !key
      ? []
      : formatSongs(episode.description.split(key).slice(1)[0]),
  };
};

function getPlaylistKeyWord(
  description: string,
): "Playlist" | "playlist" | "musicaux" | null {
  return description.match("Playlist")
    ? "Playlist"
    : description.match("playlist")
      ? "playlist"
      : description.match("musicaux")
        ? "musicaux"
        : null;
}

function formatSongs(songs: string): Song[] {
  const songsArray: string[] = fromSongsStringToArray(songs);
  return songsArray.map((song) => {
    const [artist, title] = song.split(" - ");
    return {
      title,
      artist,
    };
  });
}

function fromSongsStringToArray(songs: string): string[] {
  return songs
    .split("\n")
    .filter((song) => song.match(/\s*-?(\w+)\s*-\s*(\w+)/))
    .map((song) => {
      if (song.match(/^- (.*)$/)) return song.slice(2).trim();
      return song.trim();
    });
}
