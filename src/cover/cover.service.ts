import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SongInfo } from 'src/song/entity/song.entity';//需要连接歌曲的数据库
import * as fs from 'fs-extra';

@Injectable()
export class CoverService {
    constructor(
        @InjectRepository(SongInfo)
        private readonly songInfoRepository: Repository<SongInfo>//返回的数组格式的promise，内含查询结果，先resolve再取索引
    ) { }
    async getcoverbyid(id: SongInfo['id']): Promise<string> {
        let songinfo: SongInfo = (await this.songInfoRepository.query('select `id`, `name`,`author`,`album`,`songfilepath` from `songinfo` ' + `WHERE songinfo.id="${id}"`))[0]
        let path = songinfo.songfilepath.replace('/stock', 'stock');
        return parseMP3(path);
    }
}
