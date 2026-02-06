import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

const CACHE_DIR = join(process.cwd(), ".cache");
const CACHE_FILE = join(CACHE_DIR, "youtube-video-ids.json");

type VideoCache = Record<string, string>;

export async function readCache(): Promise<VideoCache> {
  try {
    const data = await readFile(CACHE_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export async function writeCache(cache: VideoCache): Promise<void> {
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));
}

export function buildCacheKey(artist: string, title: string): string {
  return `${artist.toLowerCase().trim()}::${title.toLowerCase().trim()}`;
}
