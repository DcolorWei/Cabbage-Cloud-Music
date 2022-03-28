import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicController } from './music/music.controller';
import { MusicService } from './music/music.service';

@Module({
  imports: [],
  controllers: [AppController, MusicController],
  providers: [AppService, MusicService],
})
export class AppModule {}
