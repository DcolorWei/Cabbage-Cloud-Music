import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongModule } from './song/song.module';
import { SongInfo } from './song/entity/song.entity';
import { LyricModule } from './lyric/lyric.module';
import { CoverService } from './cover/cover.service';
import { CoverController } from './cover/cover.controller';
import { CoverModule } from './cover/cover.module';

@Module({
  imports: [
    SongModule, LyricModule
    , TypeOrmModule.forRoot({
      type: 'mysql',
      host: '122.9.107.17',
      port: 8888,
      username: 'root',
      password: 'wdc20140772',
      database: 'music',
      entities: [SongInfo],
      synchronize: true,
    }), CoverModule],
  controllers: [AppController, CoverController],
  providers: [AppService, CoverService],
})
export class AppModule { }
