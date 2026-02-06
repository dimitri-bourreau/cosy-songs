import { XMLParser } from "fast-xml-parser";
import { Episode } from "@/features/rss/types";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@",
});

export const getEpisodesFromUrl = async (url: string): Promise<Episode[]> => {
  const response = await fetch(url);
  const xml = await response.text();
  const parsed = parser.parse(xml);
  return parsed.rss.channel.item as Episode[];
};
