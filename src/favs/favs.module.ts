import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [DatabaseModule],
})
export class FavoriteModule {}
