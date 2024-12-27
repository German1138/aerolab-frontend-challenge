interface ICover {
  id: number;
  alpha_channel: boolean;
  animated: boolean;
  game: number;
  height: number;
  image_id: string;
  url: string;
  width: number;
  checksum: string;
}

interface IPlatform {
  id: number;
  abbreviation: string;
  alternative_name: string;
  category: number;
  created_at: number;
  generation: number;
  name: string;
  platform_logo: number;
  platform_family: number;
  slug: string;
  updated_at: number;
  url: string;
  versions: number[];
  checksum: string;
}

export interface IGame {
  id: number;
  cover: ICover;
  created_at: number;
  name: string;
  platforms: IPlatform[];
  slug: string;
  updated_at: number;
  url: string;
  checksum: string;
}
