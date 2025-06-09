import { Track } from './tracks';
import { Album } from './albums';
import { Artist } from './artists';

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoriteResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
