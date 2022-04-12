import { Controller, Get, Req, HttpException } from '@nestjs/common';
import { LyricService } from './lyric.service';
import { Request } from 'express';

@Controller('lyric')
export class LyricController {
    constructor(private readonly lyricService: LyricService) { }
    @Get('getlyricbyid')
    async getlyricbyid(@Req() req: Request): Promise<string|HttpException> {
        return this.lyricService.getlyricbyid(req.query.id as unknown as number)
    }
}
