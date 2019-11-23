import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('posts')
export class PostsEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @CreateDateColumn() created: Date;

    @Column('text') title: string;

    @Column('text') details: string;

    @ManyToOne(type => UserEntity, author => author.posts)
    author: UserEntity;
}
