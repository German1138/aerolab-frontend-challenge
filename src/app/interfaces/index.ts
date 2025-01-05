interface IImage {
  id: number;
  image_id: string;
  url: string;
}

interface IPlatforms {
  id: number;
  abbreviation: string;
  name: string;
  platform_logo: {
    id: number;
    image_id: string;
    url: string;
  };
  slug: string;
}

interface IGenres {
  id: number;
  name: string;
  slug: string;
  url: string;
}

interface IInvolvedCompanies {
  id: number;
  company: { id: number; name: string };
}

export interface ISimilarGames {
  id: number;
  name: string;
  slug: string;
  cover: IImage;
}

export interface IGameDetail {
  id: number;
  cover: IImage;
  created_at: number;
  first_release_date: number;
  genres: IGenres[];
  involved_companies: IInvolvedCompanies[];
  name: string;
  platforms: IPlatforms[];
  release_dates: { id: number; human: string }[];
  screenshots: IImage[];
  similar_games: ISimilarGames[];
  slug: string;
  summary: string;
  total_rating: number;
  updated_at: number;
  url: string;
}

export interface IGame {
  id: number;
  cover: IImage;
  created_at: number;
  name: string;
  slug: string;
}

export interface IGameProps {
  game: IGameDetail;
}
