import { getPlaylistKeyWord } from "@/features/songs/get-playlist-keyword";

describe("getPlaylistKeyWord", () => {
  it("returns 'Playlist' when found", () => {
    expect(getPlaylistKeyWord("-- Playlist --")).toBe("Playlist");
  });

  it("returns 'playlist' when lowercase found", () => {
    expect(getPlaylistKeyWord("voici la playlist")).toBe("playlist");
  });

  it("returns 'musicaux' when found", () => {
    expect(getPlaylistKeyWord("extraits musicaux")).toBe("musicaux");
  });

  it("returns null when no keyword found", () => {
    expect(getPlaylistKeyWord("no match here")).toBeNull();
  });
});
