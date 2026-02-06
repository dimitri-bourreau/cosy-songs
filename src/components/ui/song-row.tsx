import { Song } from "@/features/songs/types";
import { ServiceLink } from "@/components/ui/service-link";

interface SongRowProps {
  song: Song;
}

export function SongRow({ song }: SongRowProps) {
  return (
    <li className="flex items-center gap-3 px-3 py-2 transition hover:bg-cosy-cream/50">
      <span className="flex shrink-0 gap-1">
        <ServiceLink service="youtube" artist={song.artist} title={song.title} />
        <ServiceLink service="spotify" artist={song.artist} title={song.title} />
        <ServiceLink service="apple-music" artist={song.artist} title={song.title} />
        <ServiceLink service="deezer" artist={song.artist} title={song.title} />
      </span>
      <span className="min-w-0 truncate text-base">
        <span className="font-bold text-gray-900">{song.artist}</span>
        <span className="text-gray-300"> &mdash; </span>
        <span className="text-gray-500">{song.title}</span>
      </span>
    </li>
  );
}
