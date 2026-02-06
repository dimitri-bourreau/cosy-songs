"use client";

import { useMemo, useState } from "react";
import { usePlaylistBuilder } from "@/context/playlist-builder-context";
import { Playlist } from "@/features/playlists/types";
import { deduplicateSongs } from "@/features/songs/deduplicate-songs";

type ExportService = "youtube" | "spotify" | "deezer";

interface ExportButtonProps {
  playlists: Playlist[];
}

const SERVICE_INFO: Record<ExportService, { label: string; border: string; active: string; warning?: string }> = {
  spotify: {
    label: "Spotify",
    border: "border-[#1DB954] text-[#1DB954]",
    active: "border-[#1DB954] bg-[#1DB954] text-white",
  },
  deezer: {
    label: "Deezer",
    border: "border-[#A238FF] text-[#A238FF]",
    active: "border-[#A238FF] bg-[#A238FF] text-white",
  },
  youtube: {
    label: "YouTube",
    border: "border-cosy-red text-cosy-red",
    active: "border-cosy-red bg-cosy-red text-white",
    warning:
      "YouTube has a daily quota of 10,000 units. If you exceed it, just come back the next day. Song searches are cached, so previously found songs won't need to be searched again.",
  },
};

export function ExportButton({ playlists }: ExportButtonProps) {
  const { state } = usePlaylistBuilder();
  const [service, setService] = useState<ExportService>("spotify");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [result, setResult] = useState<{ url: string; added: number; total: number } | null>(null);

  const songs = useMemo(() => {
    const raw =
      state.mode === "manual"
        ? state.pickedSongs
        : playlists
            .filter((p) => state.selectedEpisodeLinks.has(p.episodeLink))
            .flatMap((p) => p.songs);
    return state.deduplicate ? deduplicateSongs(raw) : raw;
  }, [state, playlists]);

  const handleExport = async () => {
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch(`/api/playlists/${service}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Cosy Songs", songs }),
      });

      if (response.status === 401) {
        window.location.href = `/api/auth/${service}`;
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "An error occurred");
        return;
      }

      setResult({ url: data.url, added: data.added, total: data.total });
      setAuthenticated(true);
    } catch {
      setError("Could not reach the server");
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = () => {
    window.location.href = `/api/auth/${service}`;
  };

  const info = SERVICE_INFO[service];

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-6">
      <div className="flex">
        {(Object.keys(SERVICE_INFO) as ExportService[]).map((s, i) => (
          <button
            key={s}
            onClick={() => { setService(s); setError(null); setResult(null); setAuthenticated(false); }}
            className={`cursor-pointer border-2 px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition ${
              i > 0 ? "border-l-0" : ""
            } ${service === s ? SERVICE_INFO[s].active : "border-cosy-border bg-white text-gray-500 hover:border-gray-400"}`}
          >
            {SERVICE_INFO[s].label}
          </button>
        ))}
      </div>

      {info.warning && (
        <p className="max-w-md text-center text-sm text-gray-500">
          {info.warning}
        </p>
      )}

      {!authenticated && !result ? (
        <div className="flex flex-col items-center gap-3">
          <button
            disabled={songs.length === 0}
            onClick={handleAuth}
            className={`cursor-pointer border-2 px-8 py-3 text-sm font-bold uppercase tracking-wide transition disabled:opacity-40 ${info.active}`}
          >
            1. Connect to {info.label}
          </button>
          <p className="text-sm text-gray-400">
            After connecting, you will return here to launch the export
          </p>
        </div>
      ) : null}

      {(authenticated || !result) && (
        <button
          disabled={songs.length === 0 || loading}
          onClick={handleExport}
          className={`cursor-pointer border-2 px-8 py-3 text-sm font-bold uppercase tracking-wide transition disabled:opacity-40 ${info.active}`}
        >
          {loading
            ? "Exporting..."
            : `${authenticated ? "" : "2. "}Export ${songs.length} songs to ${info.label}`}
        </button>
      )}

      {result && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-base font-bold text-green-700">
            {result.added}/{result.total} songs added
          </p>
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b-2 border-cosy-red text-base font-bold text-cosy-red transition hover:text-cosy-dark"
          >
            View playlist
          </a>
        </div>
      )}

      {error && <p className="text-sm font-bold text-red-600">{error}</p>}
    </div>
  );
}
