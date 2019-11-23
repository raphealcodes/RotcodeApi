import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsEntity } from './posts.entity';
import { Repository } from 'typeorm';
import { PostDTO, PostRO } from './posts.model';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(PostsEntity) private postRep: Repository<PostsEntity>,
                @InjectRepository(UserEntity) private userRep: Repository<UserEntity>) {}
     private postResponseObject(post: PostsEntity) {
         return {...post, author: post.author ? post.author.responseObject(false) : null};
     }

     private ensureOwnerShip(post: PostsEntity, userId: string) {
          if (post.author.id !== userId) {
              throw new HttpException('Incorrect User', HttpStatus.BAD_REQUEST);
          }
     }

    async showAll(page: number = 1, newest?: boolean) {
        const posts = await this.postRep.find({relations: ['author'],
        take: 25,
         skip: 25 * (page - 1),
        order: newest && ({created: 'DESC'})});
        return posts.map(post => this.postResponseObject(post));
    }

    async read(id: string) {
        const post = await this.postRep.findOne({where: {id}, relations: ['author']});
        if (!post) {
            throw new HttpException('Not Found', HttpStatus.BAD_REQUEST);
        }
        return this.postResponseObject(post);
    }

    async create(data: PostDTO, userId: string): Promise<PostRO> {
        const user = await this.userRep.findOne({where: {id: userId}});
        const post = await this.postRep.create({...data, author: user });
        await this.postRep.save(post);
        return this.postResponseObject(post);
    }

    async update(id: string, data: Partial<PostDTO>, userId: string) {
     let post = await this.postRep.findOne({where: {id}, relations: ['author']});
     if (!post) {
         throw new HttpException('Not Found', HttpStatus.BAD_REQUEST);
     }
     this.ensureOwnerShip(post, userId);
     await this.postRep.update({id}, data);
     post = await this.postRep.findOne({where: {id}, relations: ['author']});
     return this.postResponseObject(post);
    }

    async delete(id: string, userId: string) {
        const post = await this.postRep.findOne({where: {id}, relations: ['author']});
        if (!post) {
             throw new HttpException('Not Found', HttpStatus.BAD_REQUEST);
        }
        this.ensureOwnerShip(post, userId);
        await this.postRep.delete({id});
        return this.postResponseObject(post);
    }
}
