import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongModule } from './song/song.module';
import { SongInfo } from './song/entity/song.entity';
import { LyricModule } from './lyric/lyric.module';
import { CoverModule } from './cover/cover.module';
import { UserModule } from './user/user.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '122.9.107.17',
      port: 8888,
      username: 'root',
      password: 'wdc20140772',
      database: 'music',
      entities: [SongInfo],
      synchronize: true,
    }),
    UserModule,
    SongModule,
    LyricModule,
    CoverModule,
    RedisModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
