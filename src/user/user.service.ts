import { Injectable, HttpException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sendMail } from './email/mailsend';

import { RedisService } from '../redis/redis.service'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly redisCacheService: RedisService
    ) { }
    // async registerByEmail() {//通过邮箱注册的接口
    async sendVerifyCode(email: string) {//发送验证码
        const verifyCode = String(Math.round(new Date().getTime() * Math.random())).slice(-6)//截取时间戳最后六位
        let status = await new Promise((resolve) => {//成功状态码为250，失败为510
            sendMail({
                email: email, // 目的邮箱地址
                subject: '卷心菜团队',
                html: `您好，您的邮箱验证码为：${verifyCode}`
            }).then(res => {
                //设置redis
                this.redisCacheService.cacheSet(email, verifyCode, 300)
                resolve(250)
            }).catch(err => {
                resolve(510)
            })
        })
    }

    async registerByEmail(name: string, email: string, psw: string, verifycode: string): Promise<HttpException> {
        if ((await this.redisCacheService.cacheGet(email)) === verifycode) {
            //用户名与邮箱校验
            if ((await this.userRepository.query(`SELECT * FROM user WHERE userName='${name}'`)).length > 0) {
                return new HttpException('用户名不可用！', 426.2)
            }
            if ((await this.userRepository.query(`SELECT * FROM user WHERE email='${email}'`)).length > 0) {
                return new HttpException('该邮箱已注册！', 426.3)
            }
            this.userRepository.query(`INSERT INTO user (userName,userPsw, email) VALUES ('${name}','${psw}','${email}')`)
            
            return new HttpException('注册成功！', 204)
        } else {
            return new HttpException('验证码错误', 426.1)
        }
    }
}
