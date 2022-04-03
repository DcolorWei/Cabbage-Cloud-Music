import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongModule } from './song/song.module';
import { SongInfo } from './song/entity/song.entity';
import { LyricModule } from './lyric/lyric.module';

@Module({
  imports: [
    SongModule
    , TypeOrmModule.forRoot({
      type: 'mysql',
      host: '122.9.107.17',
      port: 8888,
      username: 'root',
      password: 'wdc20140772',
      database: 'music',
      entities: [SongInfo],
      synchronize: true,
    }), LyricModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
