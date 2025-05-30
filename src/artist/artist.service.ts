import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service'
import { ArtistResponse } from 'src/types';
import { validate, v4 as uuidv4 } from 'uuid';
import { errors } from 'src/types';
import { strict } from 'assert';

@Injectable()
export class ArtistService {
  constructor(private database: DatabaseService) {}

  create(dto: CreateArtistDto): ArtistResponse {
    if (
      Object.keys(dto).length === 0 ||
      !(dto.hasOwnProperty('name') && typeof dto.name === 'string') ||
      !(dto.hasOwnProperty('grammy') && typeof dto.grammy === 'boolean')
    ) {
      return {
        data: null,
        error: errors.BAD_REQUEST
      }
    }

    const id = uuidv4()

    const createdArtist = {
      ...dto,
      id,
    }

    this.database.artists.push(createdArtist)

    return {
      data: createdArtist,
      error: null
    }
  }

  findAll(): ArtistResponse {
    return {
      data: this.database.artists,
      error: null
    };
  }

  findOne(id: string): ArtistResponse {
    const artist = this.database.artists.find(artist => artist.id === id)

    if (!validate(id)) {
      return {
        data: null,
        error: errors.BAD_REQUEST
      }
    }

    if (!artist) {
      return {
        data: null,
        error: errors.NOT_FOUND
      }
    }

    return {
      data: artist,
      error: null
    }
  }

  update(id: string, dto: UpdateArtistDto): ArtistResponse {
    const updateArtist = this.database.artists.find(artist => artist.id === id)

    if (
      Object.keys(dto).length === 0 ||
      !(dto.hasOwnProperty('name') && typeof dto.name === 'string') ||
      !(dto.hasOwnProperty('grammy') && typeof dto.grammy === 'boolean')
    ) {
      return {
        data: null,
        error: errors.BAD_REQUEST
      }
    }

    if (!updateArtist) {
      return {
        data: null,
        error: errors.NOT_FOUND
      }
    }

    updateArtist.name = dto.name
    updateArtist.grammy = dto.grammy

    return {
      data: updateArtist,
      error: null
    }
  }

  remove(id: string): ArtistResponse {
    const index = this.database.artists.findIndex(artist => artist.id === id)

    if (index < 0) {
      return {
        data: null,
        error: errors.NOT_FOUND
      }
    }

    this.database.artists.splice(index, 1)

    this.database.tracks.forEach(track => {
      if (track.artistId === id) track.artistId = null
    })

    this.database.albums.forEach(album => {
      if (album.artistId === id) album.artistId = null
    })

    return {
      data: null,
      error: null
    }
  }
}
