//发送验证码
import { Transporter, createTransport, SendMailOptions, SentMessageInfo } from 'nodemailer'

const credentials = {
  serverEmail: {
    user: '1441502184@qq.com',
    pass: 'iqcsmaftnxfnbabf'
  }
}

export interface Mail {
  email: string; // 目的邮箱地址
  subject: string;//主题
  html: string;//内容
}

export const sendMail = async (data: Mail) => {
  const { email,subject,html } = data
  const transporter: Transporter = createTransport({
    service: 'qq',//根据使用的邮箱服务器设置
    auth: {
      user: credentials.serverEmail.user,
      pass: credentials.serverEmail.pass
    }
  })

  const options: SendMailOptions = {
    from: credentials.serverEmail.user,
    to: email,
    subject: subject,
    html: html
  }
  const info = await transporter.sendMail(options)
}