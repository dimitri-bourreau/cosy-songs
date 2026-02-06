import { fromSongsStringToArray } from "@/features/songs/from-song-string-to-array";

describe("fromSongsStringToArray", () => {
  it("splits multiline string into song array", () => {
    const input = "Nirvana - All Apologies\nRadiohead - Creep";
    expect(fromSongsStringToArray(input)).toEqual([
      "Nirvana - All Apologies",
      "Radiohead - Creep",
    ]);
  });

  it("strips leading dash prefix", () => {
    const input = "- Nirvana - All Apologies\n- Radiohead - Creep";
    expect(fromSongsStringToArray(input)).toEqual([
      "Nirvana - All Apologies",
      "Radiohead - Creep",
    ]);
  });

  it("filters out lines without artist-title pattern", () => {
    const input = "Playlist\nNirvana - All Apologies\nsome random text";
    expect(fromSongsStringToArray(input)).toEqual([
      "Nirvana - All Apologies",
    ]);
  });
});
