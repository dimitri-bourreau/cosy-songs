import { getEpisodesFromUrl } from "@/features/rss/get-episodes-from-url";
import { createCosyData } from "@/features/playlists/create-cosy-data";
import { COSY_URL } from "@/features/constants/cosy-url";
import { PlaylistBuilderClient } from "@/components/playlist-builder/playlist-builder-client";
import Link from "next/link";

export const revalidate = 3600;

export default async function PlaylistBuilderPage() {
  const episodes = await getEpisodesFromUrl(COSY_URL);
  const cosyData = createCosyData(episodes);
  const devMode = process.env.NEXT_PUBLIC_DEV === "1";

  if (!devMode)
    return (
      <main className="grain-bg min-h-screen bg-cosy-red">
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-20">
          <h1 className="text-5xl font-black tracking-tighter text-white uppercase">
            Developer mode only
          </h1>
          <p className="mt-6 text-lg text-white/70">
            As a developer you can use the YouTube, Spotify and Deezer APIs to
            create playlists automatically. All instructions are on the project
            GitHub.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href="/"
              className="border-2 border-white px-5 py-2.5 text-sm font-bold tracking-wide text-white uppercase transition hover:bg-white hover:text-cosy-red"
            >
              Back to catalog
            </Link>
            <Link
              href="https://github.com/dimitri-bourreau/cosy-songs"
              className="border-2 border-white/50 px-5 py-2.5 text-sm font-bold tracking-wide text-white/70 uppercase transition hover:border-white hover:text-white"
            >
              GitHub
            </Link>
          </div>
        </div>
      </main>
    );

  return (
    <main className="min-h-screen bg-cosy-cream">
      <header className="grain-bg border-b-4 border-cosy-dark bg-cosy-red px-6 py-16">
        <div className="relative z-10 mx-auto max-w-5xl">
          <Link
            href="/"
            className="text-sm font-bold tracking-wide text-white/60 uppercase transition hover:text-white"
          >
            &larr; Back to catalog
          </Link>
          <h1 className="mt-4 text-5xl font-black tracking-tighter text-white uppercase md:text-6xl">
            Build a playlist
          </h1>
        </div>
      </header>
      <div className="px-6 py-10">
        <PlaylistBuilderClient playlists={cosyData.playlists} />
      </div>
    </main>
  );
}
