import { Controller, Get, Post, Req, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { Request} from 'express';
@Controller('user')

export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get('sendverifycode')
    async sendVerifyCode(@Req() request:Request):Promise<HttpException>{
        this.userService.sendVerifyCode(request.query.email as string)
        return new HttpException('成功',200)
    }

    @Post('registerbyemail')
    async registerByEmail(@Req() request:Request):Promise<HttpException>{
        const {name,email,psw,verifyCode}=request.query as {name:string,email:string,psw:string,verifyCode:string};
        return this.userService.registerByEmail(name,email,psw,verifyCode)
     }
}
