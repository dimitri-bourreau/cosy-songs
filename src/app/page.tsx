import { getEpisodesFromUrl } from "@/features/rss/get-episodes-from-url";
import { createCosyData } from "@/features/playlists/create-cosy-data";
import { COSY_URL } from "@/features/constants/cosy-url";
import { StatsHeader } from "@/components/ui/stats-header";
import { SongCatalog } from "@/components/ui/song-catalog";

export const revalidate = 3600;

export default async function Home() {
  const episodes = await getEpisodesFromUrl(COSY_URL);
  const cosyData = createCosyData(episodes);

  return (
    <main className="min-h-screen bg-cosy-red/90">
      <StatsHeader
        numberOfEpisodes={cosyData.numberOfEpisodes}
        numberOfSongs={cosyData.numberOfSongs}
      />
      <SongCatalog playlists={cosyData.playlists} />
    </main>
  );
}
