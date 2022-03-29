import { Controller, Get } from '@nestjs/common';
import { SongInfo } from './entity/song.entity';
import { SongService } from './song.service'
@Controller('song')
export class SongController {
    constructor(private readonly songService: SongService) { }
    @Get('getsongbyrandom')
    getsongbyrandom(): SongInfo {
        return this.songService.getsongbyrandom();
    }
    @Get('getsongbyid')
    getsongbyid(id: SongInfo['id']): SongInfo {
        return this.songService.getsongbyid(id);
    }
    @Get('getsongfilebyid')
    getsongfilebyid(id: SongInfo['id']): any {
        return this.songService.getsongfilebyid(id);
    }
    @Get('getsongbysearch')
    getsongbysearch(search: string, item: number = 10, page: number = 0): SongInfo[] {//提供分页功能
        return this.songService.getsongbysearch(search).slice(page * item, (page + 1) * item);
    }
}
