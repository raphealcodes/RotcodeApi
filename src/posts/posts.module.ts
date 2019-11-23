import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { PostsEntity } from './posts.entity';
import { UserEntity } from '../user/user.entity';

@Module({
  controllers: [PostsController],
  imports: [TypeOrmModule.forFeature([PostsEntity, UserEntity])],
  providers: [PostsService],
})
export class PostsModule {}
