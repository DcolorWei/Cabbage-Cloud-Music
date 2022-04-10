import { Controller, Get, Req, Res, StreamableFile } from '@nestjs/common';
import { CoverService } from './cover.service';
import { Request } from 'express';
@Controller('cover')
export class CoverController {
    constructor(private readonly coverService: CoverService) { }
    @Get('getcoverbyid')
    async getcoverbyid(@Req() req: Request, @Res({ passthrough: true }) response): Promise<any> {
        let picdata: Buffer = await this.coverService.getcoverbyid(req.query.id as unknown as number)
        response.set({
            'Content-Type': 'image/jpeg'
        });
        return new StreamableFile(picdata);
    }
}