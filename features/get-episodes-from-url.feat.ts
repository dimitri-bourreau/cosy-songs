import {parse} from "https://deno.land/x/xml/mod.ts";
import {Episode} from "../types/episode.type.ts";

export const getEpisodesFromURL = async (url: string): Promise<Episode[]> => {
  const fetchResponse = await fetch(url);
  const xmlContent = await fetchResponse.text();
  return parse(xmlContent)?.rss?.channel?.item as Episode[];
}
