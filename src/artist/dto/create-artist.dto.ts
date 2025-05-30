import { ArtistCreate } from 'src/types'
import { IsString, IsBoolean } from 'class-validator'

export class CreateArtistDto implements ArtistCreate {
    @IsString()
    name: string;

    @IsBoolean()
    grammy: boolean;
}
