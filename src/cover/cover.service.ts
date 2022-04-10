import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SongInfo } from 'src/song/entity/song.entity';//需要连接歌曲的数据库
import * as fs from 'fs-extra';
import { rejects } from 'assert/strict';
const jsmediatags = require("jsmediatags");

@Injectable()
export class CoverService {
    constructor(
        @InjectRepository(SongInfo)
        private readonly songInfoRepository: Repository<SongInfo>//返回的数组格式的promise，内含查询结果，先resolve再取索引
    ) { }
    async getcoverbyid(id: SongInfo['id']): Promise<Buffer> {
        let songinfo: SongInfo = (await this.songInfoRepository.query('select `id`, `name`,`author`,`album`,`songfilepath` from `songinfo` ' + `WHERE songinfo.id="${id}"`))[0]
        let path = songinfo.songfilepath.replace('/stock', 'stock');
        return new Promise((resolve, rejects) => {
            jsmediatags.read(path, {//读取音乐文件信息
                onSuccess: function (tag: any) {
                    if (tag.tags.picture.data !== undefined) {
                        resolve(new Buffer(tag.tags.picture.data));
                        // res.send(new Buffer(data))//传输图片二进制
                    } else {//该音乐文件不存在图片
                        rejects(new Buffer(0));
                    }
                }
            })
        })

    }
}
