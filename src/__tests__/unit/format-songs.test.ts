import { formatSongs } from "@/features/songs/format-songs";

describe("formatSongs", () => {
  it("parses song string into Song objects", () => {
    const input = "Nirvana - All Apologies\nRadiohead - Creep";
    expect(formatSongs(input)).toEqual([
      { artist: "Nirvana", title: "All Apologies" },
      { artist: "Radiohead", title: "Creep" },
    ]);
  });
});
