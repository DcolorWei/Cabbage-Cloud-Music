import { Controller, Get, Req } from '@nestjs/common';
import { CoverService } from './cover.service';
import { Request } from 'express';
@Controller('cover')
export class CoverController {
    constructor(private readonly coverService: CoverService) { }
    @Get('getlyricbysongid')
    async getlyricbysongid(@Req() req: Request): Promise<string> {
        return this.coverService.getcoverbyid(req.query.id as unknown as number)
    }
}