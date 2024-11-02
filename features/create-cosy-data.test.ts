import { assertEquals } from "jsr:@std/assert";
import { Episode } from "../types/episode.type.ts";
import {createCosyData} from "./create-cosy-data.feat.ts";
import {CosyData} from "../types/cosydata.type.ts";

const mockSoundcloudResponseEpisodesJson = await Deno.readTextFile('mocks/episodes.json');
const mockSoundcloudResponseEpisodes = JSON.parse(mockSoundcloudResponseEpisodesJson) as Episode[];

const expectedPlaylistsJson = await Deno.readTextFile('mocks/playlists.json');
const expectedPlaylists = JSON.parse(expectedPlaylistsJson) as CosyData;

Deno.test('from soundcloud response, create data json for index.html', () => {
  const createdCosyData = createCosyData(mockSoundcloudResponseEpisodes);
  const stringifiedThenParsedCosyData = JSON.parse(JSON.stringify(createdCosyData));
  assertEquals(stringifiedThenParsedCosyData, expectedPlaylists);
})
