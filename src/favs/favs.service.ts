import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { FavoriteResponse } from 'src/types';

@Injectable()
export class FavsService {
  constructor(private database: DatabaseService) {}

  getAll(): FavoriteResponse {
    const favorites = this.database.favorites;
    const tracks = favorites.tracks.map((trackId) =>
      this.database.tracks.find((track) => track.id === trackId),
    );
    const albums = favorites.albums.map((albumId) =>
      this.database.albums.find((album) => album.id === albumId),
    );
    const artists = favorites.artists.map((artistId) =>
      this.database.artists.find((artist) => artist.id === artistId),
    );

    return { tracks, albums, artists };
  }

  addTrack(id: string) {
    const track = this.database.tracks.find((track) => track.id === id);

    if (!track) return false;

    const isExist = this.database.favorites.tracks.includes(track.id);
    if (!isExist) {
      this.database.favorites.tracks.push(track.id);
    }

    return true;
  }

  addAlbum(id: string) {
    const album = this.database.albums.find((album) => album.id === id);

    if (!album) return false;

    const isExist = this.database.favorites.albums.includes(album.id);
    if (!isExist) {
      this.database.favorites.albums.push(album.id);
    }

    return true;
  }

  addArtist(id: string) {
    const artist = this.database.artists.find((artist) => artist.id === id);

    if (!artist) return false;

    const isExist = this.database.favorites.artists.includes(artist.id);
    if (!isExist) {
      this.database.favorites.artists.push(artist.id);
    }

    return true;
  }

  removeTrack(id: string) {
    const index = this.database.favorites.tracks.findIndex(
      (trackId) => trackId === id,
    );

    if (index === -1) return false;

    this.database.favorites.tracks.splice(index, 1);

    return true;
  }

  removeAlbum(id: string) {
    const index = this.database.favorites.albums.findIndex(
      (albumId) => albumId === id,
    );

    if (index === -1) return false;

    this.database.favorites.albums.splice(index, 1);

    return true;
  }

  removeArtist(id: string) {
    const index = this.database.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );

    if (index === -1) return false;

    this.database.favorites.artists.splice(index, 1);

    return true;
  }
}
