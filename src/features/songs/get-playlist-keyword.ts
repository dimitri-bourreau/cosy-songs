export const getPlaylistKeyWord = (
  description: string,
): "Playlist" | "playlist" | "musicaux" | null => {
  return description.match("Playlist")
    ? "Playlist"
    : description.match("playlist")
      ? "playlist"
      : description.match("musicaux")
        ? "musicaux"
        : null;
};
