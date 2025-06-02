import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';
import { AlbumResponse, errors } from 'src/types';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private database: DatabaseService) {}

  create(dto: CreateAlbumDto): AlbumResponse {
    if (
      Object.keys(dto).length === 0 ||
      !(dto.hasOwnProperty('name') && typeof dto.name === 'string') ||
      !(dto.hasOwnProperty('year') && typeof dto.year === 'number')
    ) {
      return {
        data: null,
        error: errors.BAD_REQUEST,
      };
    }

    const id = uuidv4();

    const createdAlbum = {
      ...dto,
      id,
    };

    this.database.albums.push(createdAlbum);

    return {
      data: createdAlbum,
      error: null,
    };
  }

  findAll(): AlbumResponse {
    return {
      data: this.database.albums,
      error: null,
    };
  }

  findOne(id: string): AlbumResponse {
    const album = this.database.albums.find((album) => album.id === id);

    if (!validate(id)) {
      return {
        data: null,
        error: errors.INVALID_ID,
      };
    }

    if (!album) {
      return {
        data: null,
        error: errors.ALBUM_NOT_FOUND,
      };
    }

    return {
      data: album,
      error: null,
    };
  }

  update(id: string, dto: UpdateAlbumDto): AlbumResponse {
    const updateAlbum = this.database.albums.find((album) => album.id === id);

    if (
      Object.keys(dto).length === 0 ||
      !(dto.hasOwnProperty('name') && typeof dto.name === 'string') ||
      !(dto.hasOwnProperty('year') && typeof dto.year === 'number')
    ) {
      return {
        data: null,
        error: errors.BAD_REQUEST,
      };
    }

    if (!updateAlbum) {
      return {
        data: null,
        error: errors.ALBUM_NOT_FOUND,
      };
    }

    updateAlbum.name = dto.name;
    updateAlbum.year = dto.year;
    updateAlbum.artistId = dto.artistId || updateAlbum.artistId;

    return {
      data: updateAlbum,
      error: null,
    };
  }

  remove(id: string): AlbumResponse {
    const index = this.database.albums.findIndex((album) => album.id === id);

    if (index < 0) {
      return {
        data: null,
        error: errors.ALBUM_NOT_FOUND,
      };
    }

    this.database.albums.splice(index, 1);

    this.database.tracks.forEach((track) => {
      if (track.albumId === id) track.albumId = null;
    });

    const inFavorites = this.database.favorites.albums.findIndex(
      (item) => item === id,
    );
    if (inFavorites !== -1) {
      this.database.favorites.albums.splice(inFavorites, 1);
    }

    return {
      data: null,
      error: null,
    };
  }
}
