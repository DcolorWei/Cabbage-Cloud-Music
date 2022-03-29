import { Injectable } from '@nestjs/common';
import { Lyric, Lyricitem } from './entity/lyric.entity';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as iconv from 'iconv-lite'
const dirPath = path.resolve(`$(__dirname)`, '../stock/lyric/')
@Injectable()
export class LyricService {
    private lyricList: Lyric[] = [];
    getlyricbysongname(name: Lyric['name']) {
        fs.readFile(dirPath + '/' + name + '.lrc', (err, data) => {
            let lyric: Lyric = new Lyric(name, []);
            iconv.decode(data, 'gbk').toString().split("\n").forEach(element => {
                let item = element.split(']');//根据右方括号分离出时间和歌词
                lyric.content.push(new Lyricitem(item[0].substring(1), item[1]));//舍弃左方括号,组合
            });
            return lyric;
        })
    }
}
