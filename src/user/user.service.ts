import { Injectable, HttpException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sendMail } from './email/mailsend';


let verifyList: Map<string, string> = new Map<string, string>()

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>//返回的数组格式的promise，内含查询结果，先resolve再取索引
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
                verifyList.set(email, verifyCode)
                resolve(250)
            }).catch(err => {
                resolve(510)
            })
        })
    }

    async registerByEmail(name: string, email: string, psw: string, verifyCode: string): Promise<HttpException> {
        if (verifyList.get(email) === verifyCode) {
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
