"use client";

import { usePlaylistBuilder } from "@/context/playlist-builder-context";

export function DedupToggle() {
  const { state, dispatch } = usePlaylistBuilder();

  return (
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={state.deduplicate}
        onChange={() => dispatch({ type: "TOGGLE_DEDUP" })}
        className="accent-cosy-red"
      />
      Supprimer les doublons
    </label>
  );
}
