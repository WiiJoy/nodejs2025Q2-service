import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { FavsService } from './favs.service';
import { validate } from 'uuid';
import { errors } from 'src/types';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getAll() {
    return this.favsService.getAll();
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string): string {
    if (!validate(id)) {
      throw new HttpException(errors.BAD_REQUEST, HttpStatus.BAD_REQUEST)
    }

    const res = this.favsService.addTrack(id);

    if (!res) {
      throw new HttpException('Track not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return 'Track added to favorites';
  }

  @Post('album/:id')
  addAlbum(@Param('id') id: string): string {
    if (!validate(id)) {
      throw new HttpException(errors.BAD_REQUEST, HttpStatus.BAD_REQUEST)
    }

    const res = this.favsService.addAlbum(id);

    if (!res) {
      throw new HttpException('Album not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return 'Album added to favorites';
  }

  @Post('artist/:id')
  addArtist(@Param('id') id: string): string {
    if (!validate(id)) {
      throw new HttpException(errors.BAD_REQUEST, HttpStatus.BAD_REQUEST)
    }

    const res = this.favsService.addArtist(id);

    if (!res) {
      throw new HttpException('Artist not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return 'Artist added to favorites';
  }

  @HttpCode(204)
  @Delete('track/:id')
  removeTrack(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException(errors.BAD_REQUEST, HttpStatus.BAD_REQUEST)
    }

    const res = this.favsService.removeTrack(id);

    if (!res) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    return 'Track deleted from favorites'
  }

  @HttpCode(204)
  @Delete('album/:id')
  removeAlbum(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException(errors.BAD_REQUEST, HttpStatus.BAD_REQUEST)
    }

    const res = this.favsService.removeAlbum(id);

    if (!res) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return 'Album deleted from favorites'
  }

  @HttpCode(204)
  @Delete('artist/:id')
  removeArtist(@Param('id') id: string) {
    console.log('id', id)
    if (!validate(id)) {
      throw new HttpException(errors.BAD_REQUEST, HttpStatus.BAD_REQUEST)
    }

    const res = this.favsService.removeArtist(id);
    
    if (!res) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    return 'Artist deleted from favorites'
  }
}
