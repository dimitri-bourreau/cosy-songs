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
    <header className="grain-bg border-b-4 border-cosy-dark bg-cosy-red px-6 py-20">
      <div className="relative z-10 mx-auto max-w-5xl">
        <h1 className="text-7xl font-black tracking-tighter text-white uppercase md:text-8xl">
          COSY SONGS
        </h1>
        <p className="mt-4 text-lg font-medium tracking-wide text-white/70 uppercase">
          {numberOfEpisodes} episodes &middot; {numberOfSongs} songs
        </p>
        {devMode && (
          <Link
            href="/playlist-builder"
            className="mt-8 inline-block border-2 border-white px-6 py-3 text-sm font-bold tracking-wide text-white uppercase transition hover:bg-white hover:text-cosy-red"
          >
            Build a playlist
          </Link>
        )}
      </div>
    </header>
  );
}
