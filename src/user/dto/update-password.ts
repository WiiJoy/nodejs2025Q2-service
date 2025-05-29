import { UpdatePasswordDto } from 'src/types'
import { IsString } from 'class-validator'

export class UpdatePassword implements UpdatePasswordDto {
    @IsString()
    oldPassword: string;
    @IsString()
    newPassword: string;
}
