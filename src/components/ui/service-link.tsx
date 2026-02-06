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
  youtube: "bg-red-50 text-red-600 hover:bg-red-100",
  spotify: "bg-green-50 text-green-600 hover:bg-green-100",
  "apple-music": "bg-pink-50 text-pink-600 hover:bg-pink-100",
  deezer: "bg-purple-50 text-purple-600 hover:bg-purple-100",
};

export function ServiceLink({ service, artist, title }: ServiceLinkProps) {
  const config = SERVICE_CONFIG[service];
  const query = encodeURIComponent(`${artist} ${title}`);

  return (
    <a
      href={config.buildUrl(query)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold transition ${SERVICE_STYLES[service]}`}
    >
      {config.label}
    </a>
  );
}
