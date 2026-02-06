import { Song } from "@/features/songs/types";
import { ServiceLink } from "@/components/ui/service-link";

interface SongRowProps {
  song: Song;
}

export function SongRow({ song }: SongRowProps) {
  return (
    <li className="flex items-center gap-2 rounded-lg px-3 py-1.5 transition hover:bg-gray-50">
      <span className="flex shrink-0 gap-1">
        <ServiceLink service="youtube" artist={song.artist} title={song.title} />
        <ServiceLink service="spotify" artist={song.artist} title={song.title} />
        <ServiceLink service="apple-music" artist={song.artist} title={song.title} />
        <ServiceLink service="deezer" artist={song.artist} title={song.title} />
      </span>
      <span className="min-w-0 truncate text-sm">
        <span className="font-semibold text-gray-900">{song.artist}</span>
        <span className="text-gray-400"> &mdash; </span>
        <span className="text-gray-600">{song.title}</span>
      </span>
    </li>
  );
}
