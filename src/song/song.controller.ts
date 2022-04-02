import { Controller, Get, HttpException, Req, Res, StreamableFile } from '@nestjs/common';
import { SongInfo } from './entity/song.entity';
import { SongService } from './song.service';
import { request, Request, response } from 'express';


@Controller('song')
export class SongController {
    constructor(private readonly songService: SongService) { }
    @Get('getsongbyrandom')
    async getsongbyrandom(): Promise<SongInfo> {
        let result: SongInfo[] = await this.songService.getsongbyrandom();
        return result[Math.floor(Math.random() * result.length)];
    }
    @Get('getsongbyid')
    async getsongbyid(@Req() request: Request): Promise<SongInfo> {
        let id: SongInfo['id'] = request.query.id as string;
        return (await this.songService.getsongbyid(id))[0];
    }
    @Get('getsongfilebyid')
    async getsongfilebyid(@Req() request: Request, @Res({ passthrough: true }) response): Promise<StreamableFile | HttpException> {
        let id: SongInfo['id'] = request.query.id as string;
        let userkey: string = request.query.userkey as string;

        if (userkey !== "test") {//没有请求文件的权限
            return new HttpException('Users who do not have this permission temporarily', 407)
        }

        response.set({
            'Content-Disposition': `attachment; filename="${new Date().getTime()}".mp3`,
        });
        return (await this.songService.getsongfilebyid(id));
    }

    @Get('getsongbysearch')
    async getsongbysearch(@Req() request: Request): Promise<SongInfo[]> {//提供分页功能
        let search: string = request.query.search as string;
        let item: number = request.query.item as unknown as number;
        let page: number = request.query.page as unknown as number;
        let result: SongInfo[] = (await this.songService.getsongbysearch(search,item,page));
        return result;
    }
}
