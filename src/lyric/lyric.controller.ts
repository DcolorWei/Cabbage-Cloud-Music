import { Controller, Get, Req } from '@nestjs/common';
import { LyricService } from './lyric.service';
import { Request } from 'express';

@Controller('lyric')
export class LyricController {
    constructor(private readonly lyricService: LyricService) { }
    @Get('getlyricbysongname')
    async getlyricbysongname(@Req() req: Request): Promise<string> {
        return this.lyricService.getlyricbysongname(req.query.songname as string)
    }
}
