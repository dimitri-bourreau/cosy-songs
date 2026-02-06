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
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
      <input
        type="text"
        placeholder="Rechercher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3 w-full rounded-full border-0 bg-gray-50 px-4 py-2 text-sm ring-1 ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-cosy-red focus:outline-none"
      />
      <div className="max-h-80 overflow-y-auto">
        {filtered.map((playlist) => (
          <div key={playlist.episodeLink} className="mb-4">
            <p className="mb-1 text-xs font-bold tracking-wide text-gray-400 uppercase">
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
    <li className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition hover:bg-gray-50">
      <button
        onClick={onAdd}
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cosy-light text-xs font-bold text-cosy-red transition hover:bg-cosy-red hover:text-white"
      >
        +
      </button>
      <span className="min-w-0 truncate">
        <span className="font-semibold text-gray-900">{song.artist}</span>
        <span className="text-gray-400"> &mdash; </span>
        <span className="text-gray-600">{song.title}</span>
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
