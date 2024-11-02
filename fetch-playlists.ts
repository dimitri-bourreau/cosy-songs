import {parse} from "https://deno.land/x/xml/mod.ts";
import {writeJson} from 'https://deno.land/x/jsonfile/mod.ts';

interface Episode {
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
  "description": string;
  "enclosure": {
    [key: string]: string;
  }
  "itunes:image": {
    "@href": string;
  }
}

interface Song {
  title: string;
  artist: string;
}

interface Playlist {
  episodeTitle: string;
  episodeLink: string;
  numberOfSongs: number;
  songs: Song[]
}

interface CosyData {
  numberOfEpisodes: number;
  numberOfSongs: number;
  playlists: Playlist[]
}

const COSY_URL = 'https://feeds.soundcloud.com/users/soundcloud:users:274829367/sounds.rss';

const getEpisodes = async (url: string): Promise<Episode[]> => {
  const fetchResponse = await fetch(COSY_URL);
  const xmlContent = await fetchResponse.text();
  return parse(xmlContent)?.rss?.channel?.item as Episode[];
}

const getPlaylistKeyWord = (description: string): 'Playlist' | 'playlist' | 'musicaux' | null => {
  return description.match('Playlist')
    ? 'Playlist'
    : description.match('playlist')
      ? 'playlist'
      : description.match('musicaux')
        ? 'musicaux'
        : null;
}

const fromSongsStringToArray = (songs: string): string[] => {
  return songs
    .split('\n')
    .filter(song => song.match(/\s*-?(\w+)\s*-\s*(\w+)/))
    .map(song => {
      if (song.match(/^- (.*)$/)) return song.slice(2).trim();
      return song.trim()
    })
}

const formatSongs = (songs: string): Song[] => {
  const songsArray: string[] = fromSongsStringToArray(songs);
  return songsArray.map(song => {
    const [artist, title] = song.split(' - ');
    return {
      title,
      artist
    }
  })
}

const getSongsFromEpisode = ({description}: Episode): Song[] => {
  const keyWord = getPlaylistKeyWord(description);
  if (!keyWord) return [];
  const songs = description.split(keyWord).slice(1)[0];
  return formatSongs(songs);
}

const getPlaylists = (episodes: Episode[]): Playlist[] => {
  return episodes.map(episode => {
    const songs = getSongsFromEpisode(episode);
    return {
      episodeTitle: episode.title,
      episodeLink: episode.link,
      numberOfSongs: songs.length,
      songs
    }
  })
}

(async () => {
  const episodes = await getEpisodes(COSY_URL);
  const playlists = getPlaylists(episodes);
  const numberOfSongs = playlists
    .map(({numberOfSongs}) => numberOfSongs)
    .reduce((a, b) => a + b)
  const cosyData: CosyData = {
    numberOfEpisodes: episodes.length,
    numberOfSongs,
    playlists
  }
  await writeJson('playlists.json', cosyData, {spaces: 2});
  console.log('DONE ✅')
})();
