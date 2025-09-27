export interface PodcastEpisode {
  guid: {
    "#text": string;
    "@isPermaLink": string;
  };
  title: string;
  pubDate: string;
  link: string;
  "itunes:duration": string;
  "itunes:author": string;
  "itunes:explicit": string;
  "itunes:summary": string;
  "itunes:subtitle": string;
  description: string;
  enclosure: {
    "@type": string;
    "@url": string;
    "@length": string;
  };
  "itunes:image": {
    "@href": string;
  };
}
