"use client";

import { useState } from "react";
import { Playlist } from "@/features/playlists/types";
import { Song } from "@/features/songs/types";
import { usePlaylistBuilder } from "@/context/playlist-builder-context";

interface SongPickerProps {
  playlists: Playlist[];
}

export function SongPicker({ playlists }: SongPickerProps) {
  const { dispatch } = usePlaylistBuilder();
  const [search, setSearch] = useState("");

  const filtered = filterBySearch(playlists, search);

  return (
    <div className="border-2 border-cosy-border bg-white">
      <div className="border-b-2 border-cosy-border px-5 py-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border-2 border-cosy-border bg-cosy-cream px-4 py-2.5 text-base placeholder:text-gray-400 focus:border-cosy-red focus:outline-none"
        />
      </div>
      <div className="custom-scrollbar max-h-96 overflow-y-auto">
        {filtered.map((playlist) => (
          <div key={playlist.episodeLink}>
            <p className="border-b border-cosy-border/50 bg-cosy-cream/50 px-5 py-2 text-xs font-bold tracking-wide text-gray-400 uppercase">
              {playlist.episodeTitle}
            </p>
            <ul>
              {playlist.songs.map((song, i) => (
                <SongPickerRow
                  key={`${song.artist}-${song.title}-${i}`}
                  song={song}
                  onAdd={() => dispatch({ type: "ADD_SONG", payload: song })}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function SongPickerRow({ song, onAdd }: { song: Song; onAdd: () => void }) {
  return (
    <li className="flex items-center gap-3 border-b border-cosy-border/30 px-5 py-2.5 text-base transition hover:bg-cosy-cream/50">
      <button
        onClick={onAdd}
        className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center border border-cosy-red text-xs font-bold text-cosy-red transition hover:bg-cosy-red hover:text-white"
      >
        +
      </button>
      <span className="min-w-0 truncate">
        <span className="font-bold text-gray-900">{song.artist}</span>
        <span className="text-gray-300"> &mdash; </span>
        <span className="text-gray-500">{song.title}</span>
      </span>
    </li>
  );
}

function filterBySearch(playlists: Playlist[], query: string): Playlist[] {
  if (!query.trim()) return playlists;
  const q = query.toLowerCase();
  return playlists
    .map((p) => ({
      ...p,
      songs: p.songs.filter(
        (s) =>
          s.artist.toLowerCase().includes(q) ||
          s.title.toLowerCase().includes(q),
      ),
    }))
    .filter((p) => p.songs.length > 0);
}
