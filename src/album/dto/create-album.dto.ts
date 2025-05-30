import { AlbumCreate } from 'src/types';
import { IsString, IsInt, ValidateIf } from 'class-validator';

export class CreateAlbumDto implements AlbumCreate {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;
}
