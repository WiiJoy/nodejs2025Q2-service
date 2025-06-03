import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { errors } from 'src/types';
import { validate } from 'uuid';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateTrackDto) {
    const res = this.trackService.create(dto);

    if (res.error === errors.BAD_REQUEST) {
      throw new HttpException(errors.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }

    return res.data;
  }

  @Get()
  findAll() {
    const res = this.trackService.findAll();
    return res.data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const res = this.trackService.findOne(id);

    if (res.error === errors.TRACK_NOT_FOUND) {
      throw new HttpException(errors.TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    if (res.error === errors.INVALID_ID) {
      throw new HttpException(errors.INVALID_ID, HttpStatus.BAD_REQUEST);
    }

    return res.data;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTrackDto) {
    if (!validate(id)) {
      throw new HttpException(errors.INVALID_ID, HttpStatus.BAD_REQUEST);
    }

    const res = this.trackService.update(id, dto);

    if (res.error === errors.TRACK_NOT_FOUND) {
      throw new HttpException(errors.TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
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
      throw new HttpException(errors.INVALID_ID, HttpStatus.BAD_REQUEST);
    }
    const res = this.trackService.remove(id);

    if (res.error === errors.TRACK_NOT_FOUND) {
      throw new HttpException(errors.TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
