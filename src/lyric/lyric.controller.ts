import { Controller, Get, Req } from '@nestjs/common';
import { LyricService } from './lyric.service';
import { Request } from 'express';

@Controller('lyric')
export class LyricController {
    constructor(private readonly lyricService: LyricService) { }
    @Get('getlyricbysongid')
    async getlyricbysongid(@Req() req: Request): Promise<string> {
        return this.lyricService.getlyricbysongid(req.query.id as unknown as number)
    }
}
