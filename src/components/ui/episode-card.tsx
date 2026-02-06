import { Playlist } from "@/features/playlists/types";
import { SongRow } from "@/components/ui/song-row";

interface EpisodeCardProps {
  playlist: Playlist;
}

export function EpisodeCard({ playlist }: EpisodeCardProps) {
  return (
    <div className="border-b border-cosy-border bg-white">
      <div className="flex items-center justify-between border-b border-cosy-border px-6 py-4">
        <a
          href={playlist.episodeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-bold uppercase tracking-wide text-gray-900 transition hover:text-cosy-red"
          onClick={(e) => e.stopPropagation()}
        >
          {playlist.episodeTitle}
        </a>
        <span className="ml-3 shrink-0 border border-cosy-red px-2.5 py-0.5 text-xs font-bold text-cosy-red">
          {playlist.numberOfSongs}
        </span>
      </div>
      <ul className="px-3 py-2">
        {playlist.songs.map((song, i) => (
          <SongRow key={`${song.artist}-${song.title}-${i}`} song={song} />
        ))}
      </ul>
    </div>
  );
}
