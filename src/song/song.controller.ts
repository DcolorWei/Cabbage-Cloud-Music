import { Controller, Get, HttpException, Req, Res } from '@nestjs/common';
import { Request } from 'express';
import { SongInfo } from './entity/song.entity';
import { SongService } from './song.service';


@Controller('song')
export class SongController {
    constructor(private readonly songService: SongService) { }
    @Get('getsongbyrandom')
    async getsongbyrandom(@Res({ passthrough: true }) response): Promise<SongInfo> {
        let result: SongInfo[] = await this.songService.getsongbyrandom();
        return result[Math.floor(Math.random() * result.length)];
    }
    @Get('getsongbyid')
    async getsongbyid(@Req() request: Request): Promise<SongInfo> {
        let id: SongInfo['id'] = request.query.id as unknown as number;
        return (await this.songService.getsongbyid(id))[0];
    }
    @Get('getsongfilebyid')
    async getsongfilebyid(@Req() request: Request, @Res({ passthrough: true }) response): Promise<any> {
        let id: SongInfo['id'] = request.query.id as unknown as number;
        let userkey: string = request.query.userkey as string;
        if (userkey !== "test") {//没有请求文件的权限
            return new HttpException('Users who do not have this permission temporarily', 401)
        }
        response.set({
            'Access-Control-Allow-Origin': '*'
        });
        response.redirect(await this.songService.getsongfilebyid(id));
        return;
    }

    @Get('getsongbysearch')
    async getsongbysearch(@Req() request: Request): Promise<SongInfo[]> {//提供分页功能
        let search: string = request.query.search as string;
        let item: number = request.query.item as unknown as number;
        let page: number = request.query.page as unknown as number;
        let result: SongInfo[] = (await this.songService.getsongbysearch(search, item, page));
        return result;
    }
}
