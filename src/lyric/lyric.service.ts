import { Injectable, HttpException } from '@nestjs/common';
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
    async getlyricbyid(id: Lyric['id']): Promise<string | HttpException> {
        let songinfo: SongInfo = (await this.songInfoRepository.query('select `id`, `name`,`author`,`album`,`songfilepath` from `songinfo` ' + `WHERE songinfo.id="${id}"`))[0]
        let data: Buffer = await new Promise((resolve) => {
            fs.readFile(songinfo.songfilepath.replace('/stock/song', 'stock/lyric').replace('mp3', 'lrc'), (err, content) => {
                if (err) {
                    resolve(null)
                }
                else {
                    resolve(content)
                }
            })
        })
        if (data !== null) {
            let lyric: Lyric = new Lyric(songinfo.id, songinfo.name, []);
            iconv.decode(data, 'gbk').toString().split("\n").forEach(element => {
                let item = element.split(']');//根据右方括号分离出时间和歌词
                lyric.content.push(new Lyricitem(item[0].substring(1), item[1]));//舍弃左方括号,组合
            });
            return JSON.stringify(lyric);
        }
        return new HttpException('歌词不存在', 410)
    }
}
