import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { errors } from 'src/types';
import { validate } from 'uuid';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateAlbumDto) {
    const res = this.albumService.create(dto);

    if (res.error === errors.BAD_REQUEST) {
      throw new HttpException(errors.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }

    return res.data;
  }

  @Get()
  findAll() {
    const res = this.albumService.findAll();
    return res.data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const res = this.albumService.findOne(id);

    if (res.error === errors.NOT_FOUND) {
      throw new HttpException(errors.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    if (res.error === errors.BAD_REQUEST) {
      throw new HttpException(errors.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }

    return res.data;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAlbumDto) {
    if (!validate(id)) {
      throw new HttpException(errors.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }

    const res = this.albumService.update(id, dto);

    if (res.error === errors.NOT_FOUND) {
      throw new HttpException(errors.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    if (res.error === errors.WRONG_PASSWORD) {
      throw new HttpException(errors.WRONG_PASSWORD, HttpStatus.FORBIDDEN);
    }
    if (res.error === errors.BAD_REQUEST) {
      throw new HttpException(errors.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }

    return res.data;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!validate(id)) {
      throw new HttpException(errors.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
    const res = this.albumService.remove(id);

    if (res.error === errors.NOT_FOUND) {
      throw new HttpException(errors.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
