"use client";

import { usePlaylistBuilder } from "@/context/playlist-builder-context";

export function ModeSelector() {
  const { state, dispatch } = usePlaylistBuilder();

  return (
    <div className="flex">
      <button
        onClick={() => dispatch({ type: "SET_MODE", payload: "auto" })}
        className={`cursor-pointer border-2 px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition ${
          state.mode === "auto"
            ? "border-cosy-red bg-cosy-red text-white"
            : "border-cosy-border bg-white text-gray-500 hover:border-gray-400"
        }`}
      >
        Automatic
      </button>
      <button
        onClick={() => dispatch({ type: "SET_MODE", payload: "manual" })}
        className={`cursor-pointer border-2 border-l-0 px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition ${
          state.mode === "manual"
            ? "border-cosy-red bg-cosy-red text-white"
            : "border-cosy-border bg-white text-gray-500 hover:border-gray-400"
        }`}
      >
        Manual
      </button>
    </div>
  );
}
