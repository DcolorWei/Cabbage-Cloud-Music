import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SongInfo } from './entity/song.entity';


@Injectable()
export class SongService {
    constructor(
        @InjectRepository(SongInfo)
        private readonly songInfoRepository: Repository<SongInfo>//返回的数组格式的promise，内含查询结果，先resolve再取索引
    ) { }
    async getsongbyrandom(mode: 0 | 1 | 2 | 3 = 0): Promise<SongInfo[]> {
        return this.songInfoRepository.query('select `id`, `name`,`author`,`album` from `songinfo`')
    }

    async getsongbyid(id: SongInfo['id']): Promise<SongInfo> {
        return this.songInfoRepository.query('select `id`, `name`,`author`,`album` from `songinfo` ' + `WHERE songinfo.id="${id}"`)
    }

    async getsongfilebyid(id: SongInfo['id']): Promise<string> {
        let path: string = (await this.songInfoRepository.query('select `songfilepath` from `songinfo` ' + `WHERE songinfo.id="${id}"`))[0].songfilepath;
        console.log(path)
        return path;
    }

    async getsongbysearch(search: string, item: number = 10, page: number = 0): Promise<SongInfo[]> {
        return await this.songInfoRepository.query('select `id`, `name`,`author`,`album` from `songinfo` ' + `WHERE songinfo.name LIKE "%${search}%" OR songinfo.author LIKE "%${search}%" limit ${page * item},${item}`)
    }
}