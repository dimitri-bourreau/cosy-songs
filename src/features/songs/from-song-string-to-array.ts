export const fromSongsStringToArray = (songs: string): string[] => {
  return songs
    .split("\n")
    .filter((song) => song.match(/\s*-?(\w+)\s*-\s*(\w+)/))
    .map((song) => {
      if (song.match(/^- (.*)$/)) return song.slice(2).trim();
      return song.trim();
    });
};
