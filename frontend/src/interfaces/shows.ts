export interface Episode {
  season: number;
  episode: number;
  name: string;
  air_date: string;
}
export interface ShowFull {
  id: number;
  name: string;
  description: string;
  image_path: string;
  episodes: Episode[];
}
export interface ShowWrapper {
  tvShow: ShowFull;
}

export interface ShowSummary {
  id: number;
  name: string;
  permalink: string;
  start_date: string;
  end_date: string | null;
  country: string;
  network: string;
  status: string;
  image_thumbnail_path: string;
}

export interface Shows {
  total: string;
  page: number;
  pages: number;
  tv_shows: ShowSummary[];
}
