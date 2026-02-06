"use client";

import { useMemo } from "react";
import { usePlaylistBuilder } from "@/context/playlist-builder-context";
import { Playlist } from "@/features/playlists/types";
import { Song } from "@/features/songs/types";
import { deduplicateSongs } from "@/features/songs/deduplicate-songs";

interface ExportButtonProps {
  playlists: Playlist[];
}

export function ExportButton({ playlists }: ExportButtonProps) {
  const { state } = usePlaylistBuilder();

  const songs = useMemo(() => {
    const raw =
      state.mode === "manual"
        ? state.pickedSongs
        : playlists
            .filter((p) => state.selectedEpisodeLinks.has(p.episodeLink))
            .flatMap((p) => p.songs);
    return state.deduplicate ? deduplicateSongs(raw) : raw;
  }, [state, playlists]);

  return (
    <button
      disabled={songs.length === 0}
      onClick={() => handleExport(songs)}
      className="rounded-full bg-cosy-red px-6 py-3 text-sm font-semibold text-white shadow-sm transition disabled:opacity-40 hover:bg-cosy-dark"
    >
      Exporter vers YouTube ({songs.length} musiques)
    </button>
  );
}

async function handleExport(songs: Song[]) {
  const response = await fetch("/api/playlists/youtube", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Cosy Songs", songs }),
  });

  if (response.status === 401) {
    window.location.href = "/api/auth/youtube";
    return;
  }

  const data = await response.json();
  if (data.url) window.open(data.url, "_blank");
}
