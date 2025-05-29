import { UpdatePasswordDto } from 'src/types'

export class UpdatePassword implements UpdatePasswordDto {
    oldPassword: string;
    newPassword: string;
}
