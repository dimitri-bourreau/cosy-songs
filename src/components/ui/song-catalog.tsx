"use client";

import { useState } from "react";
import { Playlist } from "@/features/playlists/types";
import { EpisodeCard } from "@/components/ui/episode-card";
import { SearchInput } from "@/components/ui/search-input";

interface SongCatalogProps {
  playlists: Playlist[];
}

export function SongCatalog({ playlists }: SongCatalogProps) {
  const [search, setSearch] = useState("");

  const filtered = filterPlaylists(playlists, search);

  return (
    <div className="flex w-full flex-col items-center gap-6 px-4 py-10">
      <SearchInput value={search} onChange={setSearch} />
      <div className="flex w-full max-w-3xl flex-col gap-3">
        {filtered.map((playlist) => (
          <EpisodeCard key={playlist.episodeLink} playlist={playlist} />
        ))}
      </div>
    </div>
  );
}

function filterPlaylists(playlists: Playlist[], query: string): Playlist[] {
  if (!query.trim()) return playlists;
  const q = query.toLowerCase();

  return playlists
    .map((playlist) => ({
      ...playlist,
      songs: playlist.songs.filter(
        (s) =>
          s.artist.toLowerCase().includes(q) ||
          s.title.toLowerCase().includes(q),
      ),
    }))
    .filter((p) => p.songs.length > 0)
    .map((p) => ({ ...p, numberOfSongs: p.songs.length }));
}
