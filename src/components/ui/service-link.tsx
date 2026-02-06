type Service = "youtube" | "spotify" | "apple-music" | "deezer";

interface ServiceLinkProps {
  service: Service;
  artist: string;
  title: string;
}

const SERVICE_CONFIG: Record<
  Service,
  { label: string; buildUrl: (q: string) => string }
> = {
  youtube: {
    label: "YouTube",
    buildUrl: (q) => `https://www.youtube.com/results?search_query=${q}`,
  },
  spotify: {
    label: "Spotify",
    buildUrl: (q) => `https://open.spotify.com/search/${q}`,
  },
  "apple-music": {
    label: "Apple Music",
    buildUrl: (q) => `https://music.apple.com/fr/search?term=${q}`,
  },
  deezer: {
    label: "Deezer",
    buildUrl: (q) => `https://www.deezer.com/search/${q}`,
  },
};

const SERVICE_STYLES: Record<Service, string> = {
  youtube: "border-red-300 text-red-500 hover:bg-red-50",
  spotify: "border-green-300 text-green-600 hover:bg-green-50",
  "apple-music": "border-pink-300 text-pink-500 hover:bg-pink-50",
  deezer: "border-purple-300 text-purple-500 hover:bg-purple-50",
};

export function ServiceLink({ service, artist, title }: ServiceLinkProps) {
  const config = SERVICE_CONFIG[service];
  const query = encodeURIComponent(`${artist} ${title}`);

  return (
    <a
      href={config.buildUrl(query)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-5 items-center justify-center border px-1.5 text-[9px] font-bold uppercase transition ${SERVICE_STYLES[service]}`}
    >
      {config.label}
    </a>
  );
}
