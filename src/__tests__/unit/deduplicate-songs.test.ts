import { deduplicateSongs } from "@/features/songs/deduplicate-songs";

describe("deduplicateSongs", () => {
  it("removes duplicate songs", () => {
    const songs = [
      { artist: "Nirvana", title: "All Apologies" },
      { artist: "Radiohead", title: "Creep" },
      { artist: "Nirvana", title: "All Apologies" },
    ];
    expect(deduplicateSongs(songs)).toEqual([
      { artist: "Nirvana", title: "All Apologies" },
      { artist: "Radiohead", title: "Creep" },
    ]);
  });

  it("handles case-insensitive duplicates", () => {
    const songs = [
      { artist: "Nirvana", title: "All Apologies" },
      { artist: "nirvana", title: "all apologies" },
    ];
    expect(deduplicateSongs(songs)).toHaveLength(1);
  });

  it("returns empty for empty input", () => {
    expect(deduplicateSongs([])).toEqual([]);
  });
});
