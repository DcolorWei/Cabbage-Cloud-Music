import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongInfo } from 'src/song/entity/song.entity';//需要连接歌曲的数据库
import { LyricController } from './lyric.controller';
import { LyricService } from './lyric.service';

@Module({
    imports:[TypeOrmModule.forFeature([SongInfo])],
    controllers:[LyricController],
    providers:[LyricService],
    exports:[TypeOrmModule]
})

export class LyricModule {}