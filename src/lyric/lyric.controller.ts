import { Controller, Get } from '@nestjs/common';
import { LyricService } from './lyric.service';

@Controller('lyric')
export class LyricController {
    constructor(private readonly lyricService: LyricService) { }
    @Get('getlyricbysongname')
    getsongbyid(name: string): any {
        return this.lyricService.getlyricbysongname(name);
    }
}
