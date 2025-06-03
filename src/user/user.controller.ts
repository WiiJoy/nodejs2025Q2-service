import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto, errors } from 'src/types';
import { validate } from 'uuid';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    const res = this.userService.getAllUsers();
    return res.data;
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    const res = this.userService.getUserById(id);

    if (res.error === errors.USER_NOT_FOUND) {
      throw new HttpException(errors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    if (res.error === errors.INVALID_ID) {
      throw new HttpException(errors.INVALID_ID, HttpStatus.BAD_REQUEST);
    }

    return res.data;
  }

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() dto: CreateUserDto) {
    const res = this.userService.createUser(dto);

    if (res.error === errors.BAD_REQUEST) {
      throw new HttpException(errors.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }

    return res.data;
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    if (!validate(id)) {
      throw new HttpException(errors.INVALID_ID, HttpStatus.BAD_REQUEST);
    }

    const res = this.userService.updateUser(id, dto);

    if (res.error === errors.USER_NOT_FOUND) {
      throw new HttpException(errors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
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
  delete(@Param('id', ParseUUIDPipe) id: string): void {
    if (!validate(id)) {
      throw new HttpException(errors.INVALID_ID, HttpStatus.BAD_REQUEST);
    }
    const res = this.userService.removeUser(id);

    if (res.error === errors.USER_NOT_FOUND) {
      throw new HttpException(errors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
