import { CreateUserDto } from 'src/types'

export class CreateUser implements CreateUserDto {
    login: string;
    password: string;
}
