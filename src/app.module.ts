import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module'
import { UserModule } from './user/user.module'
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [DatabaseModule, UserModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
