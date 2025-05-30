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
import { ArtistService } from './artist.service';
// import { CreateArtistDto } from './dto/create-artist.dto';
// import { UpdateArtistDto } from './dto/update-artist.dto';
import { errors, ArtistCreate } from 'src/types';
import { validate } from 'uuid';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() dto: ArtistCreate) {
    console.log('post', dto);
    const res = this.artistService.create(dto);

    if (res.error === errors.BAD_REQUEST) {
      throw new HttpException(errors.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }

    return res.data;
  }

  @Get()
  findAll() {
    const res = this.artistService.findAll();
    return res.data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const res = this.artistService.findOne(id);

    if (res.error === errors.NOT_FOUND) {
      throw new HttpException(errors.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    if (res.error === errors.BAD_REQUEST) {
      throw new HttpException(errors.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }

    return res.data;
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: ArtistCreate) {
    if (!validate(id)) {
      throw new HttpException(errors.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }

    const res = this.artistService.update(id, dto);

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
    const res = this.artistService.remove(id);

    if (res.error === errors.NOT_FOUND) {
      throw new HttpException(errors.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
