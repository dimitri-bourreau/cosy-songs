"use client";

import { usePlaylistBuilder } from "@/context/playlist-builder-context";

export function DedupToggle() {
  const { state, dispatch } = usePlaylistBuilder();

  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-600">
      <input
        type="checkbox"
        checked={state.deduplicate}
        onChange={() => dispatch({ type: "TOGGLE_DEDUP" })}
        className="accent-cosy-red"
      />
      Remove duplicates
    </label>
  );
}
