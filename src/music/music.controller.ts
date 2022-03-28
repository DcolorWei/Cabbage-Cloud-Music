import { Controller, Req, Get } from '@nestjs/common';
import { Request } from 'express';
@Controller('music')
export class MusicController {
    @Get()
    test(@Req() req: Request): string {
        console.log(req.query)
        return 'a'
    }
}
