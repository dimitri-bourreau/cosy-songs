import Link from "next/link";

interface StatsHeaderProps {
  numberOfEpisodes: number;
  numberOfSongs: number;
}

const PODCAST_LINKS = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/show/3WRu0whFXjZoxr8jyy03UN",
  },
  {
    label: "Apple Podcasts",
    href: "https://podcasts.apple.com/fr/podcast/le-cosy-corner/id1186841043",
  },
  { label: "Deezer", href: "https://www.deezer.com/fr/show/57503" },
  { label: "SoundCloud", href: "https://soundcloud.com/lecosycorner" },
];

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
        <p className="mt-3 max-w-lg text-base leading-relaxed text-white/80">
          Toutes les musiques citées dans le podcast{" "}
          <a
            href="https://soundcloud.com/lecosycorner"
            rel="noopener noreferrer"
            className="border-b border-white/50 font-semibold text-white transition hover:border-white"
          >
            Cosy Corner
          </a>
          , rassemblées au même endroit. Parcourez les épisodes et retrouvez
          chaque morceau.
        </p>
        <p className="mt-4 text-lg font-medium tracking-wide text-white/70 uppercase">
          {numberOfEpisodes} épisodes &middot; {numberOfSongs} morceaux
        </p>

        <nav className="mt-6 flex flex-wrap gap-3">
          {PODCAST_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              rel="noopener noreferrer"
              className="border-2 border-white/60 px-4 py-2 text-xs font-bold tracking-wide text-white uppercase transition hover:border-white hover:bg-white hover:text-cosy-red"
            >
              {label}
            </a>
          ))}
        </nav>

        {devMode && (
          <Link
            href="/playlist-builder"
            className="mt-8 inline-block border-2 border-white px-6 py-3 text-sm font-bold tracking-wide text-white uppercase transition hover:bg-white hover:text-cosy-red"
          >
            Build a playlist
          </Link>
        )}

        <p className="mt-8 text-xs text-white/50">
          Fait par{" "}
          <a
            href="https://release-dev.com"
            rel="noopener noreferrer"
            className="border-b border-white/30 transition hover:border-white/60 hover:text-white/70"
          >
            Dimitri Bourreau
          </a>{" "}
          &middot;{" "}
          <a
            href="https://github.com/dimitri-bourreau/cosy-songs"
            rel="noopener noreferrer"
            className="border-b border-white/30 transition hover:border-white/60 hover:text-white/70"
          >
            Code source
          </a>
        </p>
      </div>
    </header>
  );
}
