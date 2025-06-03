import { errors } from './common';

export interface ArtistCreate {
  name: string;
  grammy: boolean;
}

export interface Artist extends ArtistCreate {
  id: string; // uuid v4
}

export interface ArtistResponse {
  data: Artist | Artist[] | null;
  error: errors | null;
}
