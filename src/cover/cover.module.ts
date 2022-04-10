import { Module } from '@nestjs/common';
import { CoverController } from './cover.controller';
import { CoverService } from './cover.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongInfo } from 'src/song/entity/song.entity';//需要连接歌曲的数据库


@Module({
    imports: [TypeOrmModule.forFeature([SongInfo])],
    controllers: [CoverController],
    providers: [CoverService],
    exports: [TypeOrmModule]
})

export class CoverModule { }