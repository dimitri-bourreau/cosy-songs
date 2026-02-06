"use client";

import { useMemo } from "react";
import { usePlaylistBuilder } from "@/context/playlist-builder-context";
import { Playlist } from "@/features/playlists/types";
import { Song } from "@/features/songs/types";
import { deduplicateSongs } from "@/features/songs/deduplicate-songs";

interface PlaylistPreviewProps {
  playlists: Playlist[];
}

export function PlaylistPreview({ playlists }: PlaylistPreviewProps) {
  const { state, dispatch } = usePlaylistBuilder();

  const songs = useMemo(() => {
    const raw = getSongsForMode(state, playlists);
    return state.deduplicate ? deduplicateSongs(raw) : raw;
  }, [state, playlists]);

  return (
    <div className="border-2 border-cosy-border bg-white">
      <div className="flex items-center justify-between border-b-2 border-cosy-border px-5 py-4">
        <h3 className="text-sm font-bold tracking-wide text-gray-900 uppercase">
          Playlist
          <span className="ml-2 border border-cosy-red px-2 py-0.5 text-xs font-bold text-cosy-red">
            {songs.length}
          </span>
        </h3>
        <button
          onClick={() => dispatch({ type: "CLEAR" })}
          className="cursor-pointer text-sm font-bold tracking-wide text-gray-400 uppercase transition hover:text-cosy-red"
        >
          Clear all
        </button>
      </div>
      {songs.length === 0 ? (
        <p className="py-12 text-center text-base text-gray-400">
          No songs selected
        </p>
      ) : (
        <ul className="custom-scrollbar max-h-96 overflow-y-auto">
          {songs.map((song, i) => (
            <li
              key={`${song.artist}-${song.title}-${i}`}
              className="flex items-center justify-between border-b border-cosy-border/30 px-5 py-2.5 text-base transition hover:bg-cosy-cream/50"
            >
              <span className="min-w-0 truncate">
                <span className="font-bold text-gray-900">{song.artist}</span>
                <span className="text-gray-300"> &mdash; </span>
                <span className="text-gray-500">{song.title}</span>
              </span>
              {state.mode === "manual" && (
                <button
                  onClick={() => dispatch({ type: "REMOVE_SONG", payload: i })}
                  className="ml-2 flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center border border-gray-300 text-sm text-gray-400 transition hover:border-cosy-red hover:text-cosy-red"
                >
                  &times;
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function getSongsForMode(
  state: { mode: string; selectedEpisodeLinks: Set<string>; pickedSongs: Song[] },
  playlists: Playlist[],
): Song[] {
  if (state.mode === "manual") return state.pickedSongs;
  return playlists
    .filter((p) => state.selectedEpisodeLinks.has(p.episodeLink))
    .flatMap((p) => p.songs);
}
