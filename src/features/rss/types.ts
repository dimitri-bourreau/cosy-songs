export interface Episode {
  guid: {
    [key: string]: string;
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
    [key: string]: string;
  };
  "itunes:image": {
    "@href": string;
  };
}
