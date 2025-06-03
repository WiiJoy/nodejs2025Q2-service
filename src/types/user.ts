import { errors } from './common';

export interface CreateUserDto {
  login: string;
  password: string;
}

export interface User extends CreateUserDto {
  id: string; // uuid v4
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface UpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export type UserType = Omit<User, 'password'>;

export interface UserResponse {
  data: UserType | UserType[] | null;
  error: errors | null;
}
