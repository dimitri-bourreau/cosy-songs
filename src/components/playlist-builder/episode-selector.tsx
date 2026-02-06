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
    <div className="border-2 border-cosy-border bg-white">
      <label className="flex cursor-pointer items-center gap-2.5 border-b-2 border-cosy-border px-5 py-4 text-sm font-bold uppercase tracking-wide text-gray-900">
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
        All episodes
      </label>
      <div className="custom-scrollbar max-h-96 overflow-y-auto">
        {playlists.map((p) => (
          <label
            key={p.episodeLink}
            className="flex cursor-pointer items-center gap-2.5 border-b border-cosy-border/50 px-5 py-3 text-base transition hover:bg-cosy-cream/50"
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
            <span className="ml-auto shrink-0 border border-cosy-red px-2 py-0.5 text-xs font-bold text-cosy-red">
              {p.numberOfSongs}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
