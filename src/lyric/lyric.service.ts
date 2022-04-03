import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lyric, Lyricitem } from './entity/lyric.entity';
import { SongInfo } from 'src/song/entity/song.entity';
import * as fs from 'fs-extra';
import * as iconv from 'iconv-lite'
@Injectable()
export class LyricService {
    constructor(
        @InjectRepository(SongInfo)
        private readonly songInfoRepository: Repository<SongInfo>//返回的数组格式的promise，内含查询结果，先resolve再取索引
    ) { }
    private lyricList: Lyric[] = [];
    async getlyricbysongid(id: Lyric['id']): Promise<string> {
        let songinfo:SongInfo =(await this.songInfoRepository.query('select `id`, `name`,`author`,`album` from `songinfo` ' + `WHERE songinfo.id="${id}"`))[0]
        console.log(songinfo.name)
        let data = await fs.readFile(`stock/lyric/` + '/' + songinfo.name + '.lrc');
        let lyric: Lyric = new Lyric(songinfo.id, songinfo.name, []);
        iconv.decode(data, 'gbk').toString().split("\n").forEach(element => {
            let item = element.split(']');//根据右方括号分离出时间和歌词
            lyric.content.push(new Lyricitem(item[0].substring(1), item[1]));//舍弃左方括号,组合
        });
        console.log(lyric)
        return JSON.stringify(lyric);
    }
}
