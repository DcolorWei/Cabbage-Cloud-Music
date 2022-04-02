import { Injectable } from '@nestjs/common';
import { Lyric, Lyricitem } from './entity/lyric.entity';
import * as fs from 'fs-extra';
import * as iconv from 'iconv-lite'
@Injectable()
export class LyricService {
    private lyricList: Lyric[] = [];
    async getlyricbysongname(songname: Lyric['songname']): Promise<string> {
        let data = await fs.readFile(`stock/lyric/` + '/' + songname + '.lrc');
        let lyric: Lyric = new Lyric(songname, []);
        iconv.decode(data, 'gbk').toString().split("\n").forEach(element => {
            let item = element.split(']');//根据右方括号分离出时间和歌词
            lyric.content.push(new Lyricitem(item[0].substring(1), item[1]));//舍弃左方括号,组合
        });
        console.log(lyric)
        return JSON.stringify(lyric);
    }
}
