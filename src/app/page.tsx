import { PodcastAdapter } from "@/features/podcast/adapters/podcast.adapter";
import { getSongs } from "@/features/podcast/services/get-songs.service";

export default async function Home() {
  const podcastEpisodes = await getSongs(new PodcastAdapter());

  return (
    <div>
      <div>
        <div className="mt-2">
          <div className="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 dark:bg-white/5 dark:outline dark:outline-1 dark:-outline-offset-1 dark:outline-white/10 dark:focus-within:outline-indigo-500">
            <input
              id="search"
              name="search"
              type="text"
              placeholder="Chercher..."
              className="block min-w-0 grow px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>
      <ul
        role="list"
        className="divide-y max-w-90 divide-gray-100 dark:divide-white/5"
      >
        {podcastEpisodes.map((episode) => (
          <li
            key={crypto.randomUUID()}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm/6 font-semibold">{episode.title}</p>
              </div>
              <ul>
                {episode.songsList.map((song) => (
                  <li key={crypto.randomUUID()} className="text-sm">
                    {song.title} - {song.artist}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:ring-white/5 dark:hover:bg-white/20"
      >
        Voir tous les podcasts
      </button>
    </div>
  );
}
