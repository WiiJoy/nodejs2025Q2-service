import { TrackCreate } from 'src/types';
import { IsString, ValidateIf, IsInt } from 'class-validator';

export class CreateTrackDto implements TrackCreate {
    @IsString()
    name: string;

    @IsString()
    @ValidateIf((_, value) => value !== null)
    artistId: string | null;

    @IsString()
    @ValidateIf((_, value) => value !== null)
    albumId: string | null;

    @IsInt()
    duration: number;
}
