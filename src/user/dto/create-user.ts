import { CreateUserDto } from 'src/types';
import { IsString } from 'class-validator';

export class CreateUser implements CreateUserDto {
  @IsString()
  login: string;
  @IsString()
  password: string;
}
