import { Injectable } from '@nestjs/common';
import { SongInfo } from './entity/song.entity'
@Injectable()
export class SongService {
    private songinfos: SongInfo[] = [];//请求所有歌曲文件都将在此

    getsongbyrandom(): SongInfo {
        this.songinfos = [];
        return this.songinfos[Math.floor(Math.random() * this.songinfos.length)];
    }

    getsongbyid(id: SongInfo['id']): SongInfo {
        return this.songinfos.find(item => item.id === id)
    }

    getsongfilebyid(id: SongInfo['id']):any{
        return 'none'
    }

    getsongbysearch(search: string): SongInfo[] {
        let result: SongInfo[] = [];
        this.songinfos.forEach(item => {
            if (item.name == search || item.author == search) result.push(item);
        })
        return result;
    }
}