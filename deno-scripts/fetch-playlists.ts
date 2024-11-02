import { writeJson } from "https://deno.land/x/jsonfile/mod.ts";
import { COSY_URL } from "../const/cosy-url.const.ts";
import { getEpisodesFromURL } from "../features/get-episodes-from-url.feat.ts";
import { createCosyData } from "../features/create-cosy-data.feat.ts";

const fetchPlaylists = async () => {
  const episodes = await getEpisodesFromURL(COSY_URL);
  const cosyData = createCosyData(episodes);
  await writeJson("json-data/playlists.json", cosyData, { spaces: 2 });
  console.log("DONE ✅");
}

void fetchPlaylists();

