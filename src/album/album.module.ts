import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [DatabaseModule],
})
export class AlbumModule {}
