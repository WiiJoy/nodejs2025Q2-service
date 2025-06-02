import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackCreate, TrackResponse, errors } from 'src/types';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private database: DatabaseService) {}

  create(dto: TrackCreate): TrackResponse {
    if (
      Object.keys(dto).length === 0 ||
      !(dto.hasOwnProperty('name') && typeof dto.name === 'string') ||
      !(dto.hasOwnProperty('duration') && typeof dto.duration === 'number')
    ) {
      return {
        data: null,
        error: errors.BAD_REQUEST,
      };
    }

    const id = uuidv4();

    const createdTrack = {
      ...dto,
      id,
    };

    this.database.tracks.push(createdTrack);

    return {
      data: createdTrack,
      error: null,
    };
  }

  findAll(): TrackResponse {
    return {
      data: this.database.tracks,
      error: null,
    };
  }

  findOne(id: string): TrackResponse {
    const track = this.database.tracks.find((track) => track.id === id);

    if (!validate(id)) {
      return {
        data: null,
        error: errors.INVALID_ID,
      };
    }

    if (!track) {
      return {
        data: null,
        error: errors.TRACK_NOT_FOUND,
      };
    }

    return {
      data: track,
      error: null,
    };
  }

  update(id: string, dto: UpdateTrackDto): TrackResponse {
    const updateTrack = this.database.tracks.find((track) => track.id === id);

    if (
      Object.keys(dto).length === 0 ||
      !(dto.hasOwnProperty('name') && typeof dto.name === 'string') ||
      !(dto.hasOwnProperty('duration') && typeof dto.duration === 'number')
    ) {
      return {
        data: null,
        error: errors.BAD_REQUEST,
      };
    }

    if (!updateTrack) {
      return {
        data: null,
        error: errors.TRACK_NOT_FOUND,
      };
    }

    updateTrack.name = dto.name;
    updateTrack.duration = dto.duration;
    updateTrack.albumId = dto.albumId || updateTrack.albumId;
    updateTrack.artistId = dto.artistId || updateTrack.artistId;

    return {
      data: updateTrack,
      error: null,
    };
  }

  remove(id: string): TrackResponse {
    const index = this.database.tracks.findIndex((track) => track.id === id);

    if (index < 0) {
      return {
        data: null,
        error: errors.TRACK_NOT_FOUND,
      };
    }

    this.database.tracks.splice(index, 1);

    const inFavorites = this.database.favorites.tracks.findIndex(
      (item) => item === id,
    );
    if (inFavorites !== -1) {
      this.database.favorites.tracks.splice(inFavorites, 1);
    }

    return {
      data: null,
      error: null,
    };
  }
}
