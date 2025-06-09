import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UserResponse,
  errors,
} from 'src/types';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class UserService {
  constructor(private database: DatabaseService) {}

  getAllUsers(): UserResponse {
    return {
      data: this.database.users.map((user) => {
        const watchedUser = { ...user };
        delete watchedUser.password;
        return watchedUser;
      }),
      error: null,
    };
  }

  getUserById(id: string): UserResponse {
    const user = this.database.users.find((user) => user.id === id);

    if (!validate(id)) {
      return {
        data: null,
        error: errors.INVALID_ID,
      };
    }

    if (!user) {
      return {
        data: null,
        error: errors.USER_NOT_FOUND,
      };
    }

    const returnedUser = { ...user };
    delete returnedUser.password;

    return {
      data: returnedUser,
      error: null,
    };
  }

  createUser(dto: CreateUserDto): UserResponse {
    if (Object.keys(dto).length === 0 || !dto.login || !dto.password) {
      return {
        data: null,
        error: errors.BAD_REQUEST,
      };
    }

    const timestamp = Date.now();
    const id = uuidv4();

    const createdUser = {
      ...dto,
      id,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.database.users.push(createdUser);

    const returnedUser = { ...createdUser };
    delete returnedUser.password;

    return {
      data: returnedUser,
      error: null,
    };
  }

  updateUser(id: string, dto: UpdatePasswordDto): UserResponse {
    const updateUser = this.database.users.find((user) => user.id === id);

    if (Object.keys(dto).length === 0 || !dto.oldPassword || !dto.newPassword) {
      return {
        data: null,
        error: errors.BAD_REQUEST,
      };
    }

    if (!updateUser) {
      return {
        data: null,
        error: errors.USER_NOT_FOUND,
      };
    }

    if (updateUser.password !== dto.oldPassword) {
      return {
        data: null,
        error: errors.WRONG_PASSWORD,
      };
    }

    updateUser.updatedAt = Date.now();
    updateUser.password = dto.newPassword;
    updateUser.version += 1;

    const returnedUser = { ...updateUser };
    delete returnedUser.password;

    return {
      data: returnedUser,
      error: null,
    };
  }

  removeUser(id: string): UserResponse {
    const index = this.database.users.findIndex((user) => user.id === id);

    if (index < 0) {
      return {
        data: null,
        error: errors.USER_NOT_FOUND,
      };
    }

    this.database.users.splice(index, 1);

    return {
      data: null,
      error: null,
    };
  }
}
