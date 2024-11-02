import { writeJson } from "https://deno.land/x/jsonfile/mod.ts";
import { CosyData } from "./types/cosydata.type.ts";
import { COSY_URL } from "./const/cosy-url.const.ts";
import { getEpisodesFromURL } from "./features/get-episodes-from-url.feat.ts";
import { getPlaylistsFromEpisodes } from "./features/get-playlists-from-episodes.feat.ts";

(async () => {
  const episodes = await getEpisodesFromURL(COSY_URL);
  const playlists = getPlaylistsFromEpisodes(episodes);
  const numberOfSongs = playlists
    .map(({ numberOfSongs }) => numberOfSongs)
    .reduce((a, b) => a + b);
  const cosyData: CosyData = {
    numberOfEpisodes: episodes.length,
    numberOfSongs,
    playlists,
  };
  await writeJson("playlists.json", cosyData, { spaces: 2 });
  console.log("DONE ✅");
})();
