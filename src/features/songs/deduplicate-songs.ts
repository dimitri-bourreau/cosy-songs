import { Song } from "@/features/songs/types";

export const deduplicateSongs = (songs: Song[]): Song[] => {
  const seen = new Set<string>();
  return songs.filter(({ artist, title }) => {
    const key = `${(artist ?? "").toLowerCase().trim()}::${(title ?? "").toLowerCase().trim()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};
