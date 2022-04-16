import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { RedisModule } from '../redis/redis.module';

@Module({
    imports:[TypeOrmModule.forFeature([User]),RedisModule],
    controllers:[UserController],
    providers:[UserService],
    exports:[TypeOrmModule,RedisModule]
})

export class UserModule {}
