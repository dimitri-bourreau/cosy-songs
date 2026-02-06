"use client";

import { Playlist } from "@/features/playlists/types";
import { PlaylistBuilderProvider, usePlaylistBuilder } from "@/context/playlist-builder-context";
import { ModeSelector } from "@/components/playlist-builder/mode-selector";
import { DedupToggle } from "@/components/playlist-builder/dedup-toggle";
import { EpisodeSelector } from "@/components/playlist-builder/episode-selector";
import { SongPicker } from "@/components/playlist-builder/song-picker";
import { PlaylistPreview } from "@/components/playlist-builder/playlist-preview";
import { ExportButton } from "@/components/playlist-builder/export-button";

interface Props {
  playlists: Playlist[];
}

export function PlaylistBuilderClient({ playlists }: Props) {
  return (
    <PlaylistBuilderProvider>
      <PlaylistBuilderInner playlists={playlists} />
    </PlaylistBuilderProvider>
  );
}

function PlaylistBuilderInner({ playlists }: Props) {
  const { state } = usePlaylistBuilder();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <ModeSelector />
        <DedupToggle />
      </div>
      <div className="grid w-full gap-6 md:grid-cols-2">
        {state.mode === "auto" ? (
          <EpisodeSelector playlists={playlists} />
        ) : (
          <SongPicker playlists={playlists} />
        )}
        <PlaylistPreview playlists={playlists} />
      </div>
      <ExportButton playlists={playlists} />
    </div>
  );
}
