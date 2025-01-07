import { Dispatch, SetStateAction } from "react";

interface IImage {
  id: number;
  image_id: string;
  url: string;
}

export interface IOption {
  id: number;
  name: string;
  slug: string;
  cover?: {
    image_id: string;
  };
}

export interface IPlatform extends IOption {
  abbreviation: string;
  platform_logo: IImage;
}

interface IGenre extends IOption {
  url: string;
}

interface IInvolvedCompany {
  id: number;
  company: IOption;
}

export interface IGameBase extends IOption {
  cover: IImage;
}

export interface IGameDetail extends IGameBase {
  created_at: number;
  first_release_date: number;
  genres: IGenre[];
  involved_companies: IInvolvedCompany[];
  platforms: IPlatform[];
  release_dates: { id: number; human: string }[];
  screenshots: IImage[];
  similar_games: IGameBase[];
  summary: string;
  total_rating: number;
  updated_at: number;
  url: string;
}

export interface IGame extends IGameBase {
  created_at: number;
}

export interface IGameProps {
  game: IGameDetail;
}

export interface IGameCard {
  game: IGame | IGameBase;
  filter?: string;
  setGames?: Dispatch<SetStateAction<IGame[]>>;
  disableIconButton?: boolean;
}

export interface IFilters {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export interface ISnackbarProps {
  game: IGame | IGameBase;
  clicked: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
