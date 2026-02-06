"use client";

import { Playlist } from "@/features/playlists/types";
import { usePlaylistBuilder } from "@/context/playlist-builder-context";

interface EpisodeSelectorProps {
  playlists: Playlist[];
}

export function EpisodeSelector({ playlists }: EpisodeSelectorProps) {
  const { state, dispatch } = usePlaylistBuilder();
  const allLinks = playlists.map((p) => p.episodeLink);
  const allSelected = allLinks.every((l) =>
    state.selectedEpisodeLinks.has(l),
  );

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
      <label className="flex items-center gap-2 border-b border-gray-100 pb-3 text-sm font-bold text-gray-900">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={() =>
            allSelected
              ? dispatch({ type: "DESELECT_ALL_EPISODES" })
              : dispatch({ type: "SELECT_ALL_EPISODES", payload: allLinks })
          }
          className="accent-cosy-red"
        />
        Tous les épisodes
      </label>
      <div className="mt-3 max-h-80 overflow-y-auto">
        {playlists.map((p) => (
          <label
            key={p.episodeLink}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={state.selectedEpisodeLinks.has(p.episodeLink)}
              onChange={() =>
                dispatch({ type: "TOGGLE_EPISODE", payload: p.episodeLink })
              }
              className="accent-cosy-red"
            />
            <span className="text-gray-700">{p.episodeTitle}</span>
            <span className="ml-auto shrink-0 text-xs text-gray-400">
              {p.numberOfSongs}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
