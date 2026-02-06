"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { Song } from "@/features/songs/types";

type Mode = "auto" | "manual";

interface PlaylistBuilderState {
  mode: Mode;
  selectedEpisodeLinks: Set<string>;
  pickedSongs: Song[];
  deduplicate: boolean;
}

type Action =
  | { type: "SET_MODE"; payload: Mode }
  | { type: "TOGGLE_EPISODE"; payload: string }
  | { type: "SELECT_ALL_EPISODES"; payload: string[] }
  | { type: "DESELECT_ALL_EPISODES" }
  | { type: "ADD_SONG"; payload: Song }
  | { type: "REMOVE_SONG"; payload: number }
  | { type: "TOGGLE_DEDUP" }
  | { type: "CLEAR" };

const initialState: PlaylistBuilderState = {
  mode: "auto",
  selectedEpisodeLinks: new Set(),
  pickedSongs: [],
  deduplicate: true,
};

function reducer(
  state: PlaylistBuilderState,
  action: Action,
): PlaylistBuilderState {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, mode: action.payload };
    case "TOGGLE_EPISODE": {
      const next = new Set(state.selectedEpisodeLinks);
      if (next.has(action.payload)) next.delete(action.payload);
      else next.add(action.payload);
      return { ...state, selectedEpisodeLinks: next };
    }
    case "SELECT_ALL_EPISODES":
      return { ...state, selectedEpisodeLinks: new Set(action.payload) };
    case "DESELECT_ALL_EPISODES":
      return { ...state, selectedEpisodeLinks: new Set() };
    case "ADD_SONG":
      return { ...state, pickedSongs: [...state.pickedSongs, action.payload] };
    case "REMOVE_SONG":
      return {
        ...state,
        pickedSongs: state.pickedSongs.filter((_, i) => i !== action.payload),
      };
    case "TOGGLE_DEDUP":
      return { ...state, deduplicate: !state.deduplicate };
    case "CLEAR":
      return { ...initialState };
    default:
      return state;
  }
}

const PlaylistBuilderContext = createContext<{
  state: PlaylistBuilderState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function PlaylistBuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <PlaylistBuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </PlaylistBuilderContext.Provider>
  );
}

export function usePlaylistBuilder() {
  const ctx = useContext(PlaylistBuilderContext);
  if (!ctx) throw new Error("usePlaylistBuilder must be used within provider");
  return ctx;
}
