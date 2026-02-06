import Link from "next/link";

interface StatsHeaderProps {
  numberOfEpisodes: number;
  numberOfSongs: number;
}

export function StatsHeader({
  numberOfEpisodes,
  numberOfSongs,
}: StatsHeaderProps) {
  const devMode = process.env.NEXT_PUBLIC_DEV === "1";

  return (
    <header className="w-full bg-cosy-red px-4 py-16 text-center text-white">
      <h1 className="text-5xl font-extrabold tracking-tight">Cosy Songs</h1>
      <p className="mt-3 text-lg font-medium opacity-90">
        {numberOfEpisodes} épisodes &middot; {numberOfSongs} musiques
      </p>
      {devMode && (
        <Link
          href="/playlist-builder"
          className="mt-6 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-cosy-red transition hover:bg-cosy-light"
        >
          Créer une playlist
        </Link>
      )}
    </header>
  );
}
