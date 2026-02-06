import { Playlist } from "@/features/playlists/types";
import { SongRow } from "@/components/ui/song-row";

interface EpisodeCardProps {
  playlist: Playlist;
}

export function EpisodeCard({ playlist }: EpisodeCardProps) {
  return (
    <div className="group bg-white/90 rounded-xl shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between px-5 py-4">
        <a
          href={playlist.episodeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-gray-900 transition hover:text-cosy-red"
          onClick={(e) => e.stopPropagation()}
        >
          {playlist.episodeTitle}
        </a>
        <span className="ml-3 shrink-0 rounded-full bg-cosy-light px-2.5 py-0.5 text-xs font-medium text-cosy-red">
          {playlist.numberOfSongs}
        </span>
      </div>
      <ul className="px-2 py-2">
        {playlist.songs.map((song, i) => (
          <SongRow key={`${song.artist}-${song.title}-${i}`} song={song} />
        ))}
      </ul>
    </div>
  );
}
