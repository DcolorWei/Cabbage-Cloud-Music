import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongInfo } from './entity/song.entity';
import { SongController } from './song.controller';
import { SongService } from './song.service';

@Module({
    imports:[TypeOrmModule.forFeature([SongInfo])],
    controllers:[SongController],
    providers:[SongService],
    exports:[TypeOrmModule]
})

export class SongModule {}
