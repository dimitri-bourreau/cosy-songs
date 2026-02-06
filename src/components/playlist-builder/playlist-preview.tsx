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
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="text-sm font-bold text-gray-900">
          Playlist
          <span className="ml-2 rounded-full bg-cosy-light px-2 py-0.5 text-xs font-semibold text-cosy-red">
            {songs.length}
          </span>
        </h3>
        <button
          onClick={() => dispatch({ type: "CLEAR" })}
          className="text-xs font-medium text-gray-400 transition hover:text-cosy-red"
        >
          Tout effacer
        </button>
      </div>
      {songs.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-400">
          Aucune musique sélectionnée
        </p>
      ) : (
        <ul className="mt-3 max-h-80 overflow-y-auto">
          {songs.map((song, i) => (
            <li
              key={`${song.artist}-${song.title}-${i}`}
              className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm transition hover:bg-gray-50"
            >
              <span className="min-w-0 truncate">
                <span className="font-semibold text-gray-900">{song.artist}</span>
                <span className="text-gray-400"> &mdash; </span>
                <span className="text-gray-600">{song.title}</span>
              </span>
              {state.mode === "manual" && (
                <button
                  onClick={() => dispatch({ type: "REMOVE_SONG", payload: i })}
                  className="ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs text-gray-400 transition hover:bg-red-50 hover:text-cosy-red"
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
