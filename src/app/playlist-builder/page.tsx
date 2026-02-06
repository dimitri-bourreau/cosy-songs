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
      <main className="min-h-screen bg-cosy-red">
        <header className="w-full px-4 py-12 text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Cette page est accessible en mode développeur
          </h1>
          <Link
            href="/"
            className="mt-3 inline-block text-sm font-medium text-white/80 underline transition hover:text-white"
          >
            Retour au catalogue
          </Link>
        </header>
        <div className="px-4 py-10 flex flex-col gap-4 items-center">
          <p className="text-white">
            Entant que développeur vous pouvez, avec l&apos;API YouTube, créer
            des playlist automatiquement. Toutes les instructions sont sur le
            GitHub de ce projet.
          </p>

          <Link
            href="https://github.com/dimitri-bourreau/cosy-songs"
            className="mt-3 inline-block text-sm font-medium text-white/80 underline transition hover:text-white"
          >
            GitHub
          </Link>
        </div>
      </main>
    );

  return (
    <main className="min-h-screen bg-cosy-red/70">
      <header className="w-full bg-cosy-red px-4 py-12 text-center text-white">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Créer une playlist
        </h1>
        <Link
          href="/"
          className="mt-3 inline-block text-sm font-medium text-white/80 underline transition hover:text-white"
        >
          Retour au catalogue
        </Link>
      </header>
      <div className="px-4 py-10">
        <PlaylistBuilderClient playlists={cosyData.playlists} />
      </div>
    </main>
  );
}
