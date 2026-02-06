"use client";

import { usePlaylistBuilder } from "@/context/playlist-builder-context";

export function ModeSelector() {
  const { state, dispatch } = usePlaylistBuilder();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => dispatch({ type: "SET_MODE", payload: "auto" })}
        className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
          state.mode === "auto"
            ? "bg-cosy-red text-white shadow-sm"
            : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50"
        }`}
      >
        Playlist automatique
      </button>
      <button
        onClick={() => dispatch({ type: "SET_MODE", payload: "manual" })}
        className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
          state.mode === "manual"
            ? "bg-cosy-red text-white shadow-sm"
            : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50"
        }`}
      >
        Sélection manuelle
      </button>
    </div>
  );
}
